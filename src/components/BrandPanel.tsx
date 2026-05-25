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
  <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-5 backdrop-blur-md">
    <p className="text-2xl font-bold text-white">{value}</p>
    <p className="mt-1 text-xs tracking-wide text-white/60">{label}</p>
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
    <div className="relative flex min-h-screen w-1/2 flex-col overflow-hidden bg-[#050F2E] p-12">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <svg
          className="absolute -right-32 -top-32 h-[500px] w-[500px] opacity-20"
          viewBox="0 0 500 500"
          fill="none"
        >
          <circle cx="250" cy="250" r="200" stroke="#2561EE" strokeWidth="1" />
          <circle cx="250" cy="250" r="150" stroke="#2561EE" strokeWidth="0.5" />
          <circle cx="250" cy="250" r="100" stroke="#2561EE" strokeWidth="0.3" />
        </svg>
        <svg
          className="absolute -bottom-20 -left-20 h-[400px] w-[400px] opacity-10"
          viewBox="0 0 400 400"
          fill="none"
        >
          <circle cx="200" cy="200" r="180" stroke="#60A5FA" strokeWidth="0.8" />
          <circle cx="200" cy="200" r="130" stroke="#60A5FA" strokeWidth="0.4" />
        </svg>
      </div>

      <div className="relative z-10 flex flex-1 flex-col">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2561EE]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
          </div>
          <span className="text-xl font-bold text-white">Loud!</span>
        </div>

        <div className="mt-24 max-w-md">
          <h1 className="text-4xl font-bold leading-tight text-white md:text-5xl">
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
          <p className="mt-6 text-base leading-relaxed text-white/60">
            {subtext}
          </p>
        </div>

        <div className="mt-auto grid grid-cols-3 gap-4">
          {stats.map((stat) => (
            <StatCard key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </div>
      </div>
    </div>
  )
}
