-- =============================================
-- My Leap - Full Schema + Seed Data
-- =============================================

-- 1. PROFILE
CREATE TABLE IF NOT EXISTS public.profile (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  subtitle TEXT,
  bio TEXT,
  avatar_url TEXT,
  banner_url TEXT,
  stat_leapers TEXT DEFAULT '0',
  stat_cursos TEXT DEFAULT '0',
  stat_estudiantes TEXT DEFAULT '0',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.profile DISABLE ROW LEVEL SECURITY;

-- 2. SOCIAL LINKS
CREATE TABLE IF NOT EXISTS public.social_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES public.profile(id) ON DELETE CASCADE,
  platform TEXT NOT NULL,
  url TEXT NOT NULL,
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.social_links DISABLE ROW LEVEL SECURITY;

-- 3. CTA LINKS (cards de enlaces)
CREATE TABLE IF NOT EXISTS public.cta_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES public.profile(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  icon_name TEXT NOT NULL DEFAULT 'Heart',
  variant TEXT NOT NULL DEFAULT 'primary',
  badge TEXT,
  modal_key TEXT NOT NULL,
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  featured_image TEXT,
  featured_tag TEXT,
  featured_stat_1_label TEXT,
  featured_stat_2_label TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.cta_links DISABLE ROW LEVEL SECURITY;

-- 4. CTA MODAL CONTENT
CREATE TABLE IF NOT EXISTS public.cta_modal_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cta_link_id UUID NOT NULL REFERENCES public.cta_links(id) ON DELETE CASCADE,
  modal_title TEXT NOT NULL,
  modal_subtitle TEXT,
  modal_body TEXT,
  modal_type TEXT NOT NULL DEFAULT 'info',
  extra_data JSONB DEFAULT '{}',
  cta_button_text TEXT,
  cta_button_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.cta_modal_content DISABLE ROW LEVEL SECURITY;

-- 5. FACILITATORS (terapeutas)
CREATE TABLE IF NOT EXISTS public.facilitators (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  specialty TEXT,
  avatar_url TEXT,
  rating NUMERIC(2,1) DEFAULT 5.0,
  sessions_count TEXT DEFAULT '0',
  whatsapp_url TEXT,
  bio TEXT,
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.facilitators DISABLE ROW LEVEL SECURITY;

-- 6. SURVEY RESPONSES
CREATE TABLE IF NOT EXISTS public.survey_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cta_link_id UUID REFERENCES public.cta_links(id) ON DELETE SET NULL,
  respondent_name TEXT NOT NULL,
  respondent_email TEXT NOT NULL,
  answers JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.survey_responses DISABLE ROW LEVEL SECURITY;

-- =============================================
-- SEED DATA
-- =============================================

-- Profile
INSERT INTO public.profile (id, name, subtitle, bio, avatar_url, banner_url, stat_leapers, stat_cursos, stat_estudiantes)
VALUES (
  'a0000000-0000-0000-0000-000000000001',
  'MY LEAP',
  'Potenciado Por Método ONE',
  'Comunidad de sanación energética dedicada a tu bienestar integral. Conectamos facilitadores certificados con personas que buscan equilibrio físico, emocional y espiritual.',
  'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=200&h=200&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=800&h=300&fit=crop',
  '1K+',
  '200+',
  '500+'
);

-- Social Links
INSERT INTO public.social_links (profile_id, platform, url, display_order) VALUES
  ('a0000000-0000-0000-0000-000000000001', 'instagram', 'https://instagram.com/myleap', 1),
  ('a0000000-0000-0000-0000-000000000001', 'tiktok', 'https://tiktok.com/@myleap', 2),
  ('a0000000-0000-0000-0000-000000000001', 'youtube', 'https://youtube.com/@myleap', 3),
  ('a0000000-0000-0000-0000-000000000001', 'facebook', 'https://facebook.com/myleap', 4),
  ('a0000000-0000-0000-0000-000000000001', 'globe', 'https://myleap.com', 5);

-- CTA Links
-- 1) Experiencia Método ONE (survey)
INSERT INTO public.cta_links (id, profile_id, title, description, icon_name, variant, badge, modal_key, display_order, is_active, is_featured)
VALUES (
  'b0000000-0000-0000-0000-000000000001',
  'a0000000-0000-0000-0000-000000000001',
  'Experiencia Método ONE',
  'Completa la encuesta y disfruta la sanación',
  'Sparkles',
  'accent',
  'GRATIS',
  'registrate',
  1,
  true,
  false
);

-- 2) Sanación Grupal a Distancia
INSERT INTO public.cta_links (id, profile_id, title, description, icon_name, variant, badge, modal_key, display_order, is_active, is_featured, featured_image, featured_tag, featured_stat_1_label, featured_stat_2_label)
VALUES (
  'b0000000-0000-0000-0000-000000000002',
  'a0000000-0000-0000-0000-000000000001',
  'Sanación Grupal a Distancia',
  'Conectate a la Videollamada y sana',
  'Heart',
  'primary',
  'EN VIVO',
  'sanacion',
  2,
  true,
  true,
  'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=250&fit=crop',
  'En Vivo',
  'Ilimitado',
  '1.5h'
);

-- 3) Método ONE
INSERT INTO public.cta_links (id, profile_id, title, description, icon_name, variant, badge, modal_key, display_order, is_active, is_featured, featured_image, featured_tag, featured_stat_1_label, featured_stat_2_label)
VALUES (
  'b0000000-0000-0000-0000-000000000003',
  'a0000000-0000-0000-0000-000000000001',
  'Método ONE',
  'Metodología de sanación con energía',
  'GraduationCap',
  'accent',
  NULL,
  'metodo',
  3,
  true,
  true,
  'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=250&fit=crop',
  'Curso',
  'Ilimitado',
  '4h'
);

-- 4) E-book
INSERT INTO public.cta_links (id, profile_id, title, description, icon_name, variant, badge, modal_key, display_order, is_active, is_featured)
VALUES (
  'b0000000-0000-0000-0000-000000000004',
  'a0000000-0000-0000-0000-000000000001',
  'E-book: El Poder Sanador de la Energía',
  'Un mundo de posibilidades',
  'BookOpen',
  'secondary',
  'NUEVO',
  'ebook',
  4,
  true,
  false
);

-- 5) Consulta 1:1
INSERT INTO public.cta_links (id, profile_id, title, description, icon_name, variant, badge, modal_key, display_order, is_active, is_featured)
VALUES (
  'b0000000-0000-0000-0000-000000000005',
  'a0000000-0000-0000-0000-000000000001',
  'Consulta 1:1 Personalizada',
  'Sesión privada para tus dolores',
  'MessageCircle',
  'primary',
  NULL,
  'consulta',
  5,
  true,
  false
);

-- CTA Modal Content
-- Modal for Experiencia Método ONE (survey type)
INSERT INTO public.cta_modal_content (cta_link_id, modal_title, modal_subtitle, modal_body, modal_type, extra_data, cta_button_text)
VALUES (
  'b0000000-0000-0000-0000-000000000001',
  'Sanación Energética Gratuita',
  'Sesión callejera de muestra - 15 a 20 min',
  'Bienvenido a la comunidad My Leap, preparate para vivir la experiencia gratuita del Método ONE.',
  'survey',
  '{
    "duration": "15 - 20 minutos",
    "cost": "100% Gratuito",
    "location": "Espacio público / al aire libre",
    "capacity": "Limitados por sesión",
    "includes": [
      "Sesión individual de sanación energética de 15-20 minutos",
      "Facilitador certificado en el Método ONE",
      "Evaluación breve de tus dolencias",
      "Acceso a beneficios de la comunidad"
    ],
    "survey_questions": [
      {"id": "nombre", "label": "Nombre completo", "type": "text", "placeholder": "Tu nombre"},
      {"id": "email", "label": "Email", "type": "email", "placeholder": "tu@email.com"},
      {"id": "dolor", "label": "¿Qué tipo de malestar o dolor experimentas?", "type": "select", "options": ["Dolor físico (espalda, cuello, articulaciones)", "Estrés o ansiedad", "Cansancio crónico / fatiga", "Bloqueo emocional", "Insomnio o problemas de sueño", "Otro"]},
      {"id": "experiencia", "label": "¿Has tenido alguna experiencia previa con sanación energética?", "type": "select", "options": ["Sí, varias veces", "Solo una vez", "Nunca, es mi primera vez"]},
      {"id": "expectativa", "label": "¿Qué esperas de esta sesión gratuita?", "type": "select", "options": ["Aliviar un dolor o malestar específico", "Relajarme y reducir el estrés", "Conocer de qué se trata la sanación energética", "Conectar conmigo mismo/a"]}
    ]
  }'::jsonb,
  'Completar Encuesta para Sanar'
);

-- Modal for Sanación Grupal
INSERT INTO public.cta_modal_content (cta_link_id, modal_title, modal_subtitle, modal_body, modal_type, extra_data, cta_button_text, cta_button_url)
VALUES (
  'b0000000-0000-0000-0000-000000000002',
  'Sanación Grupal a Distancia',
  'Sesión en vivo por Zoom cada semana',
  'Únete a nuestra sesión semanal de sanación energética grupal. Desde la comodidad de tu hogar, conecta con la energía sanadora del Método ONE guiado por facilitadores certificados.',
  'info',
  '{
    "zoom_day": "Todos los Miércoles",
    "zoom_time": "20:00 hs (Argentina)",
    "zoom_duration": "1.5 horas",
    "zoom_id": "852 3691 7740",
    "zoom_password": "sanacion",
    "zoom_capacity": "Ilimitado",
    "benefits": [
      "Sanación energética grupal guiada",
      "Facilitadores certificados del Método ONE",
      "Comunidad de apoyo continuo",
      "Sin costo adicional para miembros"
    ]
  }'::jsonb,
  'Unirme a la Sesión por Zoom',
  'https://zoom.us/j/85236917740?pwd=sanacion'
);

-- Modal for Método ONE
INSERT INTO public.cta_modal_content (cta_link_id, modal_title, modal_subtitle, modal_body, modal_type, extra_data, cta_button_text, cta_button_url)
VALUES (
  'b0000000-0000-0000-0000-000000000003',
  'Método ONE',
  'Metodología de sanación energética integral',
  'El Método ONE es una metodología innovadora de sanación energética que combina técnicas ancestrales con conocimientos modernos. Aprende a canalizar la energía universal para sanar dolencias físicas, emocionales y espirituales.',
  'info',
  '{
    "video_url": "https://www.youtube.com/shorts/eo53JchtPf4",
    "video_embed_id": "eo53JchtPf4",
    "benefits": [
      "Aprende a canalizar energía sanadora",
      "Técnicas para aliviar dolor físico y emocional",
      "Certificación como facilitador energético",
      "Acceso a comunidad de práctica continua",
      "Material didáctico completo"
    ],
    "stats": {
      "duration": "4 horas",
      "levels": "3 niveles",
      "graduates": "+500"
    }
  }'::jsonb,
  'Más Información del Curso',
  '#metodo-one'
);

-- Modal for E-book
INSERT INTO public.cta_modal_content (cta_link_id, modal_title, modal_subtitle, modal_body, modal_type, extra_data, cta_button_text, cta_button_url)
VALUES (
  'b0000000-0000-0000-0000-000000000004',
  'El Poder Sanador de la Energía',
  'E-book digital gratuito',
  'Descubre los fundamentos de la sanación energética en este e-book completo. Aprende sobre los principios del Método ONE, ejercicios prácticos y testimonios reales de transformación.',
  'ebook',
  '{
    "cover_image": "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop",
    "format": "PDF",
    "pages": "45 páginas",
    "language": "Español",
    "chapters": [
      "Introducción a la energía sanadora",
      "Los 7 centros energéticos",
      "Técnicas básicas de canalización",
      "Ejercicios prácticos diarios",
      "Testimonios de transformación"
    ]
  }'::jsonb,
  'Descargar E-book Gratis',
  '#download-ebook'
);

-- Modal for Consulta 1:1
INSERT INTO public.cta_modal_content (cta_link_id, modal_title, modal_subtitle, modal_body, modal_type, extra_data, cta_button_text)
VALUES (
  'b0000000-0000-0000-0000-000000000005',
  'Consulta 1:1 Personalizada',
  'Elige tu facilitador energético',
  'Agenda una sesión privada con uno de nuestros facilitadores certificados. Cada sesión es personalizada según tus necesidades específicas.',
  'facilitators',
  '{}'::jsonb,
  'Ver Facilitadores'
);

-- Facilitators
INSERT INTO public.facilitators (name, specialty, avatar_url, rating, sessions_count, whatsapp_url, bio, display_order) VALUES
(
  'María González',
  'Sanación Emocional & Energética',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
  4.9,
  '+320',
  'https://wa.me/5491100000001?text=Hola%20María%2C%20quiero%20agendar%20una%20sesión',
  'Facilitadora certificada con más de 5 años de experiencia en el Método ONE. Especializada en liberación de bloqueos emocionales y sanación del campo energético.',
  1
),
(
  'Carlos Rodríguez',
  'Dolor Físico & Rehabilitación Energética',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
  4.8,
  '+250',
  'https://wa.me/5491100000002?text=Hola%20Carlos%2C%20quiero%20agendar%20una%20sesión',
  'Especialista en tratamiento energético del dolor físico. Combina el Método ONE con técnicas de rehabilitación para resultados integrales.',
  2
),
(
  'Ana Martínez',
  'Equilibrio Espiritual & Meditación',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
  5.0,
  '+180',
  'https://wa.me/5491100000003?text=Hola%20Ana%2C%20quiero%20agendar%20una%20sesión',
  'Guía espiritual y facilitadora del Método ONE. Se enfoca en meditación profunda y reconexión con la esencia interior.',
  3
),
(
  'Diego Fernández',
  'Sanación Integral & Bienestar',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
  4.7,
  '+200',
  'https://wa.me/5491100000004?text=Hola%20Diego%2C%20quiero%20agendar%20una%20sesión',
  'Facilitador integral del Método ONE con enfoque holístico. Trabaja sobre cuerpo, mente y espíritu para lograr un bienestar completo.',
  4
);
