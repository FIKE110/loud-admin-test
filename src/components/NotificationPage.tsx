import { useState } from "react"
import { Bell, X, Check, Filter } from "lucide-react"

type NotificationType = "alert" | "info" | "stream" | "admin" | "block"

type Notification = {
  id: number
  type: NotificationType
  text: string
  time: string
  urgent: boolean
}

const initialNotifications: Notification[] = [
  { id: 1, type: "alert", text: "@jayden_m's post has been reported 3 times and is flagged for review.", time: "2 minutes ago", urgent: true },
  { id: 2, type: "info", text: "247 new users joined the platform today — 12% above average.", time: "1 hour ago", urgent: false },
  { id: 3, type: "stream", text: "@creativemind started a live stream — 1,200 viewers watching.", time: "2 hours ago", urgent: false },
  { id: 4, type: "admin", text: "Admin invitation sent to sarah@socialsphere.io.", time: "3 hours ago", urgent: false },
  { id: 5, type: "block", text: "User @xyz123 was blocked after receiving 5 reports for spam.", time: "5 hours ago", urgent: true },
  { id: 6, type: "alert", text: "@amina_k's story has been flagged for nudity — 8 reports received.", time: "6 hours ago", urgent: true },
  { id: 7, type: "info", text: "System backup completed successfully. Database size: 2.4 TB.", time: "8 hours ago", urgent: false },
  { id: 8, type: "stream", text: "@dj_kaybee went live — 3,400 concurrent viewers.", time: "10 hours ago", urgent: false },
  { id: 9, type: "admin", text: "Permissions updated for moderator @sarah_chen.", time: "12 hours ago", urgent: false },
  { id: 10, type: "block", text: "Account @spam_factory terminated — 23 spam reports in 24h.", time: "14 hours ago", urgent: true },
  { id: 11, type: "info", text: "Daily active users peaked at 12,401 today.", time: "16 hours ago", urgent: false },
  { id: 12, type: "alert", text: "@user_4029's comment on post #8712 flagged for hate speech.", time: "18 hours ago", urgent: true },
]

const typeLabels: Record<NotificationType, string> = {
  alert: "Alert",
  info: "Info",
  stream: "Live",
  admin: "Admin",
  block: "Block",
}

export default function NotificationPage() {
  const [search, setSearch] = useState("")
  const [typeFilter, setTypeFilter] = useState<"All" | NotificationType>("All")
  const [notifications, setNotifications] = useState(initialNotifications)

  const filtered = notifications.filter((n) => {
    if (typeFilter !== "All" && n.type !== typeFilter) return false
    if (search) {
      const q = search.toLowerCase()
      if (!n.text.toLowerCase().includes(q)) return false
    }
    return true
  })

  function dismiss(id: number) {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  function dismissAll() {
    setNotifications([])
  }

  return (
    <>
      {/* ── Header Row ── */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-[#08060D]">Notifications</h1>
          <p className="mt-1 text-[13px] text-[#6B6375]">
            Platform-wide real-time audit notifications and system alerts.
          </p>
        </div>
        {notifications.length > 0 && (
          <button
            onClick={dismissAll}
            className="flex items-center gap-2 rounded-xl border border-red-300 bg-white px-5 py-2.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-50"
          >
            <X className="h-4 w-4" />
            <span className="hidden sm:inline">Dismiss All</span>
            <span className="sm:hidden">Dismiss</span>
          </button>
        )}
      </div>

      {/* ── Summary Bar ── */}
      <div className="mb-5 flex items-center gap-4 text-xs text-[#6B6375]">
        <span>
          <span className="font-semibold text-[#08060D]">{notifications.length}</span> total
        </span>
        <span className="h-3 w-px bg-[#E5E4E7]" />
        <span>
          <span className="font-semibold text-red-600">{notifications.filter((n) => n.urgent).length}</span> urgent
        </span>
      </div>

      {/* ── Filter Toolbar ── */}
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <div className="relative w-full sm:w-64">
          <svg
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]"
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search notifications..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-[#E5E4E7] bg-white py-2.5 pl-10 pr-4 text-sm text-[#08060D] placeholder-[#9CA3AF] outline-none transition-colors focus:border-[#2561EE] focus:ring-1 focus:ring-[#2561EE]"
          />
        </div>

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value as typeof typeFilter)}
          className="cursor-pointer rounded-xl border border-[#E5E4E7] bg-white px-4 py-2.5 text-sm text-[#08060D] outline-none focus:border-[#2561EE]"
        >
          <option value="All">All Types</option>
          <option value="alert">Alert</option>
          <option value="info">Info</option>
          <option value="stream">Live</option>
          <option value="admin">Admin</option>
          <option value="block">Block</option>
        </select>

        <div className="flex items-center gap-1.5 text-xs text-[#6B6375]">
          <Filter className="h-3.5 w-3.5" />
          {typeFilter === "All" ? "No filter" : typeLabels[typeFilter]}
        </div>
      </div>

      {/* ── Notification Feed ── */}
      <div className="overflow-x-auto overflow-hidden rounded-xl border border-[#E5E4E7] bg-white">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Bell className="mb-3 h-10 w-10 text-[#D1D5DB]" />
            <p className="text-xs font-medium text-[#6B6375]">All clear</p>
            <p className="mt-1 text-xs text-[#9CA3AF]">No notifications match your current filters.</p>
          </div>
        ) : (
          <div className="divide-y divide-[#E5E4E7]">
            {filtered.map((n) => (
              <div
                key={n.id}
                className={`flex items-start gap-4 px-6 py-4 transition-colors hover:bg-[#F8F9FC] ${
                  n.urgent ? "bg-red-50/20" : ""
                }`}
              >
                {/* Icon */}
                <div className="mt-1 shrink-0">
                  {n.urgent ? (
                    <span className="relative flex h-3 w-3">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                      <span className="relative inline-flex h-3 w-3 rounded-full bg-red-500" />
                    </span>
                  ) : (
                    <span className="inline-flex h-3 w-3 rounded-full bg-[#2561EE]" />
                  )}
                </div>

                {/* Type badge */}
                <span className={`mt-0.5 shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                  n.type === "alert" ? "bg-red-100 text-red-700" :
                  n.type === "info" ? "bg-blue-100 text-blue-700" :
                  n.type === "stream" ? "bg-purple-100 text-purple-700" :
                  n.type === "admin" ? "bg-amber-100 text-amber-700" :
                  "bg-rose-100 text-rose-700"
                }`}>
                  {typeLabels[n.type]}
                </span>

                {/* Content */}
                <div className="flex-1">
                  <p className="text-xs leading-relaxed text-[#08060D]">{n.text}</p>
                  <p className="mt-1 text-xs text-[#9CA3AF]">{n.time}</p>
                </div>

                {/* Dismiss */}
                <button
                  onClick={() => dismiss(n.id)}
                  className="shrink-0 rounded-lg p-1.5 text-[#9CA3AF] transition-colors hover:bg-[#E5E4E7] hover:text-[#08060D]"
                  title="Dismiss"
                >
                  <Check className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
