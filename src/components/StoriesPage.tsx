import { useState } from "react"

type StoryStatus = "Active" | "Flagged"

type StoryEntry = {
  id: number
  creatorInitials: string
  creatorColor: string
  creatorName: string
  creatorHandle: string
  preview: string
  views: number
  durationLeft: string
  reports: number
  posted: string
  status: StoryStatus
}

const stories: StoryEntry[] = [
  { id: 1, creatorInitials: "AN", creatorColor: "bg-pink-500", creatorName: "Amara Nwosu", creatorHandle: "@amara_n", preview: "🎮 Gaming session highlights", views: 1240, durationLeft: "23h left", reports: 0, posted: "2h ago", status: "Active" },
  { id: 2, creatorInitials: "KM", creatorColor: "bg-blue-500", creatorName: "Kofi Mensah", creatorHandle: "@kofi_m", preview: "🎵 New track snippet preview", views: 3892, durationLeft: "18h left", reports: 0, posted: "6h ago", status: "Active" },
  { id: 3, creatorInitials: "ZA", creatorColor: "bg-green-500", creatorName: "Zainab Abdullah", creatorHandle: "@zainab_a", preview: "[Flagged for review]", views: 456, durationLeft: "Removed", reports: 5, posted: "12h ago", status: "Flagged" },
  { id: 4, creatorInitials: "TB", creatorColor: "bg-orange-500", creatorName: "Tunde Balogun", creatorHandle: "@tunde_b", preview: "👟 Morning run through Lagos", views: 892, durationLeft: "14h left", reports: 0, posted: "10h ago", status: "Active" },
  { id: 5, creatorInitials: "SO", creatorColor: "bg-purple-500", creatorName: "Sade Ogunleye", creatorHandle: "@sade_o", preview: "👗 New collection tease", views: 2341, durationLeft: "20h left", reports: 0, posted: "4h ago", status: "Active" },
  { id: 6, creatorInitials: "EO", creatorColor: "bg-red-500", creatorName: "Emeka Obi", creatorHandle: "@emeka_obi", preview: "[Flagged for review]", views: 178, durationLeft: "Removed", reports: 3, posted: "15h ago", status: "Flagged" },
  { id: 7, creatorInitials: "CO", creatorColor: "bg-teal-500", creatorName: "Chioma Okafor", creatorHandle: "@chioma_o", preview: "🍳 Breakfast at the new cafe", views: 1567, durationLeft: "8h left", reports: 0, posted: "16h ago", status: "Active" },
  { id: 8, creatorInitials: "KA", creatorColor: "bg-amber-500", creatorName: "Kwame Asare", creatorHandle: "@kwame_a", preview: "🎸 Acoustic jam session", views: 4567, durationLeft: "5h left", reports: 0, posted: "19h ago", status: "Active" },
  { id: 9, creatorInitials: "FU", creatorColor: "bg-indigo-500", creatorName: "Fatima Usman", creatorHandle: "@fatima_u", preview: "[Flagged for review]", views: 89, durationLeft: "Removed", reports: 8, posted: "20h ago", status: "Flagged" },
  { id: 10, creatorInitials: "NE", creatorColor: "bg-cyan-500", creatorName: "Nneka Eze", creatorHandle: "@nneka_e", preview: "📚 Book club pick this week", views: 678, durationLeft: "11h left", reports: 0, posted: "13h ago", status: "Active" },
  { id: 11, creatorInitials: "CO", creatorColor: "bg-rose-500", creatorName: "Chuks Okeke", creatorHandle: "@chuks_o", preview: "🏀 Pickup game highlights", views: 2345, durationLeft: "3h left", reports: 0, posted: "21h ago", status: "Active" },
  { id: 12, creatorInitials: "YA", creatorColor: "bg-violet-500", creatorName: "Yaa Asantewaa", creatorHandle: "@yaa_a", preview: "🎨 New painting in progress", views: 890, durationLeft: "7h left", reports: 0, posted: "17h ago", status: "Active" },
]

const totalStories = 1892

export default function StoriesPage() {
  const [search, setSearch] = useState("")
  const [scope, setScope] = useState<"All Stories" | "Flagged">("All Stories")
  const [removedIds, setRemovedIds] = useState<Set<number>>(new Set())
  const [page, setPage] = useState(1)

  const perPage = 10

  const filtered = stories.filter((s) => {
    if (removedIds.has(s.id)) return false
    if (scope === "Flagged" && s.status !== "Flagged") return false
    if (search) {
      const q = search.toLowerCase()
      const matches =
        s.creatorName.toLowerCase().includes(q) ||
        s.creatorHandle.toLowerCase().includes(q) ||
        s.preview.toLowerCase().includes(q)
      if (!matches) return false
    }
    return true
  })

  const totalPages = Math.ceil(filtered.length / perPage)
  const pagedStories = filtered.slice((page - 1) * perPage, page * perPage)

  function handleRemove(id: number) {
    const next = new Set(removedIds)
    next.add(id)
    setRemovedIds(next)
  }

  function handleScopeChange(val: string) {
    setScope(val as typeof scope)
    setPage(1)
  }

  function formatNumber(n: number): string {
    if (n >= 1000) return (n / 1000).toFixed(n >= 10000 ? 0 : 1) + "k"
    return String(n)
  }

  return (
    <>
      {/* ── Header Row ── */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-[#08060D]">Stories</h1>
          <p className="mt-1 text-[13px] text-[#6B6375]">
            Review and moderate ephemeral story content across the platform.
          </p>
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
            placeholder="Search stories..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1) }}
            className="w-full rounded-xl border border-[#E5E4E7] bg-white py-2.5 pl-10 pr-4 text-sm text-[#08060D] placeholder-[#9CA3AF] outline-none transition-colors focus:border-[#2561EE] focus:ring-1 focus:ring-[#2561EE]"
          />
        </div>

        <select
          value={scope}
          onChange={(e) => handleScopeChange(e.target.value)}
          className="cursor-pointer rounded-xl border border-[#E5E4E7] bg-white px-4 py-2.5 text-sm text-[#08060D] outline-none focus:border-[#2561EE]"
        >
          <option value="All Stories">All Stories</option>
          <option value="Flagged">Flagged</option>
        </select>
      </div>

      {/* ── Data Table ── */}
      <div className="overflow-x-auto overflow-hidden rounded-xl border border-[#E5E4E7] bg-white">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-[#E5E4E7] bg-[#F8F9FC]">
            <tr>
              <th className="px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B6375]">User</th>
              <th className="px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B6375]">Preview</th>
              <th className="px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B6375]">Views</th>
              <th className="px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B6375]">Duration Left</th>
              <th className="px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B6375]">Reports</th>
              <th className="px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B6375]">Posted</th>
              <th className="px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B6375]">Status</th>
              <th className="px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B6375]">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E4E7]">
            {pagedStories.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-12 text-center text-xs text-[#6B6375]">
                  No stories found.
                </td>
              </tr>
            ) : (
              pagedStories.map((s) => {
                const isFlagged = s.status === "Flagged"
                const isFlaggedPreview = s.preview === "[Flagged for review]"
                return (
                  <tr key={s.id} className="transition-colors hover:bg-[#F8F9FC]">
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white ${s.creatorColor}`}>
                          {s.creatorInitials}
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-xs font-medium text-[#08060D]">{s.creatorName}</p>
                          <p className="truncate text-[10px] text-[#9CA3AF]">{s.creatorHandle}</p>
                        </div>
                      </div>
                    </td>
                    <td className="max-w-48 px-4 py-3.5">
                      <p
                        className={`truncate ${isFlaggedPreview ? "italic text-[#9CA3AF]" : "text-[#08060D]"}`}
                      >
                        {s.preview}
                      </p>
                    </td>
                    <td className="px-4 py-3.5 text-[#08060D]">{formatNumber(s.views)}</td>
                    <td className="px-4 py-3.5">
                      <span
                        className={`font-medium ${
                          isFlagged ? "text-red-600" : "text-[#08060D]"
                        }`}
                      >
                        {s.durationLeft}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span
                        className={`font-semibold ${
                          s.reports > 0 ? "text-red-600" : "text-[#9CA3AF]"
                        }`}
                      >
                        {s.reports}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-[#08060D]">{s.posted}</td>
                    <td className="px-4 py-3.5">
                      <span
                        className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                          isFlagged
                            ? "bg-red-100 text-red-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {isFlagged ? "Flagged" : "Active"}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        <button className="rounded-lg px-3 py-1.5 text-xs font-medium text-[#2561EE] transition-colors hover:bg-blue-50">
                          View
                        </button>
                        {isFlagged && (
                          <button
                            onClick={() => handleRemove(s.id)}
                            className="rounded-lg border border-red-300 bg-white px-3 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-50"
                          >
                            Remove
                          </button>
                        )}
                      </div>
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
          <span>{totalStories.toLocaleString()}</span> stories
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
