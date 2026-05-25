const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
const values = [65, 78, 52, 91, 74, 48, 83]
const maxVal = Math.max(...values)

export default function EngagementChart() {
  return (
    <div className="rounded-2xl border border-[#E5E4E7] bg-white p-5">
      <h3 className="mb-4 text-base font-bold text-[#08060D]">Engagement</h3>
      <div className="flex items-end gap-2" style={{ height: 120 }}>
        {days.map((day, i) => {
          const heightPct = (values[i] / maxVal) * 100
          return (
            <div key={day} className="group relative flex flex-1 flex-col items-center justify-end h-full">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 rounded bg-[#08060D] px-1.5 py-0.5 text-[10px] text-white opacity-0 transition-opacity group-hover:opacity-100 whitespace-nowrap">
                {values[i]}K
              </div>
              <div
                className="w-full max-w-[24px] rounded-t-md bg-[#2561EE] transition-all hover:opacity-80"
                style={{ height: `${heightPct}%` }}
              />
              <span className="mt-1.5 text-[9px] text-[#6B6375]">{day}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
