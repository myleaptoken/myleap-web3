"use client"

import Image from "next/image"


export function ProfileHeader() {
  return (
    <div className="relative w-full">
      {/* Banner */}
      <div className="relative h-44 sm:h-56 md:h-64 w-full overflow-hidden rounded-b-2xl">
        <Image
          src="/images/banner.jpg"
          alt="Banner de perfil MyLeap"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
      </div>

      {/* Avatar */}
      <div className="relative -mt-16 sm:-mt-20 flex flex-col items-center px-4">
        <div className="relative animate-scale-in">
          <div className="h-28 w-28 sm:h-32 sm:w-32 rounded-full border-4 border-transparent overflow-hidden animate-pulse-glow">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/avatar.png"
              alt="MyLeap Logo"
              width={128}
              height={128}
              className="h-full w-full object-cover"
            />
          </div>

        </div>

        {/* Name & Bio */}
        <div className="mt-4 flex flex-col items-center text-center animate-fade-up">
          <h1 className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-balance title-shimmer-text">
            MY LEAP
          </h1>
          <p className="mt-1 text-sm sm:text-base text-primary font-medium flex items-center gap-1.5">
            <span className="font-normal">Potenciado Por</span>
            <span className="text-base sm:text-lg font-bold tracking-wide subtitle-shimmer-text">
              {'Método ONE'}
            </span>
          </p>
          <p className="mt-3 max-w-md text-sm sm:text-base text-muted-foreground leading-relaxed text-pretty">
            Tu salto a la sanación. Cursos, facilitadores, eventos y una comunidad para impulsar tu energía vital.
          </p>
        </div>

        {/* Stats */}
        <div className="mt-6 flex items-center gap-6 sm:gap-10 animate-fade-up" style={{ animationDelay: "0.15s" }}>
          <StatItem value="10K+" label="Seguidores" />
          <div className="h-8 w-px bg-border" />
          <StatItem value="2+" label="Cursos" />
          <div className="h-8 w-px bg-border" />
          <StatItem value="1K+" label="Estudiantes" />
        </div>
      </div>
    </div>
  )
}

function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-lg sm:text-xl font-bold text-foreground font-mono">{value}</span>
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  )
}
