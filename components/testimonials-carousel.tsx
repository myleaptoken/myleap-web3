"use client"

import { useState, useRef } from "react"
import { Play, X, ChevronLeft, ChevronRight, Quote } from "lucide-react"
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import type { Testimonial } from "@/lib/types"

export function TestimonialsCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const [selectedVideo, setSelectedVideo] = useState<Testimonial | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  if (testimonials.length === 0) return null

  function scrollBy(dir: number) {
    if (!scrollRef.current) return
    scrollRef.current.scrollBy({ left: dir * 200, behavior: "smooth" })
  }

  return (
    <>
      <div className="w-full animate-fade-up" style={{ animationDelay: "0.5s" }}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Quote className="h-4 w-4 text-primary" />
            <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              Testimonios
            </h2>
          </div>
          {testimonials.length > 3 && (
            <div className="flex gap-1">
              <button
                onClick={() => scrollBy(-1)}
                className="flex h-7 w-7 items-center justify-center rounded-full border border-border bg-secondary/50 text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
                aria-label="Anterior"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => scrollBy(1)}
                className="flex h-7 w-7 items-center justify-center rounded-full border border-border bg-secondary/50 text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
                aria-label="Siguiente"
              >
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Carousel */}
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {testimonials.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setSelectedVideo(t)}
              className="group relative flex-shrink-0 w-32 sm:w-36 snap-start cursor-pointer"
            >
              {/* Thumbnail */}
              <div className="relative aspect-[9/14] w-full overflow-hidden rounded-xl border border-border bg-secondary transition-all duration-300 group-hover:border-primary/50 group-hover:shadow-lg group-hover:shadow-primary/10 group-hover:scale-[1.03]">
                {t.thumbnail_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={t.thumbnail_url}
                    alt={`Testimonio de ${t.name}`}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-b from-primary/10 to-primary/5">
                    <Play className="h-8 w-8 text-primary/40" />
                  </div>
                )}

                {/* Play overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/90 shadow-lg">
                    <Play className="h-4 w-4 text-primary-foreground ml-0.5" fill="currentColor" />
                  </div>
                </div>

                {/* Gradient bottom */}
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/70 to-transparent" />

                {/* Name */}
                <div className="absolute inset-x-0 bottom-0 p-2">
                  <p className="text-xs font-semibold text-white truncate">{t.name}</p>
                  {t.subtitle && (
                    <p className="text-[10px] text-white/70 truncate">{t.subtitle}</p>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      <Dialog open={!!selectedVideo} onOpenChange={(open) => !open && setSelectedVideo(null)}>
        <DialogContent className="sm:max-w-md p-0 overflow-hidden bg-black border-none">
          <button
            onClick={() => setSelectedVideo(null)}
            className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>

          {selectedVideo && (
            <div className="flex flex-col">
              {/* Video player */}
              <div className="relative w-full" style={{ aspectRatio: "9/16", maxHeight: "80vh" }}>
                <video
                  src={selectedVideo.video_url}
                  controls
                  autoPlay
                  playsInline
                  className="h-full w-full object-contain bg-black"
                >
                  Tu navegador no soporta video.
                </video>
              </div>

              {/* Info bar */}
              <div className="bg-card p-4">
                <p className="text-sm font-semibold text-foreground">{selectedVideo.name}</p>
                {selectedVideo.subtitle && (
                  <p className="text-xs text-muted-foreground mt-0.5">{selectedVideo.subtitle}</p>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
