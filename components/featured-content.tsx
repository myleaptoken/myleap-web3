"use client"

import { useState } from "react"
import { Play, Clock, Users } from "lucide-react"
import type { CTALinkWithModal } from "@/lib/types"
import { DynamicModal } from "@/components/cta-modals"

export function FeaturedContent({ links }: { links: CTALinkWithModal[] }) {
  const [activeLink, setActiveLink] = useState<CTALinkWithModal | null>(null)

  return (
    <>
      <div className="w-full animate-fade-up" style={{ animationDelay: "0.6s" }}>
        <div className="flex items-center gap-2 mb-4">
          <Play className="h-4 w-4 text-primary" />
          <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">
            Contenido Destacado
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {links.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => setActiveLink(link)}
              className="group relative overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 hover:scale-[1.02] text-left cursor-pointer"
            >
              {link.featured_image && (
                <div className="relative h-36 sm:h-40 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={link.featured_image}
                    alt={link.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                  {link.featured_tag && (
                    <span className="absolute top-3 left-3 rounded-full bg-primary px-2.5 py-1 text-[10px] font-bold text-primary-foreground uppercase tracking-wider">
                      {link.featured_tag}
                    </span>
                  )}
                </div>
              )}
              <div className="p-4">
                <h3 className="font-semibold text-foreground text-sm sm:text-base group-hover:text-primary transition-colors">
                  {link.title}
                </h3>
                {link.description && (
                  <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                    {link.description}
                  </p>
                )}
                {(link.featured_stat_1_label || link.featured_stat_2_label) && (
                  <div className="mt-3 flex items-center gap-3">
                    {link.featured_stat_1_label && (
                      <div className="flex items-center gap-1">
                        <Users className="h-3.5 w-3.5 text-primary" />
                        <span className="text-xs text-muted-foreground">
                          {link.featured_stat_1_label}
                        </span>
                      </div>
                    )}
                    {link.featured_stat_2_label && (
                      <div className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5 text-primary" />
                        <span className="text-xs text-muted-foreground">
                          {link.featured_stat_2_label}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Modal */}
      <DynamicModal
        link={activeLink}
        facilitators={[]}
        open={activeLink !== null}
        onOpenChange={(v) => !v && setActiveLink(null)}
      />
    </>
  )
}
