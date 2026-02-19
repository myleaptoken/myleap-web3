"use client"

import { Play, Clock, Users } from "lucide-react"

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
    title: "Curso M\u00e9todo ONE Nivel I",
    subtitle: "Inicia tu camino en la sanaci\u00f3n energ\u00e9tica",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=250&fit=crop",
    stats: [
      { icon: <Users className="h-3.5 w-3.5 text-primary" />, label: "Ilimitado" },
      { icon: <Clock className="h-3.5 w-3.5 text-primary" />, label: "4h" },
    ],
    href: "#metodo-one",
    tag: "Curso",
  },
  {
    title: "Sanaci\u00f3n Grupal a Distancia",
    subtitle: "Conectate a la videollamada y sana en grupo",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=250&fit=crop",
    stats: [
      { icon: <Users className="h-3.5 w-3.5 text-primary" />, label: "Ilimitado" },
      { icon: <Clock className="h-3.5 w-3.5 text-primary" />, label: "1.5h" },
    ],
    href: "#sanacion-grupal",
    tag: "En Vivo",
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
