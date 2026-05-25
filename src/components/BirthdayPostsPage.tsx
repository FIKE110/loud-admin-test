import { useState } from "react"

type BirthdayPostStatus = "Active" | "Flagged"

type BirthdayPost = {
  id: number
  senderInitials: string
  senderColor: string
  senderName: string
  senderHandle: string
  message: string
  recipient: string
  reports: number
  date: string
  status: BirthdayPostStatus
}

const birthdayPosts: BirthdayPost[] = [
  { id: 1, senderInitials: "CO", senderColor: "bg-pink-500", senderName: "Chioma Okafor", senderHandle: "@chioma_o", message: "Happy birthday Amara! Wishing you the best day ever 🎉🎂", recipient: "Amara Nwosu", reports: 0, date: "May 25", status: "Active" },
  { id: 2, senderInitials: "EO", senderColor: "bg-blue-500", senderName: "Emeka Obi", senderHandle: "@emeka_obi", message: "Happy birthday Ngozi! May your day be filled with joy and laughter", recipient: "Ngozi Eze", reports: 0, date: "May 24", status: "Active" },
  { id: 3, senderInitials: "FU", senderColor: "bg-green-500", senderName: "Fatima Usman", senderHandle: "@fatima_u", message: "[Flagged content]", recipient: "Aisha Bello", reports: 3, date: "May 24", status: "Flagged" },
  { id: 4, senderInitials: "TB", senderColor: "bg-orange-500", senderName: "Tunde Balogun", senderHandle: "@tunde_b", message: "Happy birthday bro! Let's celebrate tonight 🎉", recipient: "Unknown", reports: 0, date: "May 23", status: "Active" },
  { id: 5, senderInitials: "ZA", senderColor: "bg-purple-500", senderName: "Zainab Abdullah", senderHandle: "@zainab_a", message: "Happy birthday Maryam! Love you lots 💕", recipient: "Maryam Yusuf", reports: 0, date: "May 23", status: "Active" },
  { id: 6, senderInitials: "KM", senderColor: "bg-red-500", senderName: "Kofi Mensah", senderHandle: "@kofi_m", message: "[Flagged content]", recipient: "Akua Asante", reports: 7, date: "May 22", status: "Flagged" },
  { id: 7, senderInitials: "NE", senderColor: "bg-teal-500", senderName: "Nneka Eze", senderHandle: "@nneka_e", message: "Happy birthday Chidi! So glad you were born 🎂", recipient: "Chidi Okonkwo", reports: 0, date: "May 22", status: "Active" },
  { id: 8, senderInitials: "SO", senderColor: "bg-amber-500", senderName: "Sade Ogunleye", senderHandle: "@sade_o", message: "Happy birthday to the best friend ever!", recipient: "Unknown", reports: 0, date: "May 21", status: "Active" },
  { id: 9, senderInitials: "KA", senderColor: "bg-indigo-500", senderName: "Kwame Asare", senderHandle: "@kwame_a", message: "Happy birthday Esi! Wishing you many more 🎈", recipient: "Esi Manu", reports: 0, date: "May 21", status: "Active" },
  { id: 10, senderInitials: "AM", senderColor: "bg-rose-500", senderName: "Amina Mohammed", senderHandle: "@amina_m", message: "[Flagged content]", recipient: "Halima Bello", reports: 12, date: "May 20", status: "Flagged" },
  { id: 11, senderInitials: "CO", senderColor: "bg-cyan-500", senderName: "Chuks Okeke", senderHandle: "@chuks_o", message: "Happy birthday Adaobi! You rock 🎸", recipient: "Adaobi Nwafor", reports: 0, date: "May 20", status: "Active" },
  { id: 12, senderInitials: "YA", senderColor: "bg-violet-500", senderName: "Yaa Asantewaa", senderHandle: "@yaa_a", message: "Happy birthday to my dearest! Miss you 💫", recipient: "Unknown", reports: 0, date: "May 19", status: "Active" },
]

const totalBirthdayPosts = 8241

export default function BirthdayPostsPage() {
  const [search, setSearch] = useState("")
  const [scope, setScope] = useState<"All" | "Flagged">("All")
  const [deletedIds, setDeletedIds] = useState<Set<number>>(new Set())
  const [page, setPage] = useState(1)

  const perPage = 10

  const filtered = birthdayPosts.filter((post) => {
    if (deletedIds.has(post.id)) return false
    if (scope === "Flagged" && post.status !== "Flagged") return false
    if (search) {
      const q = search.toLowerCase()
      const matches =
        post.senderName.toLowerCase().includes(q) ||
        post.senderHandle.toLowerCase().includes(q) ||
        post.message.toLowerCase().includes(q) ||
        post.recipient.toLowerCase().includes(q)
      if (!matches) return false
    }
    return true
  })

  const totalPages = Math.ceil(filtered.length / perPage)
  const pagedPosts = filtered.slice((page - 1) * perPage, page * perPage)

  function handleDelete(id: number) {
    const next = new Set(deletedIds)
    next.add(id)
    setDeletedIds(next)
  }

  function handleScopeChange(val: string) {
    setScope(val as typeof scope)
    setPage(1)
  }

  return (
    <>
      {/* ── Header Row ── */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-[#08060D]">Birthday Posts</h1>
          <p className="mt-1 text-[13px] text-[#6B6375]">
            Review and moderate birthday-related posts.
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
            placeholder="Search birthday posts..."
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
              <th className="px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B6375]">User</th>
              <th className="px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B6375]">Message</th>
              <th className="px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B6375]">Recipients</th>
              <th className="px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B6375]">Reports</th>
              <th className="px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B6375]">Date</th>
              <th className="px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B6375]">Status</th>
              <th className="px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B6375]">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E4E7]">
            {pagedPosts.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-12 text-center text-xs text-[#6B6375]">
                  No birthday posts found.
                </td>
              </tr>
            ) : (
              pagedPosts.map((post) => {
                const isFlagged = post.status === "Flagged"
                return (
                  <tr key={post.id} className="transition-colors hover:bg-[#F8F9FC]">
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white ${post.senderColor}`}>
                          {post.senderInitials}
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-xs font-medium text-[#08060D]">{post.senderName}</p>
                          <p className="truncate text-[10px] text-[#9CA3AF]">{post.senderHandle}</p>
                        </div>
                      </div>
                    </td>
                    <td className="max-w-48 px-4 py-3.5">
                      <p
                        className={`truncate ${post.message === "[Flagged content]" ? "italic text-[#9CA3AF]" : "text-[#08060D]"}`}
                      >
                        {post.message}
                      </p>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={post.recipient === "Unknown" ? "text-[#9CA3AF]" : "text-[#08060D]"}>
                        {post.recipient}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span
                        className={`font-semibold ${
                          post.reports > 0 ? "text-red-600" : "text-[#9CA3AF]"
                        }`}
                      >
                        {post.reports}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-[#08060D]">{post.date}</td>
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
                            onClick={() => handleDelete(post.id)}
                            className="rounded-lg border border-red-300 bg-white px-3 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-50"
                          >
                            Delete
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
          <span>{totalBirthdayPosts.toLocaleString()}</span> birthday posts
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
