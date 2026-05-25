const activities = [
  {
    message: "Post flagged by 3 users",
    user: "@jayden",
    time: "2m ago",
    dot: "bg-green-500",
  },
  {
    message: "New report from",
    user: "@sarah",
    time: "8m ago",
    dot: "bg-blue-500",
  },
  {
    message: "Comment deleted by",
    user: "@admin",
    time: "15m ago",
    dot: "bg-yellow-500",
  },
  {
    message: "User banned by",
    user: "@mod_team",
    time: "24m ago",
    dot: "bg-red-500",
  },
  {
    message: "Stream started by",
    user: "@mike_tv",
    time: "1h ago",
    dot: "bg-green-500",
  },
  {
    message: "Content approval pending",
    user: "@emily",
    time: "1h ago",
    dot: "bg-blue-500",
  },
]

export default function LiveActivity() {
  return (
    <div className="rounded-2xl border border-[#E5E4E7] bg-white p-5">
      <h3 className="mb-4 text-base font-bold text-[#08060D]">Live Activity</h3>
      <div className="space-y-0">
        {activities.map((a, i) => (
          <div
            key={i}
            className="relative flex items-start gap-3 pb-4 pl-4 last:pb-0"
          >
            <div className="relative flex flex-col items-center">
              <span className={`relative z-10 mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${a.dot}`} />
              {i < activities.length - 1 && (
                <span className="absolute top-4 h-full w-px bg-[#E5E4E7]" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm text-[#08060D]">
                {a.message}{" "}
                <span className="font-medium text-[#2561EE]">{a.user}</span>
              </p>
              <p className="mt-0.5 text-xs text-[#9CA3AF]">{a.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
