"use client"

import { useState, useRef, useCallback } from "react"
import { Play, X, ChevronLeft, ChevronRight } from "lucide-react"
import type { Testimonial } from "@/lib/types"

function isIframeEmbed(url: string): boolean {
  return /youtube\.com|youtu\.be|vimeo\.com/.test(url)
}

function isExternalOnly(url: string): boolean {
  return /instagram\.com|tiktok\.com/.test(url)
}

function getEmbedUrl(url: string): string {
  const ytMatch = url.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/)
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1`
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/)
  if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`
  return url
}

export function TestimonialsCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  if (testimonials.length === 0) return null

  const scrollCarousel = useCallback((dir: number) => {
    if (!scrollRef.current) return
    scrollRef.current.scrollBy({ left: dir * 180, behavior: "smooth" })
  }, [])

  function openVideo(idx: number) {
    setActiveIndex(idx)
  }

  function closeVideo() {
    setActiveIndex(null)
  }

  function navVideo(dir: number) {
    if (activeIndex === null) return
    const next = activeIndex + dir
    if (next >= 0 && next < testimonials.length) {
      setActiveIndex(next)
    }
  }

  const active = activeIndex !== null ? testimonials[activeIndex] : null

  return (
    <div className="w-full space-y-3">
      {/* Carousel row */}
      <div className="relative">
        {testimonials.length > 3 && (
          <button
            onClick={() => scrollCarousel(-1)}
            className="absolute -left-1 top-1/2 -translate-y-1/2 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-background/80 border border-border shadow-sm text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Anterior"
          >
            <ChevronLeft className="h-3 w-3" />
          </button>
        )}

        <div
          ref={scrollRef}
          className="flex gap-2.5 overflow-x-auto pb-1 snap-x snap-mandatory px-1"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {testimonials.map((t, i) => (
            <button
              key={t.id}
              type="button"
              onClick={() => openVideo(i)}
              className={`group relative flex-shrink-0 snap-start cursor-pointer transition-all duration-200 ${
                activeIndex === i ? "ring-2 ring-primary ring-offset-1 ring-offset-background rounded-xl" : ""
              }`}
              style={{ width: "clamp(120px, 30vw, 160px)" }}
            >
              <div className="relative aspect-[8/5] w-full overflow-hidden rounded-xl border border-border bg-secondary transition-all duration-200 group-hover:border-primary/40 group-hover:shadow-md group-hover:shadow-primary/5">
                {t.thumbnail_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={t.thumbnail_url}
                    alt={`Testimonio de ${t.name}`}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-b from-primary/10 to-primary/5">
                    <Play className="h-5 w-5 text-primary/40" />
                  </div>
                )}

                {/* Play icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/80 shadow-lg shadow-primary/20 opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-200">
                    <Play className="h-3.5 w-3.5 text-white ml-0.5" fill="currentColor" />
                  </div>
                </div>

                {/* Bottom gradient + name */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-2 pb-1.5 pt-4">
                  <p className="text-[10px] font-semibold text-white leading-tight truncate">{t.name}</p>
                  {t.subtitle && (
                    <p className="text-[8px] text-white/60 truncate">{t.subtitle}</p>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>

        {testimonials.length > 3 && (
          <button
            onClick={() => scrollCarousel(1)}
            className="absolute -right-1 top-1/2 -translate-y-1/2 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-background/80 border border-border shadow-sm text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Siguiente"
          >
            <ChevronRight className="h-3 w-3" />
          </button>
        )}
      </div>

      {/* Floating modal overlay */}
      {active !== null && activeIndex !== null && (
        <>
          <div
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={closeVideo}
            aria-hidden="true"
          />

          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <div
              className="pointer-events-auto relative w-full max-w-sm rounded-2xl border border-border bg-card shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 slide-in-from-bottom-4 duration-300"
              role="dialog"
              aria-label={`Testimonio de ${active.name}`}
            >
              {/* Close button */}
              <button
                onClick={closeVideo}
                className="absolute top-2 right-2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                aria-label="Cerrar"
              >
                <X className="h-3.5 w-3.5" />
              </button>

              {/* Video -- key uses activeIndex to force full remount on navigation */}
              <div className="relative w-full bg-black" style={{ aspectRatio: "9/16", maxHeight: "70vh" }}>
                {!active.video_url ? (
                  <div className="flex h-full w-full items-center justify-center text-white/50 text-sm">
                    Video no disponible
                  </div>
                ) : isIframeEmbed(active.video_url) ? (
                  <iframe
                    key={`iframe-${activeIndex}`}
                    src={getEmbedUrl(active.video_url)}
                    className="h-full w-full"
                    allow="autoplay; encrypted-media; picture-in-picture"
                    allowFullScreen
                    title={`Testimonio de ${active.name}`}
                  />
                ) : isExternalOnly(active.video_url) ? (
                  <div key={`ext-${activeIndex}`} className="flex h-full w-full flex-col items-center justify-center gap-3 p-6">
                    <p className="text-white/70 text-xs text-center">
                      Este video se reproduce en la plataforma original
                    </p>
                    <a
                      href={active.video_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-white/90 transition-colors"
                    >
                      Abrir video
                    </a>
                  </div>
                ) : (
                  <video
                    key={`video-${activeIndex}`}
                    src={active.video_url}
                    controls
                    autoPlay
                    playsInline
                    className="h-full w-full object-contain"
                  >
                    Tu navegador no soporta video.
                  </video>
                )}
              </div>

              {/* Bottom bar: info + nav */}
              <div className="flex items-center justify-between gap-2 px-3 py-2.5 bg-card border-t border-border">
                <button
                  onClick={() => navVideo(-1)}
                  disabled={activeIndex === 0}
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  aria-label="Video anterior"
                >
                  <ChevronLeft className="h-3.5 w-3.5" />
                </button>

                <div className="flex-1 min-w-0 text-center">
                  <p className="text-xs font-semibold text-foreground truncate">{active.name}</p>
                  <p className="text-[10px] text-muted-foreground">
                    {active.subtitle ? `${active.subtitle} \u00B7 ` : ""}
                    {activeIndex + 1}/{testimonials.length}
                  </p>
                </div>

                <button
                  onClick={() => navVideo(1)}
                  disabled={activeIndex === testimonials.length - 1}
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  aria-label="Video siguiente"
                >
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
