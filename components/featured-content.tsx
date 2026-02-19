"use client"

import { Play, Star, Clock, Users } from "lucide-react"

interface FeaturedItem {
  title: string
  subtitle: string
  image: string
  stats: { icon: React.ReactNode; label: string }[]
  href: string
  tag: string
}

const featured: FeaturedItem[] = [
  {
    title: "Marketing Digital desde Cero",
    subtitle: "Domina las estrategias que usan los profesionales",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop",
    stats: [
      { icon: <Star className="h-3.5 w-3.5 text-primary" />, label: "4.9" },
      { icon: <Users className="h-3.5 w-3.5 text-primary" />, label: "2.4K" },
      { icon: <Clock className="h-3.5 w-3.5 text-primary" />, label: "12h" },
    ],
    href: "#marketing",
    tag: "Bestseller",
  },
  {
    title: "IA para Emprendedores",
    subtitle: "Automatiza y escala tu negocio con IA",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop",
    stats: [
      { icon: <Star className="h-3.5 w-3.5 text-primary" />, label: "4.8" },
      { icon: <Users className="h-3.5 w-3.5 text-primary" />, label: "1.8K" },
      { icon: <Clock className="h-3.5 w-3.5 text-primary" />, label: "8h" },
    ],
    href: "#ia",
    tag: "Nuevo",
  },
]

export function FeaturedContent() {
  return (
    <div className="w-full animate-fade-up" style={{ animationDelay: "0.6s" }}>
      <div className="flex items-center gap-2 mb-4">
        <Play className="h-4 w-4 text-primary" />
        <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">
          Contenido Destacado
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {featured.map((item) => (
          <a
            key={item.title}
            href={item.href}
            className="group relative overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 hover:scale-[1.02]"
          >
            <div className="relative h-36 sm:h-40 overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
              <span className="absolute top-3 left-3 rounded-full bg-primary px-2.5 py-1 text-[10px] font-bold text-primary-foreground uppercase tracking-wider">
                {item.tag}
              </span>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-foreground text-sm sm:text-base group-hover:text-primary transition-colors">
                {item.title}
              </h3>
              <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                {item.subtitle}
              </p>
              <div className="mt-3 flex items-center gap-3">
                {item.stats.map((stat, i) => (
                  <div key={i} className="flex items-center gap-1">
                    {stat.icon}
                    <span className="text-xs text-muted-foreground">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
