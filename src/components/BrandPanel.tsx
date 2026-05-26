type Stat = { value: string; label: string }

type HeadingSegment = { text: string; highlight?: boolean }

const defaultHeading: HeadingSegment[] = [
  { text: "Command your " },
  { text: "Loud!", highlight: true },
  { text: " community" },
]

const defaultSubtext =
  "The complete command center for Loud! — moderate content, manage users, and keep the community thriving."

const defaultStats: Stat[] = [
  { value: "124K", label: "TOTAL USERS" },
  { value: "892K", label: "TOTAL POSTS" },
  { value: "99.8%", label: "UPTIME" },
]

const StatCard = ({ value, label }: Stat) => (
  <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-3 sm:px-4 sm:py-3.5 backdrop-blur-md">
    <p className="text-base sm:text-lg font-bold text-white">{value}</p>
    <p className="mt-1 text-[9px] sm:text-[10px] tracking-wide text-white/60">{label}</p>
  </div>
)

export default function BrandPanel({
  heading = defaultHeading,
  subtext = defaultSubtext,
  stats = defaultStats,
}: {
  heading?: HeadingSegment[]
  subtext?: string
  stats?: Stat[]
}) {
  return (
    <div className="relative hidden min-h-screen w-full flex-col overflow-hidden bg-[#050F2E] p-8 sm:p-12 lg:flex lg:w-1/2">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <svg
          className="absolute -right-32 -top-32 h-[500px] w-[500px] opacity-10"
          viewBox="0 0 500 500"
          fill="none"
        >
          <circle cx="250" cy="250" r="200" stroke="#2561EE" strokeWidth="1" />
          <circle cx="250" cy="250" r="150" stroke="#2561EE" strokeWidth="0.5" />
          <circle cx="250" cy="250" r="100" stroke="#2561EE" strokeWidth="0.3" />
        </svg>
        <svg
          className="absolute -bottom-20 -left-20 h-[400px] w-[400px] opacity-30 blur-sm"
          viewBox="0 0 400 400"
          fill="none"
        >
          <defs>
            <radialGradient id="glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#93C5FD" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#93C5FD" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="200" cy="200" r="180" stroke="#93C5FD" strokeWidth="0.8" />
          <circle cx="200" cy="200" r="180" fill="url(#glow)" />
          <circle cx="200" cy="200" r="130" stroke="#93C5FD" strokeWidth="0.4" />
        </svg>
      </div>

      <div className="relative z-10 flex flex-1 flex-col">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Loud!" className="h-9 w-9 rounded-full border border-black/20" />
          <span className="text-xl font-bold tracking-[-0.02em]">
            <span className="text-white">Loud</span>
            <span className="text-[#2561EE]">!</span>
          </span>
        </div>

        <div className="mt-16 sm:mt-24 max-w-md">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-white">
            {heading.map((seg, i) =>
              seg.highlight ? (
                <span key={i} className="text-[#2561EE]">
                  {seg.text}
                </span>
              ) : (
                <span key={i}>{seg.text}</span>
              ),
            )}
          </h1>
          <p className="mt-4 sm:mt-6 text-sm sm:text-base leading-relaxed text-white/60">
            {subtext}
          </p>
        </div>

        <div className="mt-auto w-3/5 sm:w-3/4 grid grid-cols-3 gap-2 sm:gap-3">
          {stats.map((stat) => (
            <StatCard key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </div>
      </div>
    </div>
  )
}
