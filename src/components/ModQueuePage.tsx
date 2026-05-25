import { useState } from "react"

type ViolationType = "Nudity" | "Threats" | "Spam" | "Misinformation" | "CSAM Risk"

type QueueItem = {
  id: number
  content: string
  user: string
  violation: ViolationType
  confidence: number
  flagged: string
}

const initialItems: QueueItem[] = [
  { id: 1, content: "Image post (explicit nudity)", user: "@jake_p", violation: "Nudity", confidence: 94, flagged: "4m ago" },
  { id: 2, content: "Comment: \"I will harm you all\"", user: "@threat_user", violation: "Threats", confidence: 99, flagged: "8m ago" },
  { id: 3, content: "Comment: \"Buy cheap followers now!\"", user: "@spam_bot_42", violation: "Spam", confidence: 91, flagged: "12m ago" },
  { id: 4, content: "Video post (CSAM hash match)", user: "@unknown", violation: "CSAM Risk", confidence: 97, flagged: "15m ago" },
  { id: 5, content: "Text post: \"miracle cure for COVID\"", user: "@misinfo_king", violation: "Misinformation", confidence: 88, flagged: "22m ago" },
  { id: 6, content: "Image post (hate symbol detected)", user: "@extremist_7", violation: "Threats", confidence: 96, flagged: "28m ago" },
  { id: 7, content: "Comment: \"DM me for promo\"", user: "@promo_girl", violation: "Spam", confidence: 72, flagged: "35m ago" },
  { id: 8, content: "Image post (partial nudity)", user: "@unknown", violation: "Nudity", confidence: 78, flagged: "42m ago" },
  { id: 9, content: "Text post: \"earth is flat\"", user: "@flat_earther", violation: "Misinformation", confidence: 85, flagged: "50m ago" },
  { id: 10, content: "Video post (CSAM hash near-match)", user: "@unknown", violation: "CSAM Risk", confidence: 93, flagged: "1h ago" },
  { id: 11, content: "Comment: \"I know where you live\"", user: "@creepy_49", violation: "Threats", confidence: 90, flagged: "1h ago" },
  { id: 12, content: "Image post (spam watermark)", user: "@spam_bot_99", violation: "Spam", confidence: 76, flagged: "1h ago" },
]

const violationColors: Record<ViolationType, string> = {
  Nudity: "bg-pink-100 text-pink-700",
  Threats: "bg-red-100 text-red-700",
  Spam: "bg-blue-100 text-blue-700",
  Misinformation: "bg-amber-100 text-amber-700",
  "CSAM Risk": "bg-rose-100 text-rose-800",
}

const autoRemovedBase = 7
const resolvedTodayBase = 34

export default function ModQueuePage() {
  const [items] = useState(initialItems)
  const [resolvedIds, setResolvedIds] = useState<Set<number>>(new Set())
  const [sessionResolvedCount, setSessionResolvedCount] = useState(0)
  const [search, setSearch] = useState("")
  const [violationFilter, setViolationFilter] = useState<"All" | ViolationType>("All")
  const [page, setPage] = useState(1)

  const perPage = 10

  const pending = items.filter((i) => !resolvedIds.has(i.id))

  const filtered = items.filter((i) => {
    if (resolvedIds.has(i.id)) return false
    if (violationFilter !== "All" && i.violation !== violationFilter) return false
    if (search) {
      const q = search.toLowerCase()
      const matches =
        i.content.toLowerCase().includes(q) ||
        i.user.toLowerCase().includes(q)
      if (!matches) return false
    }
    return true
  })

  const totalPages = Math.ceil(filtered.length / perPage)
  const pagedItems = filtered.slice((page - 1) * perPage, page * perPage)

  function resolve(id: number) {
    const next = new Set(resolvedIds)
    next.add(id)
    setResolvedIds(next)
    setSessionResolvedCount((c) => c + 1)
  }

  function handleAutoModerateAll() {
    const ids = items.filter((i) => !resolvedIds.has(i.id)).map((i) => i.id)
    const next = new Set(resolvedIds)
    ids.forEach((id) => next.add(id))
    setResolvedIds(next)
    setSessionResolvedCount((c) => c + ids.length)
  }

  function handleViolationChange(val: string) {
    setViolationFilter(val as typeof violationFilter)
    setPage(1)
  }

  function confidenceColor(v: number): string {
    if (v >= 90) return "bg-red-500"
    if (v >= 80) return "bg-orange-500"
    if (v >= 70) return "bg-amber-400"
    return "bg-cyan-500"
  }

  const pendingCount = pending.length

  return (
    <>
      {/* ── Header Row ── */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-[#08060D]">Mod Queue</h1>
          <p className="mt-1 text-[13px] text-[#6B6375]">
            AI-powered automated moderation queue for real-time content safety.
          </p>
        </div>
        <button
          onClick={handleAutoModerateAll}
          disabled={pendingCount === 0}
          className="rounded-xl bg-[#2561EE] px-5 py-2.5 text-xs font-medium text-white transition-colors hover:bg-[#1A4FCC] disabled:opacity-40"
        >
          Auto-Moderate All
        </button>
      </div>

      {/* ── Metric Overview Cards ── */}
      <div className="mb-6 grid grid-cols-4 gap-4">
        <div className="rounded-2xl border border-[#E5E4E7] bg-white p-5 shadow-sm">
          <p className="mb-1 text-[13px] font-medium text-[#6B6375]">Pending</p>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-[#08060D]">{pendingCount}</span>
            <span className="rounded-full bg-red-50 px-2 py-0.5 text-[11px] font-semibold text-red-600">
              Active
            </span>
          </div>
        </div>
        <div className="rounded-2xl border border-[#E5E4E7] bg-white p-5 shadow-sm">
          <p className="mb-1 text-[13px] font-medium text-[#6B6375]">Resolved Today</p>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-[#08060D]">{resolvedTodayBase + sessionResolvedCount}</span>
            <span className="rounded-full bg-green-50 px-2 py-0.5 text-[11px] font-semibold text-green-600">
              +{sessionResolvedCount} session
            </span>
          </div>
        </div>
        <div className="rounded-2xl border border-[#E5E4E7] bg-white p-5 shadow-sm">
          <p className="mb-1 text-[13px] font-medium text-[#6B6375]">Auto-Removed</p>
          <span className="text-xl font-bold text-[#08060D]">{autoRemovedBase}</span>
        </div>
        <div className="rounded-2xl border border-[#E5E4E7] bg-white p-5 shadow-sm">
          <p className="mb-1 text-[13px] font-medium text-[#6B6375]">Avg Response</p>
          <span className="text-xl font-bold text-[#08060D]">4m</span>
        </div>
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
            placeholder="Search queue..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1) }}
            className="w-full rounded-xl border border-[#E5E4E7] bg-white py-2.5 pl-10 pr-4 text-sm text-[#08060D] placeholder-[#9CA3AF] outline-none transition-colors focus:border-[#2561EE] focus:ring-1 focus:ring-[#2561EE]"
          />
        </div>

        <select
          value={violationFilter}
          onChange={(e) => handleViolationChange(e.target.value)}
          className="cursor-pointer rounded-xl border border-[#E5E4E7] bg-white px-4 py-2.5 text-sm text-[#08060D] outline-none focus:border-[#2561EE]"
        >
          <option value="All">All Violations</option>
          <option value="Nudity">Nudity</option>
          <option value="Threats">Threats</option>
          <option value="Spam">Spam</option>
          <option value="Misinformation">Misinformation</option>
          <option value="CSAM Risk">CSAM Risk</option>
        </select>
      </div>

      {/* ── Data Table ── */}
      <div className="overflow-x-auto overflow-hidden rounded-xl border border-[#E5E4E7] bg-white">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-[#E5E4E7] bg-[#F8F9FC]">
            <tr>
              <th className="px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B6375]">Content</th>
              <th className="px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B6375]">User</th>
              <th className="px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B6375]">Violation Type</th>
              <th className="px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B6375]">AI Confidence</th>
              <th className="px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B6375]">Flagged</th>
              <th className="px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B6375]">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E4E7]">
            {pagedItems.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center text-xs text-[#6B6375]">
                  No items in queue.
                </td>
              </tr>
            ) : (
              pagedItems.map((item) => (
                <tr key={item.id} className="transition-colors hover:bg-[#F8F9FC]">
                  <td className="max-w-56 px-4 py-3.5">
                    <span className="truncate text-[#08060D]">{item.content}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="font-medium text-[#2561EE]">{item.user}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`inline-block whitespace-nowrap rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${violationColors[item.violation]}`}>
                      {item.violation}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="h-2 w-24 overflow-hidden rounded-full bg-[#E5E4E7]">
                        <div
                          className={`h-full rounded-full transition-all ${confidenceColor(item.confidence)}`}
                          style={{ width: `${item.confidence}%` }}
                        />
                      </div>
                      <span
                        className={`text-[11px] font-bold ${
                          item.confidence >= 90
                            ? "text-red-600"
                            : item.confidence >= 80
                              ? "text-orange-600"
                              : "text-cyan-600"
                        }`}
                      >
                        {item.confidence}%
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-[#08060D]">{item.flagged}</td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => resolve(item.id)}
                        className="rounded-lg border border-green-300 bg-white px-3 py-1.5 text-xs font-medium text-green-600 transition-colors hover:bg-green-50"
                      >
                        Keep
                      </button>
                      <button
                        onClick={() => resolve(item.id)}
                        className="rounded-lg border border-red-300 bg-white px-3 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-50"
                      >
                        Remove
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ── Pagination ── */}
      <div className="mt-5 flex flex-wrap items-center justify-between gap-2">
        <p className="text-xs text-[#6B6375]">
          Showing {filtered.length === 0 ? 0 : (page - 1) * perPage + 1}
          –{Math.min(page * perPage, filtered.length)} of{" "}
          <span>{filtered.length.toLocaleString()}</span> items
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
