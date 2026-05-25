const countries = [
  { name: "United States", code: "US", percentage: 32, color: "#2561EE" },
  { name: "United Kingdom", code: "UK", percentage: 24, color: "#F59E0B" },
  { name: "Germany", code: "DE", percentage: 18, color: "#10B981" },
  { name: "France", code: "FR", percentage: 14, color: "#EF4444" },
  { name: "Japan", code: "JP", percentage: 12, color: "#8B5CF6" },
]

export default function TopCountries() {
  return (
    <div className="rounded-2xl border border-[#E5E4E7] bg-white p-5">
      <h3 className="mb-4 text-base font-bold text-[#08060D]">Top Countries</h3>
      <div className="space-y-3.5">
        {countries.map((c) => (
          <div key={c.code}>
            <div className="mb-1 flex items-center justify-between">
              <span className="text-sm font-medium text-[#08060D]">{c.name}</span>
              <span className="text-xs font-semibold text-[#6B6375]">{c.percentage}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-[#F0F1F3]">
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${c.percentage}%`, backgroundColor: c.color }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
