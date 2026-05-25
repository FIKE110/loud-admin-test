import { useState } from "react"

type PostType = "Image" | "Video" | "Text" | "Audio"
type PostStatus = "Active" | "Flagged"

type Post = {
  id: number
  authorInitials: string
  authorColor: string
  authorName: string
  caption: string
  type: PostType
  likes: number
  comments: number
  reports: number
  date: string
  status: PostStatus
}

const posts: Post[] = [
  { id: 1, authorInitials: "JD", authorColor: "bg-blue-500", authorName: "John Doe", caption: "Beautiful sunset at the beach today! 🌅", type: "Image", likes: 1245, comments: 89, reports: 0, date: "May 25, 2026", status: "Active" },
  { id: 2, authorInitials: "SM", authorColor: "bg-purple-500", authorName: "Sarah Miller", caption: "Click here to win a free iPhone! 🎉", type: "Text", likes: 23, comments: 5, reports: 12, date: "May 24, 2026", status: "Flagged" },
  { id: 3, authorInitials: "CS", authorColor: "bg-red-500", authorName: "Carlos Silva", caption: "Just finished my first marathon! 🏃‍♂️", type: "Image", likes: 892, comments: 134, reports: 0, date: "May 23, 2026", status: "Active" },
  { id: 4, authorInitials: "AW", authorColor: "bg-green-500", authorName: "Aisha Williams", caption: "My new track 'Midnight Dreams' is out now! Listen on Loud! 🎵", type: "Audio", likes: 3456, comments: 567, reports: 0, date: "May 22, 2026", status: "Active" },
  { id: 5, authorInitials: "KT", authorColor: "bg-orange-500", authorName: "Kenji Tanaka", caption: "This content violates our community guidelines", type: "Text", likes: 5, comments: 12, reports: 8, date: "May 21, 2026", status: "Flagged" },
  { id: 6, authorInitials: "EC", authorColor: "bg-teal-500", authorName: "Emily Chen", caption: "Morning yoga routine - follow along! 🧘‍♀️", type: "Video", likes: 2341, comments: 345, reports: 0, date: "May 20, 2026", status: "Active" },
  { id: 7, authorInitials: "OA", authorColor: "bg-pink-500", authorName: "Oluwaseun Adebayo", caption: "Lagos nightlife - best spots in the city", type: "Video", likes: 5678, comments: 891, reports: 3, date: "May 19, 2026", status: "Flagged" },
  { id: 8, authorInitials: "PM", authorColor: "bg-indigo-500", authorName: "Pierre Martin", caption: "Get rich quick - investment opportunity!", type: "Text", likes: 12, comments: 8, reports: 15, date: "May 18, 2026", status: "Flagged" },
  { id: 9, authorInitials: "LR", authorColor: "bg-cyan-500", authorName: "Lucas Rodriguez", caption: "Samba dancing at Rio Carnival! 🇧🇷", type: "Video", likes: 4567, comments: 678, reports: 0, date: "May 17, 2026", status: "Active" },
  { id: 10, authorInitials: "AK", authorColor: "bg-amber-500", authorName: "Aisha Kamara", caption: "Kano market vibes - traditional crafts and textiles", type: "Image", likes: 789, comments: 123, reports: 0, date: "May 16, 2026", status: "Active" },
  { id: 11, authorInitials: "RJ", authorColor: "bg-rose-500", authorName: "Raj Patel", caption: "New podcast episode: The future of AI in Africa 🎙️", type: "Audio", likes: 2345, comments: 456, reports: 0, date: "May 15, 2026", status: "Active" },
  { id: 12, authorInitials: "MG", authorColor: "bg-violet-500", authorName: "Maria Garcia", caption: "This video contains explicit material", type: "Video", likes: 8, comments: 3, reports: 22, date: "May 14, 2026", status: "Flagged" },
]

const reportReasons: Record<number, string[]> = {
  2: ["Spam - misleading links", "Unsolicited advertising"],
  5: ["Hate speech - discriminatory language", "Harassment / Bullying"],
  7: ["Inappropriate location tagging", "Misleading content"],
  8: ["Fraud - scam investment scheme", "Impersonation"],
  12: ["Explicit content - not marked as sensitive", "Graphic violence"],
}

export default function PostsPage() {
  const [search, setSearch] = useState("")
  const [scope, setScope] = useState<"All" | "Flagged" | "Under Review" | "Deleted">("All")
  const [type, setType] = useState<"All" | "Images" | "Videos" | "Text" | "Audios">("All")
  const [deletedIds, setDeletedIds] = useState<Set<number>>(new Set())
  const [reviewPost, setReviewPost] = useState<Post | null>(null)
  const [page, setPage] = useState(1)

  const perPage = 10

  const filtered = posts.filter((post) => {
    if (scope === "Deleted") return deletedIds.has(post.id)
    if (deletedIds.has(post.id)) return false
    if (scope === "Flagged" && post.status !== "Flagged") return false

    if (search) {
      const q = search.toLowerCase()
      const matches =
        post.caption.toLowerCase().includes(q) ||
        post.authorName.toLowerCase().includes(q) ||
        String(post.id).includes(q)
      if (!matches) return false
    }

    if (type !== "All") {
      const typeMap: Record<string, PostType> = { Images: "Image", Videos: "Video", Text: "Text", Audios: "Audio" }
      if (post.type !== typeMap[type]) return false
    }

    return true
  })

  const totalPages = Math.ceil(filtered.length / perPage)
  const pagedPosts = filtered.slice((page - 1) * perPage, page * perPage)

  function handleDelete(id: number) {
    const next = new Set(deletedIds)
    next.add(id)
    setDeletedIds(next)
    setReviewPost(null)
  }

  function handleRestore(id: number) {
    const next = new Set(deletedIds)
    next.delete(id)
    setDeletedIds(next)
  }

  function handleScopeChange(val: string) {
    setScope(val as typeof scope)
    setPage(1)
  }

  function handleTypeChange(val: string) {
    setType(val as typeof type)
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
          <h1 className="text-2xl font-bold text-[#08060D]">Posts</h1>
          <p className="mt-1 text-sm text-[#6B6375]">
            Moderate all user-generated content across the platform.
          </p>
        </div>
      </div>

      {/* ── Filter Toolbar ── */}
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <div className="relative w-64">
          <svg
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]"
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search posts..."
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
          <option value="All">All Posts</option>
          <option value="Flagged">Flagged</option>
          <option value="Under Review">Under Review</option>
          <option value="Deleted">Deleted</option>
        </select>

        <select
          value={type}
          onChange={(e) => handleTypeChange(e.target.value)}
          className="cursor-pointer rounded-xl border border-[#E5E4E7] bg-white px-4 py-2.5 text-sm text-[#08060D] outline-none focus:border-[#2561EE]"
        >
          <option value="All">All Types</option>
          <option value="Images">Images</option>
          <option value="Videos">Videos</option>
          <option value="Text">Text</option>
          <option value="Audios">Audios</option>
        </select>

        <button className="ml-auto flex items-center gap-2 rounded-xl border border-[#E5E4E7] bg-white px-4 py-2.5 text-sm font-medium text-[#08060D] transition-colors hover:bg-[#F8F9FC]">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 11l5 5 5-5M12 4v12" />
          </svg>
          Export
        </button>
      </div>

      {/* ── Data Table ── */}
      <div className="overflow-hidden rounded-xl border border-[#E5E4E7] bg-white">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-[#E5E4E7] bg-[#F8F9FC]">
            <tr>
              <th className="px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B6375]">Post / User</th>
              <th className="px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B6375]">Type</th>
              <th className="px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B6375]">Likes</th>
              <th className="px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B6375]">Comments</th>
              <th className="px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B6375]">Reports</th>
              <th className="px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B6375]">Date</th>
              <th className="px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B6375]">Status</th>
              <th className="px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B6375]">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E4E7]">
            {pagedPosts.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-12 text-center text-sm text-[#6B6375]">
                  No posts found.
                </td>
              </tr>
            ) : (
              pagedPosts.map((post) => {
                const isFlagged = post.status === "Flagged"
                const isDeleted = scope === "Deleted"
                return (
                  <tr key={post.id} className="transition-colors hover:bg-[#F8F9FC]">
                    <td className="w-56 max-w-56 px-3 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white ${post.authorColor}`}>
                          {post.authorInitials}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-xs font-medium text-[#08060D]">{post.authorName}</p>
                          <p className="truncate text-[10px] italic text-[#9CA3AF]">
                            {isFlagged
                              ? `[Reported: ${(reportReasons[post.id]?.[0] ?? "policy violation").toLowerCase()}]`
                              : post.caption.length > 40
                                ? post.caption.slice(0, 40) + "..."
                                : post.caption}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <span
                        className={`inline-block whitespace-nowrap rounded-full px-2.5 py-0.5 text-[11px] font-semibold text-white ${
                          post.type === "Image" ? "bg-[#2561EE]" :
                          post.type === "Video" ? "bg-[#6366F1]" :
                          post.type === "Text" ? "bg-[#64748B]" :
                          "bg-[#A855F7]"
                        }`}
                      >
                        {post.type}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-[#08060D]">{formatNumber(post.likes)}</td>
                    <td className="px-4 py-3.5 text-[#08060D]">{formatNumber(post.comments)}</td>
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
                          post.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {isDeleted ? "Deleted" : post.status}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center justify-start gap-2">
                        {isDeleted ? (
                          <button
                            onClick={() => handleRestore(post.id)}
                            className="rounded-lg px-3 py-1.5 text-xs font-medium text-green-600 transition-colors hover:bg-green-50"
                          >
                            Restore
                          </button>
                        ) : (
                          <>
                            <button
                              onClick={() => setReviewPost(post)}
                              className="rounded-lg px-3 py-1.5 text-xs font-medium text-[#2561EE] transition-colors hover:bg-blue-50"
                            >
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
                          </>
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
      <div className="mt-5 flex items-center justify-between">
        <p className="text-sm text-[#6B6375]">
          Showing {filtered.length === 0 ? 0 : (page - 1) * perPage + 1}
          –{Math.min(page * perPage, filtered.length)} of{" "}
          <span>{filtered.length.toLocaleString()}</span> posts
        </p>
        {totalPages > 1 && (
          <div className="flex items-center gap-1">
            <button
              disabled={page <= 1}
              onClick={() => setPage(page - 1)}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-sm text-[#6B6375] transition-colors hover:bg-[#E5E4E7] disabled:opacity-30"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <span
                key={p}
                onClick={() => setPage(p)}
                className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-sm transition-colors ${
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
              className="flex h-8 w-8 items-center justify-center rounded-lg text-sm text-[#6B6375] transition-colors hover:bg-[#E5E4E7] disabled:opacity-30"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* ── Review Modal ── */}
      {reviewPost && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          onClick={() => setReviewPost(null)}
        >
          <div
            className="mx-4 w-full max-w-2xl rounded-2xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[#E5E4E7] px-6 py-4">
              <h2 className="text-lg font-bold text-[#08060D]">Review Post</h2>
              <button
                onClick={() => setReviewPost(null)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-[#6B6375] transition-colors hover:bg-[#F8F9FC]"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="space-y-5 px-6 py-5">
              {/* Author & Post Info */}
              <div className="flex items-start gap-4">
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ${reviewPost.authorColor}`}>
                  {reviewPost.authorInitials}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-[#08060D]">{reviewPost.authorName}</p>
                  <p className="mt-1 text-sm leading-relaxed text-[#08060D]">{reviewPost.caption}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <span
                      className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold text-white ${
                        reviewPost.type === "Image" ? "bg-[#2561EE]" :
                        reviewPost.type === "Video" ? "bg-[#6366F1]" :
                        reviewPost.type === "Text" ? "bg-[#64748B]" :
                        "bg-[#A855F7]"
                      }`}
                    >
                      {reviewPost.type}
                    </span>
                    {reviewPost.status === "Flagged" && (
                      <span className="inline-block rounded-full bg-red-100 px-2.5 py-0.5 text-[11px] font-semibold text-red-700">
                        Flagged
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Mock Attachment */}
              <div className="flex h-48 items-center justify-center rounded-xl bg-[#F8F9FC]">
                <div className="text-center">
                  <svg className="mx-auto mb-2 h-10 w-10 text-[#D1D5DB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-sm text-[#9CA3AF]">
                    {reviewPost.type === "Image" ? "Image preview" :
                     reviewPost.type === "Video" ? "Video player" :
                     reviewPost.type === "Audio" ? "Audio waveform" :
                     "Text content"}
                  </p>
                </div>
              </div>

              {/* Engagement Metrics */}
              <div className="flex gap-6">
                <div>
                  <p className="text-xs text-[#6B6375]">Likes</p>
                  <p className="font-semibold text-[#08060D]">{reviewPost.likes.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-[#6B6375]">Comments</p>
                  <p className="font-semibold text-[#08060D]">{reviewPost.comments.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-[#6B6375]">Reports</p>
                  <p className={`font-semibold ${reviewPost.reports > 0 ? "text-red-600" : "text-[#9CA3AF]"}`}>
                    {reviewPost.reports}
                  </p>
                </div>
              </div>

              {/* Report Reasons (flagged posts only) */}
              {reviewPost.reports > 0 && (
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.08em] text-[#6B6375]">
                    Report Reasons
                  </p>
                  <ul className="space-y-1.5">
                    {(reportReasons[reviewPost.id] ?? ["Policy violation"]).map((reason, i) => (
                      <li key={i} className="flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
                        <svg className="h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {reason}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 border-t border-[#E5E4E7] px-6 py-4">
              <button
                onClick={() => setReviewPost(null)}
                className="rounded-xl border border-[#E5E4E7] bg-white px-5 py-2.5 text-sm font-medium text-[#08060D] transition-colors hover:bg-[#F8F9FC]"
              >
                Dismiss
              </button>
              {reviewPost.status === "Flagged" && (
                <button
                  onClick={() => handleDelete(reviewPost.id)}
                  className="rounded-xl border border-red-300 bg-white px-5 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
                >
                  Delete Post
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
