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

-- 3. CTA LINKS
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

-- 5. FACILITATORS
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
