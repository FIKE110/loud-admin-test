const data = [
  { label: "Jan", value: 45 },
  { label: "Feb", value: 52 },
  { label: "Mar", value: 38 },
  { label: "Apr", value: 65 },
  { label: "May", value: 58 },
  { label: "Jun", value: 72 },
  { label: "Jul", value: 85 },
  { label: "Aug", value: 68 },
  { label: "Sep", value: 92 },
  { label: "Oct", value: 78 },
  { label: "Nov", value: 95 },
  { label: "Dec", value: 88 },
]

const maxValue = Math.max(...data.map((d) => d.value))

function getLinePath(height: number, width: number) {
  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * (width - 40) + 20
    const y = height - (d.value / maxValue) * (height - 40) - 20
    return `${x},${y}`
  })
  return `M${points.join(" L")}`
}

function getAreaPath(height: number, width: number) {
  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * (width - 40) + 20
    const y = height - (d.value / maxValue) * (height - 40) - 20
    return `${x},${y}`
  })
  const firstX = (0 / (data.length - 1)) * (width - 40) + 20
  const lastX = ((data.length - 1) / (data.length - 1)) * (width - 40) + 20
  return `M${points.join(" L")} L${lastX},${height - 20} L${firstX},${height - 20} Z`
}

export default function UserGrowthChart() {
  return (
    <div className="rounded-2xl border border-[#E5E4E7] bg-white p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-[#08060D]">User Growth</h3>
          <p className="text-xs text-[#6B6375]">Monthly new users</p>
        </div>
        <select className="rounded-lg border border-[#E5E4E7] bg-[#F8F9FC] px-2.5 py-1.5 text-xs text-[#6B6375] outline-none">
          <option>This Year</option>
          <option>Last Year</option>
        </select>
      </div>
      <svg viewBox="0 0 340 160" className="w-full">
        <defs>
          <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2561EE" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#2561EE" stopOpacity="0.01" />
          </linearGradient>
        </defs>
        <path d={getAreaPath(140, 320)} fill="url(#areaGrad)" />
        <path
          d={getLinePath(140, 320)}
          fill="none"
          stroke="#2561EE"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {data.map((d, i) => {
          const cx = (i / (data.length - 1)) * (320 - 40) + 20
          const cy = 140 - (d.value / maxValue) * (140 - 40) - 20
          return (
            <g key={d.label}>
              <circle cx={cx} cy={cy} r="3" fill="white" stroke="#2561EE" strokeWidth="1.5" />
              {i % 3 === 0 && (
                <text x={cx} y={152} textAnchor="middle" fontSize="8" fill="#9CA3AF">
                  {d.label}
                </text>
              )}
            </g>
          )
        })}
      </svg>
    </div>
  )
}
