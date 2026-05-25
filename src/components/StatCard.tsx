type StatCardProps = {
  title: string
  value: string
  change: string
  trend: "up" | "down"
  accent: string
  icon: React.ReactNode
}

export default function StatCard({ title, value, change, trend, accent, icon }: StatCardProps) {
  return (
    <div className="rounded-xl border border-[#E5E4E7] bg-white p-4 transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between">
        <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${accent}`}>
          {icon}
        </div>
        <span
          className={`flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[10px] font-medium ${
            trend === "up"
              ? "bg-green-50 text-green-600"
              : "bg-red-50 text-red-600"
          }`}
        >
          <svg
            className={`h-2.5 w-2.5 ${trend === "down" ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
          {change}
        </span>
      </div>
      <p className="mt-3 text-xs text-[#6B6375]">{title}</p>
      <p className="mt-0.5 text-lg font-bold text-[#08060D]">{value}</p>
    </div>
  )
}
