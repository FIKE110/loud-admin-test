import { useState } from "react"

type ReportType = "Post" | "Story" | "Comment" | "User"
type ReportPriority = "High" | "Medium" | "Low"
type ReportStatus = "Pending" | "Reviewing" | "Resolved"

type Report = {
  id: number
  reportedItem: string
  reportedHandle: string
  reporter: string
  reason: string
  type: ReportType
  priority: ReportPriority
  date: string
  status: ReportStatus
}

const reports: Report[] = [
  { id: 1, reportedItem: "Post by", reportedHandle: "@jake_p", reporter: "@mod_team", reason: "Hate Speech", type: "Post", priority: "High", date: "Jun 01", status: "Pending" },
  { id: 2, reportedItem: "User", reportedHandle: "@faker_bot", reporter: "@security_bot", reason: "Fake Account", type: "User", priority: "High", date: "May 31", status: "Reviewing" },
  { id: 3, reportedItem: "Comment by", reportedHandle: "@lola_a", reporter: "Multiple (5)", reason: "Harassment", type: "Comment", priority: "High", date: "May 30", status: "Pending" },
  { id: 4, reportedItem: "Story by", reportedHandle: "@kwame_k", reporter: "@content_team", reason: "Nudity", type: "Story", priority: "Medium", date: "May 29", status: "Resolved" },
  { id: 5, reportedItem: "Post by", reportedHandle: "@spam_king", reporter: "@auto_mod", reason: "Spam", type: "Post", priority: "High", date: "May 28", status: "Pending" },
  { id: 6, reportedItem: "Comment by", reportedHandle: "@tunde_b", reporter: "@community_mgr", reason: "Harassment", type: "Comment", priority: "Medium", date: "May 27", status: "Reviewing" },
  { id: 7, reportedItem: "User", reportedHandle: "@crypto_scam", reporter: "Multiple (12)", reason: "Fake Account", type: "User", priority: "High", date: "May 26", status: "Pending" },
  { id: 8, reportedItem: "Post by", reportedHandle: "@ama_g", reporter: "@user_support", reason: "Nudity", type: "Post", priority: "Medium", date: "May 25", status: "Resolved" },
  { id: 9, reportedItem: "Story by", reportedHandle: "@chi_o", reporter: "@mod_team", reason: "Hate Speech", type: "Story", priority: "High", date: "May 24", status: "Pending" },
  { id: 10, reportedItem: "Comment by", reportedHandle: "@zainab_a", reporter: "@admin", reason: "Spam", type: "Comment", priority: "Low", date: "May 23", status: "Resolved" },
  { id: 11, reportedItem: "Post by", reportedHandle: "@nneka_e", reporter: "@trust_safety", reason: "Harassment", type: "Post", priority: "Medium", date: "May 22", status: "Reviewing" },
  { id: 12, reportedItem: "User", reportedHandle: "@suspicious_99", reporter: "@auto_mod", reason: "Fake Account", type: "User", priority: "Low", date: "May 21", status: "Resolved" },
]

const totalReports = 1284

const typeColors: Record<ReportType, string> = {
  Post: "bg-blue-100 text-blue-700",
  Story: "bg-sky-100 text-sky-600",
  Comment: "bg-blue-200 text-blue-800",
  User: "bg-indigo-100 text-indigo-700",
}

const priorityColors: Record<ReportPriority, string> = {
  High: "bg-red-50 text-red-600",
  Medium: "bg-amber-50 text-amber-600",
  Low: "bg-green-50 text-green-600",
}

const statusColors: Record<ReportStatus, string> = {
  Pending: "bg-red-50 text-red-700",
  Reviewing: "bg-amber-50 text-amber-700",
  Resolved: "text-green-600",
}

export default function ReportsAndFlagsPage() {
  const [search, setSearch] = useState("")
  const [typeFilter, setTypeFilter] = useState<"All" | ReportType>("All")
  const [priorityFilter, setPriorityFilter] = useState<"All" | ReportPriority>("All")
  const [statusFilter, setStatusFilter] = useState<"All" | ReportStatus>("All")
  const [removedIds, setRemovedIds] = useState<Set<number>>(new Set())
  const [page, setPage] = useState(1)

  const perPage = 10

  const filtered = reports.filter((r) => {
    if (removedIds.has(r.id)) return false
    if (typeFilter !== "All" && r.type !== typeFilter) return false
    if (priorityFilter !== "All" && r.priority !== priorityFilter) return false
    if (statusFilter !== "All" && r.status !== statusFilter) return false
    if (search) {
      const q = search.toLowerCase()
      const matches =
        r.reportedHandle.toLowerCase().includes(q) ||
        r.reporter.toLowerCase().includes(q) ||
        String(r.id).includes(q)
      if (!matches) return false
    }
    return true
  })

  const totalPages = Math.ceil(filtered.length / perPage)
  const pagedReports = filtered.slice((page - 1) * perPage, page * perPage)

  function handleRemove(id: number) {
    const next = new Set(removedIds)
    next.add(id)
    setRemovedIds(next)
  }

  return (
    <>
      {/* ── Header Row ── */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-[#08060D]">Reports & Flags</h1>
          <p className="mt-1 text-[13px] text-[#6B6375]">
            Review and manage user-generated reports across the platform.
          </p>
        </div>
      </div>

      {/* ── Filter Toolbar ── */}
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <div className="relative w-full sm:w-56">
          <svg
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]"
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search reports..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1) }}
            className="w-full rounded-xl border border-[#E5E4E7] bg-white py-2.5 pl-10 pr-4 text-sm text-[#08060D] placeholder-[#9CA3AF] outline-none transition-colors focus:border-[#2561EE] focus:ring-1 focus:ring-[#2561EE]"
          />
        </div>

        <select
          value={typeFilter}
          onChange={(e) => { setTypeFilter(e.target.value as typeof typeFilter); setPage(1) }}
          className="cursor-pointer rounded-xl border border-[#E5E4E7] bg-white px-4 py-2.5 text-sm text-[#08060D] outline-none focus:border-[#2561EE]"
        >
          <option value="All">All Types</option>
          <option value="Post">Post</option>
          <option value="Story">Story</option>
          <option value="Comment">Comment</option>
          <option value="User">User</option>
        </select>

        <select
          value={priorityFilter}
          onChange={(e) => { setPriorityFilter(e.target.value as typeof priorityFilter); setPage(1) }}
          className="cursor-pointer rounded-xl border border-[#E5E4E7] bg-white px-4 py-2.5 text-sm text-[#08060D] outline-none focus:border-[#2561EE]"
        >
          <option value="All">All Priority</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => { setStatusFilter(e.target.value as typeof statusFilter); setPage(1) }}
          className="cursor-pointer rounded-xl border border-[#E5E4E7] bg-white px-4 py-2.5 text-sm text-[#08060D] outline-none focus:border-[#2561EE]"
        >
          <option value="All">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Reviewing">Reviewing</option>
          <option value="Resolved">Resolved</option>
        </select>
      </div>

      {/* ── Data Table ── */}
      <div className="overflow-x-auto overflow-hidden rounded-xl border border-[#E5E4E7] bg-white">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-[#E5E4E7] bg-[#F8F9FC]">
            <tr>
              <th className="px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B6375]">Reported Item</th>
              <th className="px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B6375]">Reporter</th>
              <th className="px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B6375]">Reason</th>
              <th className="px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B6375]">Type</th>
              <th className="px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B6375]">Priority</th>
              <th className="px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B6375]">Date</th>
              <th className="px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B6375]">Status</th>
              <th className="px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B6375]">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E4E7]">
            {pagedReports.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-12 text-center text-xs text-[#6B6375]">
                  No reports found.
                </td>
              </tr>
            ) : (
              pagedReports.map((r) => {
                const isResolved = r.status === "Resolved"
                return (
                  <tr key={r.id} className="transition-colors hover:bg-[#F8F9FC]">
                    <td className="px-4 py-3.5">
                      <span className="font-semibold text-[#08060D]">
                        {r.reportedItem} <span className="font-normal text-[#2561EE]">{r.reportedHandle}</span>
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-[#08060D]">{r.reporter}</td>
                    <td className="px-4 py-3.5 text-[#08060D]">{r.reason}</td>
                    <td className="px-4 py-3.5">
                      <span className={`inline-block whitespace-nowrap rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${typeColors[r.type]}`}>
                        {r.type}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={`inline-block whitespace-nowrap rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${priorityColors[r.priority]}`}>
                        {r.priority}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-[#08060D]">{r.date}</td>
                    <td className="px-4 py-3.5">
                      <span className={`inline-block whitespace-nowrap rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${statusColors[r.status]}`}>
                        {r.status}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      {isResolved ? (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-green-600">
                          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                          Resolved
                        </span>
                      ) : (
                        <div className="flex items-center gap-2">
                          <button className="rounded-lg border border-[#E5E4E7] px-3 py-1.5 text-xs font-medium text-[#2561EE] transition-colors hover:bg-blue-50">
                            Review
                          </button>
                          <button
                            onClick={() => handleRemove(r.id)}
                            className="rounded-lg border border-red-300 bg-white px-3 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-50"
                          >
                            Remove
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      {/* ── Pagination ── */}
      <div className="mt-5 flex flex-wrap items-center justify-between gap-2">
        <p className="text-xs text-[#6B6375]">
          Showing {filtered.length === 0 ? 0 : (page - 1) * perPage + 1}
          –{Math.min(page * perPage, filtered.length)} of{" "}
          <span>{totalReports.toLocaleString()}</span> reports
        </p>
        {totalPages > 1 && (
          <div className="flex items-center gap-1">
            <button
              disabled={page <= 1}
              onClick={() => setPage(page - 1)}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-xs text-[#6B6375] transition-colors hover:bg-[#E5E4E7] disabled:opacity-30"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <span
                key={p}
                onClick={() => setPage(p)}
                className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-xs transition-colors ${
                  p === page
                    ? "bg-[#2561EE] font-semibold text-white"
                    : "text-[#6B6375] hover:bg-[#E5E4E7]"
                }`}
              >
                {p}
              </span>
            ))}
            <button
              disabled={page >= totalPages}
              onClick={() => setPage(page + 1)}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-xs text-[#6B6375] transition-colors hover:bg-[#E5E4E7] disabled:opacity-30"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </>
  )
}
