import { useState } from "react"

type GroupStatus = "Active" | "Flagged"

type GroupEntry = {
  id: number
  creatorInitials: string
  creatorColor: string
  creatorName: string
  creatorHandle: string
  groupName: string
  members: number
  posts: number
  reports: number
  created: string
  status: GroupStatus
}

const groups: GroupEntry[] = [
  { id: 1, creatorInitials: "AN", creatorColor: "bg-pink-500", creatorName: "Amara Nwosu", creatorHandle: "@amara_n", groupName: "Photography Club", members: 12456, posts: 892, reports: 0, created: "Jan 2024", status: "Active" },
  { id: 2, creatorInitials: "KM", creatorColor: "bg-blue-500", creatorName: "Kofi Mensah", creatorHandle: "@kofi_m", groupName: "Digital Artists Hub", members: 8923, posts: 1567, reports: 3, created: "Mar 2024", status: "Flagged" },
  { id: 3, creatorInitials: "ZA", creatorColor: "bg-green-500", creatorName: "Zainab Abdullah", creatorHandle: "@zainab_a", groupName: "Travel Space Africa", members: 45678, posts: 2341, reports: 0, created: "Nov 2023", status: "Active" },
  { id: 4, creatorInitials: "CO", creatorColor: "bg-orange-500", creatorName: "Chidi Okonkwo", creatorHandle: "@chidi_o", groupName: "Afrobeats Producers", members: 12345, posts: 4567, reports: 8, created: "Feb 2024", status: "Flagged" },
  { id: 5, creatorInitials: "SO", creatorColor: "bg-purple-500", creatorName: "Sade Ogunleye", creatorHandle: "@sade_o", groupName: "Fashion Designers Collective", members: 6789, posts: 1234, reports: 0, created: "Jun 2024", status: "Active" },
  { id: 6, creatorInitials: "EO", creatorColor: "bg-red-500", creatorName: "Emeka Obi", creatorHandle: "@emeka_obi", groupName: "Nollywood Filmmakers", members: 23456, posts: 3456, reports: 2, created: "Apr 2024", status: "Flagged" },
  { id: 7, creatorInitials: "CO", creatorColor: "bg-teal-500", creatorName: "Chioma Okafor", creatorHandle: "@chioma_o", groupName: "Book Club Lagos", members: 3456, posts: 789, reports: 0, created: "Aug 2024", status: "Active" },
  { id: 8, creatorInitials: "KA", creatorColor: "bg-amber-500", creatorName: "Kwame Asare", creatorHandle: "@kwame_a", groupName: "Accra Music Scene", members: 18765, posts: 2890, reports: 0, created: "May 2024", status: "Active" },
  { id: 9, creatorInitials: "FU", creatorColor: "bg-indigo-500", creatorName: "Fatima Usman", creatorHandle: "@fatima_u", groupName: "Tech Women Africa", members: 56789, posts: 5678, reports: 0, created: "Oct 2023", status: "Active" },
  { id: 10, creatorInitials: "TB", creatorColor: "bg-rose-500", creatorName: "Tunde Balogun", creatorHandle: "@tunde_b", groupName: "Lagos Foodies", members: 32145, posts: 4321, reports: 11, created: "Jul 2024", status: "Flagged" },
  { id: 11, creatorInitials: "NE", creatorColor: "bg-cyan-500", creatorName: "Nneka Eze", creatorHandle: "@nneka_e", groupName: "Yoga & Wellness Circle", members: 4567, posts: 567, reports: 0, created: "Sep 2024", status: "Active" },
  { id: 12, creatorInitials: "YA", creatorColor: "bg-violet-500", creatorName: "Yaa Asantewaa", creatorHandle: "@yaa_a", groupName: "Ghanaian Creatives", members: 9876, posts: 2109, reports: 0, created: "Dec 2023", status: "Active" },
]

const totalGroups = 246

export default function CollageAndGroupsPage() {
  const [search, setSearch] = useState("")
  const [scope, setScope] = useState<"All" | "Flagged">("All")
  const [removedIds, setRemovedIds] = useState<Set<number>>(new Set())
  const [page, setPage] = useState(1)

  const perPage = 10

  const filtered = groups.filter((g) => {
    if (removedIds.has(g.id)) return false
    if (scope === "Flagged" && g.status !== "Flagged") return false
    if (search) {
      const q = search.toLowerCase()
      const matches =
        g.creatorName.toLowerCase().includes(q) ||
        g.creatorHandle.toLowerCase().includes(q) ||
        g.groupName.toLowerCase().includes(q)
      if (!matches) return false
    }
    return true
  })

  const totalPages = Math.ceil(filtered.length / perPage)
  const pagedGroups = filtered.slice((page - 1) * perPage, page * perPage)

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
          <h1 className="text-lg sm:text-xl font-bold text-[#08060D]">Collage & Group Posts</h1>
          <p className="mt-1 text-[13px] text-[#6B6375]">
            Review and moderate group and collage content.
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
            placeholder="Search groups..."
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
          <option value="All">All</option>
          <option value="Flagged">Flagged</option>
        </select>
      </div>

      {/* ── Data Table ── */}
      <div className="overflow-x-auto overflow-hidden rounded-xl border border-[#E5E4E7] bg-white">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-[#E5E4E7] bg-[#F8F9FC]">
            <tr>
              <th className="px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B6375]">Creator</th>
              <th className="px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B6375]">Group Name</th>
              <th className="px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B6375]">Members</th>
              <th className="px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B6375]">Posts</th>
              <th className="px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B6375]">Reports</th>
              <th className="px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B6375]">Created</th>
              <th className="px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B6375]">Status</th>
              <th className="px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B6375]">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E4E7]">
            {pagedGroups.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-12 text-center text-xs text-[#6B6375]">
                  No groups found.
                </td>
              </tr>
            ) : (
              pagedGroups.map((g) => {
                const isFlagged = g.status === "Flagged"
                return (
                  <tr key={g.id} className="transition-colors hover:bg-[#F8F9FC]">
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white ${g.creatorColor}`}>
                          {g.creatorInitials}
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-xs font-medium text-[#08060D]">{g.creatorName}</p>
                          <p className="truncate text-[10px] text-[#9CA3AF]">{g.creatorHandle}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="font-semibold text-[#08060D]">{g.groupName}</span>
                    </td>
                    <td className="px-4 py-3.5 text-[#08060D]">{formatNumber(g.members)}</td>
                    <td className="px-4 py-3.5 text-[#08060D]">{formatNumber(g.posts)}</td>
                    <td className="px-4 py-3.5">
                      <span
                        className={`font-semibold ${
                          g.reports > 0 ? "text-red-600" : "text-[#9CA3AF]"
                        }`}
                      >
                        {g.reports}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-[#08060D]">{g.created}</td>
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
                          Review
                        </button>
                        {isFlagged && (
                          <button
                            onClick={() => handleRemove(g.id)}
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
          <span>{totalGroups}</span> groups
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
