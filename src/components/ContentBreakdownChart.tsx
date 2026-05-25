const data = [
  { label: "Posts", value: 45, color: "#2561EE" },
  { label: "Comments", value: 25, color: "#F59E0B" },
  { label: "Media", value: 18, color: "#10B981" },
  { label: "Links", value: 12, color: "#EF4444" },
]

const total = data.reduce((s, d) => s + d.value, 0)
let cumulative = 0
const segments = data.map((d) => {
  const start = cumulative
  cumulative += d.value
  return { ...d, startAngle: (start / total) * 360, endAngle: (cumulative / total) * 360 }
})

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

function describeArc(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(cx, cy, r, endAngle)
  const end = polarToCartesian(cx, cy, r, startAngle)
  const largeArc = endAngle - startAngle > 180 ? "1" : "0"
  return `M ${cx} ${cy} L ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 0 ${end.x} ${end.y} Z`
}

export default function ContentBreakdownChart() {
  return (
    <div className="rounded-2xl border border-[#E5E4E7] bg-white p-5">
      <h3 className="mb-4 text-base font-bold text-[#08060D]">Content Breakdown</h3>
      <div className="flex items-center gap-6">
        <svg width="140" height="140" viewBox="0 0 140 140">
          {segments.map((seg) => (
            <path
              key={seg.label}
              d={describeArc(70, 70, 60, seg.startAngle, seg.endAngle)}
              fill={seg.color}
            />
          ))}
          <circle cx="70" cy="70" r="35" fill="white" />
        </svg>
        <div className="space-y-2.5">
          {data.map((d) => (
            <div key={d.label} className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: d.color }} />
              <span className="text-xs text-[#6B6375] min-w-[52px]">{d.label}</span>
              <span className="text-xs font-semibold text-[#08060D]">{d.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
