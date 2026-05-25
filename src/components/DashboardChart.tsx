const data = [
  { label: "Jan", value: 45, color: "#2561EE" },
  { label: "Feb", value: 52, color: "#2561EE" },
  { label: "Mar", value: 38, color: "#2561EE" },
  { label: "Apr", value: 65, color: "#2561EE" },
  { label: "May", value: 58, color: "#2561EE" },
  { label: "Jun", value: 72, color: "#2561EE" },
  { label: "Jul", value: 85, color: "#2561EE" },
  { label: "Aug", value: 68, color: "#2561EE" },
  { label: "Sep", value: 92, color: "#2561EE" },
  { label: "Oct", value: 78, color: "#2561EE" },
  { label: "Nov", value: 95, color: "#2561EE" },
  { label: "Dec", value: 88, color: "#2561EE" },
]

const maxValue = Math.max(...data.map((d) => d.value))

export default function DashboardChart() {
  return (
    <div className="rounded-2xl border border-[#E5E4E7] bg-white p-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-[#08060D]">Revenue Overview</h3>
          <p className="mt-1 text-sm text-[#6B6375]">Monthly revenue for 2026</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#2561EE]" />
            <span className="text-xs text-[#6B6375]">Revenue</span>
          </div>
          <select className="ml-2 rounded-lg border border-[#E5E4E7] bg-[#F8F9FC] px-3 py-1.5 text-xs text-[#6B6375] outline-none">
            <option>This Year</option>
            <option>Last Year</option>
          </select>
        </div>
      </div>

      <div className="mt-8 flex items-end gap-3" style={{ height: 180 }}>
        {data.map((item) => {
          const heightPercent = (item.value / maxValue) * 100
          return (
            <div key={item.label} className="group relative flex flex-1 flex-col items-center justify-end h-full">
              <div className="absolute -top-7 left-1/2 -translate-x-1/2 rounded bg-[#08060D] px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100 whitespace-nowrap">
                ${item.value}K
              </div>
              <div
                className="w-full max-w-[32px] rounded-t-md transition-all hover:opacity-80"
                style={{
                  height: `${heightPercent}%`,
                  background: `linear-gradient(180deg, ${item.color} 0%, ${item.color}88 100%)`,
                }}
              />
              <span className="mt-2 text-[10px] text-[#6B6375]">{item.label}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
