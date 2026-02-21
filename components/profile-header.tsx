import type { Profile } from "@/lib/types"

export function ProfileHeader({ profile }: { profile: Profile }) {
  return (
    <div className="relative w-full">
      {/* Banner */}
      <div className="relative h-44 sm:h-56 md:h-64 w-full overflow-hidden rounded-b-2xl">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/banner.png"
          alt={`Banner de perfil ${profile.name}`}
          className="absolute inset-0 h-full w-full object-cover object-[center_30%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
      </div>

      {/* Avatar */}
      <div className="relative -mt-16 sm:-mt-20 flex flex-col items-center px-4">
        <div className="relative animate-scale-in">
          <div className="h-24 w-24 sm:h-32 sm:w-32 dark:h-28 dark:w-28 dark:sm:h-32 dark:sm:w-32 rounded-full border-4 border-transparent bg-[#0d1a2d] overflow-hidden animate-pulse-glow">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/avatar.png"
              alt={`${profile.name} Logo`}
              width={128}
              height={128}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Name & Bio */}
        <div className="mt-4 flex flex-col items-center text-center animate-fade-up">
          <h1 className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-balance title-shimmer-text">
            {profile.name.toUpperCase()}
          </h1>
          {profile.subtitle && (
            <p className="mt-1 text-sm sm:text-base text-primary font-medium flex items-center gap-1.5">
              <span className="font-normal">Potenciado Por</span>
              <span className="text-base sm:text-lg font-bold tracking-wide subtitle-shimmer-text">
                {'Método ONE'}
              </span>
            </p>
          )}
          {profile.bio && (
            <p className="mt-3 max-w-md text-sm sm:text-base text-muted-foreground leading-relaxed text-pretty">
              {profile.bio}
            </p>
          )}
        </div>

        {/* Stats */}
        <div
          className="mt-6 flex items-center gap-6 sm:gap-10 animate-fade-up"
          style={{ animationDelay: "0.15s" }}
        >
          <StatItem value={profile.stat_leapers} label="Leapers" />
          <div className="h-8 w-px bg-border" />
          <StatItem value={profile.stat_cursos} label="Cursos Imp." />
          <div className="h-8 w-px bg-border" />
          <StatItem value={profile.stat_estudiantes} label="Estudiantes" />
        </div>
      </div>
    </div>
  )
}

function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-lg sm:text-xl font-bold text-foreground font-mono">
        {value}
      </span>
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  )
}
