import { BarChart3, ArrowUpRight } from "lucide-react"

const postsData = [
  3200, 3400, 3100, 3600, 3800, 4100, 3900, 4200, 4500, 4300,
  4600, 4800, 4400, 4700, 5000, 5200, 4900, 5300, 5500, 5400,
  5700, 5900, 5600, 6000, 6200, 6100, 6400, 6600, 6300, 6500,
]
const storiesData = [
  1800, 1700, 1900, 2100, 2000, 2200, 2400, 2300, 2500, 2700,
  2600, 2800, 3000, 2900, 3100, 3300, 3200, 3400, 3600, 3500,
  3700, 3900, 3800, 4000, 4200, 4100, 4300, 4500, 4400, 4600,
]

const radarCategories = ["Images", "Videos", "Text", "Audio", "Stories"]
const radarValues = [85, 60, 45, 30, 55]

const heatmapDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
const heatmapData: number[][] = Array.from({ length: 5 }, () =>
  Array.from({ length: 7 }, () => Math.floor(Math.random() * 100)),
)

function linePath(data: number[], w: number, h: number): string {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  return data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * w
      const y = h - ((v - min) / range) * h
      return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`
    })
    .join(" ")
}

function areaPath(data: number[], w: number, h: number): string {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w
    const y = h - ((v - min) / range) * h
    return `${x.toFixed(1)},${y.toFixed(1)}`
  })
  return `M ${pts[0]} L ${pts.slice(1).join(" L ")} L ${w} ${h} L 0 ${h} Z`
}

function heatColor(v: number): string {
  if (v >= 80) return "bg-[#2561EE]"
  if (v >= 60) return "bg-[#5B8DEF]"
  if (v >= 40) return "bg-[#93B4F5]"
  if (v >= 20) return "bg-[#C5D9FB]"
  return "bg-[#E8EFFD]"
}

export default function AnalyticsPage() {
  const lw = 520
  const lh = 180
  const postsPath = linePath(postsData, lw, lh)
  const storiesPath = linePath(storiesData, lw, lh)
  const postsArea = areaPath(postsData, lw, lh)
  const storiesArea = areaPath(storiesData, lw, lh)

  const radarCx = 80
  const radarCy = 80
  const radarR = 65
  const radarSides = radarCategories.length

  function radarPoint(index: number, radius: number) {
    const angle = (Math.PI * 2 * index) / radarSides - Math.PI / 2
    return { x: radarCx + radius * Math.cos(angle), y: radarCy + radius * Math.sin(angle) }
  }

  const gridLevels = [0.25, 0.5, 0.75, 1]
  const radarPolygon = radarValues
    .map((v, i) => {
      const p = radarPoint(i, (v / 100) * radarR)
      return `${p.x},${p.y}`
    })
    .join(" ")

  const today = new Date()
  const monthName = today.toLocaleString("default", { month: "long" })

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#E5E4E7] pb-4">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <BarChart3 className="h-4 w-4 text-[#08060D]" />
            <h1 className="text-lg font-bold text-[#08060D]">Analytics Engine</h1>
          </div>
          <p className="text-[11px] font-semibold text-[#6B6375]">
            Platform performance metrics, distribution maps, and system telemetry.
          </p>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {([
          { title: "Avg Daily Users", value: "8,421", change: "3.2%" },
          { title: "Retention Rate", value: "67.3%", change: "1.1%" },
          { title: "Avg Session", value: "12m 34s", change: "0.8%" },
          { title: "Bounce Rate", value: "24.1%", change: "2.3%" },
        ] as const).map((metric) => (
          <div
            key={metric.title}
            className="rounded-2xl border border-[#E5E4E7] bg-white p-5 shadow-sm"
          >
            <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.08em] text-[#6B6375]">
              {metric.title}
            </p>
            <div className="flex items-baseline justify-between">
              <h3 className="text-xl font-bold text-[#08060D]">{metric.value}</h3>
              <span className="inline-flex items-center gap-0.5 rounded bg-green-50 px-1.5 py-0.5 text-[9px] font-bold text-green-700">
                <ArrowUpRight className="h-2 w-2" /> {metric.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Double Line Graph */}
        <div className="rounded-2xl border border-[#E5E4E7] bg-white p-6 shadow-sm xl:col-span-2">
          <div className="mb-3">
            <h4 className="mb-1 text-[11px] font-bold uppercase tracking-[0.08em] text-[#08060D]">
              Engagement Rate (30 days)
            </h4>
            <p className="text-[10px] font-semibold text-[#6B6375]">
              Time-series tracking of active posts and stories interactions.
            </p>
          </div>
          <svg viewBox={`0 0 ${lw + 60} ${lh + 40}`} className="w-full" style={{ maxHeight: 220 }}>
            <defs>
              <linearGradient id="postsGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2561EE" stopOpacity={0.15} />
                <stop offset="100%" stopColor="#2561EE" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="storiesGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#06B6D4" stopOpacity={0.15} />
                <stop offset="100%" stopColor="#06B6D4" stopOpacity={0} />
              </linearGradient>
            </defs>
            {[0, 0.25, 0.5, 0.75, 1].map((frac) => {
              const y = lh * (1 - frac) + 20
              const val = Math.round(1800 + frac * 4800)
              return (
                <g key={frac}>
                  <line x1={50} y1={y} x2={lw + 10} y2={y} stroke="#E5E4E7" strokeWidth={1} />
                  <text x={48} y={y + 3} textAnchor="end" className="fill-[#9CA3AF]" fontSize={8}>
                    {val.toLocaleString()}
                  </text>
                </g>
              )
            })}
            <path d={postsArea} fill="url(#postsGrad)" transform={`translate(50, 20)`} />
            <path d={storiesArea} fill="url(#storiesGrad)" transform={`translate(50, 20)`} />
            <path d={postsPath} fill="none" stroke="#2561EE" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" transform={`translate(50, 20)`} />
            <path d={storiesPath} fill="none" stroke="#06B6D4" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" transform={`translate(50, 20)`} />
            {[0, 9, 19, 29].map((i) => {
              const x = 50 + (i / 29) * lw
              return (
                <text key={i} x={x} y={lh + 34} textAnchor="middle" className="fill-[#9CA3AF]" fontSize={8}>
                  Day {i + 1}
                </text>
              )
            })}
            <rect x={lw - 40} y={0} width={8} height={8} rx={2} fill="#2561EE" />
            <text x={lw - 28} y={7} className="fill-[#6B6375]" fontSize={8}>Posts</text>
            <rect x={lw + 15} y={0} width={8} height={8} rx={2} fill="#06B6D4" />
            <text x={lw + 27} y={7} className="fill-[#6B6375]" fontSize={8}>Stories</text>
          </svg>
        </div>

        {/* Radar Chart */}
        <div className="rounded-2xl border border-[#E5E4E7] bg-white p-6 shadow-sm">
          <div className="mb-2">
            <h4 className="mb-1 text-[11px] font-bold uppercase tracking-[0.08em] text-[#08060D]">
              Post Types Distribution
            </h4>
            <p className="text-[10px] font-semibold text-[#6B6375]">
              Relative system configuration ratio.
            </p>
          </div>
          <svg viewBox="0 0 160 140" className="mx-auto w-48 h-44">
            {gridLevels.map((level) => {
              const pts = Array.from({ length: radarSides }, (_, i) => {
                const p = radarPoint(i, radarR * level)
                return `${p.x},${p.y}`
              }).join(" ")
              return <polygon key={level} points={pts} fill="none" stroke="#E5E4E7" strokeWidth={1} />
            })}
            {Array.from({ length: radarSides }, (_, i) => {
              const p = radarPoint(i, radarR)
              return <line key={i} x1={radarCx} y1={radarCy} x2={p.x} y2={p.y} stroke="#E5E4E7" strokeWidth={1} />
            })}
            <polygon points={radarPolygon} fill="#2561EE" fillOpacity={0.15} stroke="#2561EE" strokeWidth={2} strokeLinejoin="round" />
            {radarValues.map((v, i) => {
              const p = radarPoint(i, (v / 100) * radarR)
              return <circle key={i} cx={p.x} cy={p.y} r={3} fill="#2561EE" />
            })}
            {radarCategories.map((cat, i) => {
              const p = radarPoint(i, radarR + 12)
              return (
                <text key={i} x={p.x} y={p.y} textAnchor="middle" dominantBaseline="middle" className="fill-[#6B6375]" fontSize={8} fontWeight={600}>
                  {cat}
                </text>
              )
            })}
          </svg>
          <div className="mt-1 flex justify-center gap-3 text-[9px] text-[#6B6375]">
            {radarCategories.map((cat, i) => (
              <span key={cat} className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-[#2561EE]" />
                {cat}: {radarValues[i]}%
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Activity Heatmap */}
      <div className="rounded-2xl border border-[#E5E4E7] bg-white p-6 shadow-sm">
        <div className="mb-3">
          <h4 className="mb-1 text-[11px] font-bold uppercase tracking-[0.08em] text-[#08060D]">
            Activity Heatmap — {monthName}
          </h4>
          <p className="text-[10px] font-semibold text-[#6B6375]">
            Daily user activity intensity across the month.
          </p>
        </div>
        <div className="flex items-start gap-2">
          <div className="flex flex-col gap-1 pt-5">
            {heatmapDays.map((d) => (
              <span key={d} className="h-6 text-[9px] font-medium text-[#6B6375] leading-6">
                {d}
              </span>
            ))}
          </div>
          <div className="flex gap-1">
            {heatmapData.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-1">
                {week.map((v, di) => (
                  <div
                    key={di}
                    className={`h-6 w-6 rounded-[4px] ${heatColor(v)}`}
                    title={`Week ${wi + 1}, ${heatmapDays[di]}: ${v} activities`}
                  />
                ))}
              </div>
            ))}
          </div>
          <div className="ml-auto flex items-center gap-1.5 text-[9px] text-[#9CA3AF]">
            <span>Low</span>
            <div className="flex gap-0.5">
              <div className="h-4 w-4 rounded-[3px] bg-[#E8EFFD]" />
              <div className="h-4 w-4 rounded-[3px] bg-[#C5D9FB]" />
              <div className="h-4 w-4 rounded-[3px] bg-[#93B4F5]" />
              <div className="h-4 w-4 rounded-[3px] bg-[#5B8DEF]" />
              <div className="h-4 w-4 rounded-[3px] bg-[#2561EE]" />
            </div>
            <span>High</span>
          </div>
        </div>
      </div>
    </div>
  )
}
