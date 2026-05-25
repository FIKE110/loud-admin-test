import { useState } from "react"

type StreamStatus = "Live" | "Ended"

type LiveStream = {
  id: number
  streamerInitials: string
  streamerColor: string
  streamerName: string
  streamerHandle: string
  title: string
  viewers: number
  duration: string
  reports: number
  status: StreamStatus
}

const initialStreams: LiveStream[] = [
  { id: 1, streamerInitials: "CO", streamerColor: "bg-pink-500", streamerName: "Chioma Okafor", streamerHandle: "@chioma_o", title: "Book Reading: Things Fall Apart", viewers: 234, duration: "32m", reports: 0, status: "Live" },
  { id: 2, streamerInitials: "KM", streamerColor: "bg-blue-500", streamerName: "Kofi Mensah", streamerHandle: "@kofi_m", title: "Ghanaian Drumming Workshop", viewers: 892, duration: "45m", reports: 0, status: "Live" },
  { id: 3, streamerInitials: "ZA", streamerColor: "bg-green-500", streamerName: "Zainab Abdullah", streamerHandle: "@zainab_a", title: "Cooking Class: Jollof Rice", viewers: 567, duration: "2h 10m", reports: 2, status: "Live" },
  { id: 4, streamerInitials: "AN", streamerColor: "bg-purple-500", streamerName: "Amara Nwosu", streamerHandle: "@amara_n", title: "Friday Night Vibes - Live DJ Set", viewers: 1245, duration: "1h 23m", reports: 0, status: "Live" },
  { id: 5, streamerInitials: "FU", streamerColor: "bg-indigo-500", streamerName: "Fatima Usman", streamerHandle: "@fatima_u", title: "Tech Talk: AI in Africa", viewers: 1890, duration: "56m", reports: 3, status: "Live" },
  { id: 6, streamerInitials: "CO", streamerColor: "bg-rose-500", streamerName: "Chuks Okeke", streamerHandle: "@chuks_o", title: "Gaming: FIFA Tournament Finals", viewers: 3456, duration: "2h 05m", reports: 0, status: "Live" },
  { id: 7, streamerInitials: "TB", streamerColor: "bg-orange-500", streamerName: "Tunde Balogun", streamerHandle: "@tunde_b", title: "Morning Workout Routine", viewers: 0, duration: "3h 45m", reports: 0, status: "Ended" },
  { id: 8, streamerInitials: "SO", streamerColor: "bg-teal-500", streamerName: "Sade Ogunleye", streamerHandle: "@sade_o", title: "Fashion Week Behind the Scenes", viewers: 0, duration: "1h 05m", reports: 0, status: "Ended" },
  { id: 9, streamerInitials: "CO", streamerColor: "bg-red-500", streamerName: "Chidi Okonkwo", streamerHandle: "@chidi_o", title: "Afrobeats Producer Tutorial", viewers: 0, duration: "2h 30m", reports: 1, status: "Ended" },
  { id: 10, streamerInitials: "KA", streamerColor: "bg-amber-500", streamerName: "Kwame Asare", streamerHandle: "@kwame_a", title: "Accra Street Food Tour", viewers: 0, duration: "4h 15m", reports: 0, status: "Ended" },
  { id: 11, streamerInitials: "NE", streamerColor: "bg-cyan-500", streamerName: "Nneka Eze", streamerHandle: "@nneka_e", title: "Yoga for Beginners", viewers: 0, duration: "1h 45m", reports: 0, status: "Ended" },
  { id: 12, streamerInitials: "YA", streamerColor: "bg-violet-500", streamerName: "Yaa Asantewaa", streamerHandle: "@yaa_a", title: "Painting Live: African Sunset", viewers: 0, duration: "3h 00m", reports: 0, status: "Ended" },
]

export default function LiveStreamsPage() {
  const [streams, setStreams] = useState(initialStreams)
  const [search, setSearch] = useState("")
  const [scope, setScope] = useState<"All" | "Live" | "Ended">("All")
  const [page, setPage] = useState(1)

  const perPage = 10

  const liveStreams = streams.filter((s) => s.status === "Live")

  const filtered = streams.filter((s) => {
    if (scope === "Live" && s.status !== "Live") return false
    if (scope === "Ended" && s.status !== "Ended") return false
    if (search) {
      const q = search.toLowerCase()
      const matches =
        s.streamerName.toLowerCase().includes(q) ||
        s.streamerHandle.toLowerCase().includes(q) ||
        s.title.toLowerCase().includes(q)
      if (!matches) return false
    }
    return true
  })

  const totalPages = Math.ceil(filtered.length / perPage)
  const pagedStreams = filtered.slice((page - 1) * perPage, page * perPage)

  function handleEnd(id: number) {
    setStreams((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: "Ended" as const } : s)),
    )
  }

  function handleScopeChange(val: string) {
    setScope(val as typeof scope)
    setPage(1)
  }

  function formatNumber(n: number): string {
    if (n >= 1000) return (n / 1000).toFixed(n >= 10000 ? 0 : 1) + "k"
    return String(n)
  }

  const totalViewers = liveStreams.reduce((sum, s) => sum + s.viewers, 0)

  return (
    <>
      {/* ── Header Row ── */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-[#08060D]">Live Streams</h1>
          <p className="mt-1 text-[13px] text-[#6B6375]">
            Monitor and manage real-time streaming content across the platform.
          </p>
        </div>
      </div>

      {/* ── Live Performance Summary Cards ── */}
      <div className="mb-6 grid grid-cols-3 gap-4">
        <div className="rounded-2xl border border-[#E5E4E7] bg-white p-5 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-[13px] font-medium text-[#6B6375]">Currently Live</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2 py-0.5 text-[11px] font-semibold text-red-700">
              <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
              {liveStreams.length} Live now
            </span>
          </div>
          <p className="text-xl font-bold text-[#08060D]">{liveStreams.length}</p>
        </div>
        <div className="rounded-2xl border border-[#E5E4E7] bg-white p-5 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-[13px] font-medium text-[#6B6375]">Total Viewers</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-[11px] font-semibold text-green-700">
              Active viewers
            </span>
          </div>
          <p className="text-xl font-bold text-[#08060D]">{formatNumber(totalViewers)}</p>
        </div>
        <div className="rounded-2xl border border-[#E5E4E7] bg-white p-5 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-[13px] font-medium text-[#6B6375]">Streams Today</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-[11px] font-semibold text-green-700">
              +6 vs yesterday
            </span>
          </div>
          <p className="text-xl font-bold text-[#08060D]">{streams.length}</p>
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
            placeholder="Search streams..."
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
          <option value="All">All Streams</option>
          <option value="Live">Live</option>
          <option value="Ended">Ended</option>
        </select>
      </div>

      {/* ── Live Broadcast Streaming Matrix ── */}
      <div className="overflow-x-auto overflow-hidden rounded-xl border border-[#E5E4E7] bg-white">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-[#E5E4E7] bg-[#F8F9FC]">
            <tr>
              <th className="px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B6375]">Streamer</th>
              <th className="px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B6375]">Title</th>
              <th className="px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B6375]">Viewers</th>
              <th className="px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B6375]">Duration</th>
              <th className="px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B6375]">Reports</th>
              <th className="px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B6375]">Status</th>
              <th className="px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B6375]">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E4E7]">
            {pagedStreams.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-12 text-center text-xs text-[#6B6375]">
                  No streams found.
                </td>
              </tr>
            ) : (
              pagedStreams.map((s) => {
                const isLive = s.status === "Live"
                return (
                  <tr key={s.id} className="transition-colors hover:bg-[#F8F9FC]">
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white ${s.streamerColor}`}>
                          {s.streamerInitials}
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-xs font-medium text-[#08060D]">{s.streamerName}</p>
                          <p className="truncate text-[10px] text-[#9CA3AF]">{s.streamerHandle}</p>
                        </div>
                      </div>
                    </td>
                    <td className="max-w-56 px-4 py-3.5">
                      <span className="truncate text-[#08060D]">{s.title}</span>
                    </td>
                    <td className="px-4 py-3.5 text-[#08060D]">{formatNumber(s.viewers)}</td>
                    <td className="px-4 py-3.5 text-[#08060D]">{s.duration}</td>
                    <td className="px-4 py-3.5">
                      <span
                        className={`font-semibold ${
                          s.reports > 0 ? "text-red-600" : "text-[#9CA3AF]"
                        }`}
                      >
                        {s.reports}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                          isLive
                            ? "bg-red-100 text-red-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {isLive && (
                          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
                        )}
                        {isLive ? "Live" : "Ended"}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        {isLive ? (
                          <>
                            <button className="rounded-lg border border-[#E5E4E7] px-3 py-1.5 text-xs font-medium text-[#2561EE] transition-colors hover:bg-blue-50">
                              View
                            </button>
                            <button
                              onClick={() => handleEnd(s.id)}
                              className="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-red-700"
                            >
                              End
                            </button>
                          </>
                        ) : (
                          <span className="text-xs text-[#9CA3AF]">—</span>
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
          <span>{filtered.length.toLocaleString()}</span> streams
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
