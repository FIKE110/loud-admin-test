import { useState } from "react"

type AdminRole = "Super Admin" | "Moderator" | "User Manager"

type Admin = {
  id: number
  initials: string
  color: string
  name: string
  email: string
  role: AdminRole
  permissions: string
  lastActive: string
  twoFA: boolean
  status: "Active"
}

const admins: Admin[] = [
  { id: 1, initials: "IM", color: "bg-blue-500", name: "Ikechukwu Madu", email: "ikechukwu@loud.app", role: "Super Admin", permissions: "Full Access", lastActive: "Online now", twoFA: true, status: "Active" },
  { id: 2, initials: "SC", color: "bg-purple-500", name: "Sarah Chen", email: "sarah@loud.app", role: "Moderator", permissions: "Content, Users", lastActive: "2 hours ago", twoFA: true, status: "Active" },
  { id: 3, initials: "EO", color: "bg-green-500", name: "Emeka Obi", email: "emeka@loud.app", role: "User Manager", permissions: "Users only", lastActive: "15 minutes ago", twoFA: false, status: "Active" },
  { id: 4, initials: "AB", color: "bg-pink-500", name: "Aisha Bello", email: "aisha@loud.app", role: "Moderator", permissions: "Content", lastActive: "1 day ago", twoFA: true, status: "Active" },
  { id: 5, initials: "KA", color: "bg-amber-500", name: "Kwame Asare", email: "kwame@loud.app", role: "Super Admin", permissions: "Full Access", lastActive: "Online now", twoFA: true, status: "Active" },
  { id: 6, initials: "FU", color: "bg-indigo-500", name: "Fatima Usman", email: "fatima@loud.app", role: "User Manager", permissions: "Users only", lastActive: "3 hours ago", twoFA: false, status: "Active" },
  { id: 7, initials: "TB", color: "bg-orange-500", name: "Tunde Balogun", email: "tunde@loud.app", role: "Moderator", permissions: "Content, Users", lastActive: "6 hours ago", twoFA: true, status: "Active" },
  { id: 8, initials: "NE", color: "bg-teal-500", name: "Nneka Eze", email: "nneka@loud.app", role: "Moderator", permissions: "Content", lastActive: "1 day ago", twoFA: true, status: "Active" },
  { id: 9, initials: "CO", color: "bg-red-500", name: "Chidi Okonkwo", email: "chidi@loud.app", role: "User Manager", permissions: "Users only", lastActive: "2 days ago", twoFA: false, status: "Active" },
  { id: 10, initials: "ZA", color: "bg-cyan-500", name: "Zainab Abdullah", email: "zainab@loud.app", role: "Super Admin", permissions: "Full Access", lastActive: "Online now", twoFA: true, status: "Active" },
  { id: 11, initials: "SO", color: "bg-rose-500", name: "Sade Ogunleye", email: "sade@loud.app", role: "Moderator", permissions: "Content, Users", lastActive: "5 hours ago", twoFA: true, status: "Active" },
  { id: 12, initials: "KM", color: "bg-violet-500", name: "Kofi Mensah", email: "kofi@loud.app", role: "User Manager", permissions: "Users only", lastActive: "8 hours ago", twoFA: true, status: "Active" },
]

const totalAdmins = 24

const roleColors: Record<AdminRole, string> = {
  "Super Admin": "bg-blue-100 text-blue-700",
  Moderator: "bg-sky-100 text-sky-600",
  "User Manager": "bg-indigo-100 text-indigo-700",
}

export default function AdminTeamPage() {
  const [search, setSearch] = useState("")
  const [revokedIds, setRevokedIds] = useState<Set<number>>(new Set())
  const [inviteOpen, setInviteOpen] = useState(false)
  const [page, setPage] = useState(1)

  const perPage = 10

  const filtered = admins.filter((a) => {
    if (revokedIds.has(a.id)) return false
    if (search) {
      const q = search.toLowerCase()
      const matches =
        a.name.toLowerCase().includes(q) ||
        a.email.toLowerCase().includes(q) ||
        a.role.toLowerCase().includes(q)
      if (!matches) return false
    }
    return true
  })

  const totalPages = Math.ceil(filtered.length / perPage)
  const pagedAdmins = filtered.slice((page - 1) * perPage, page * perPage)

  function handleRevoke(id: number) {
    const next = new Set(revokedIds)
    next.add(id)
    setRevokedIds(next)
  }

  return (
    <>
      {/* ── Header Row ── */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#08060D]">Admin Team</h1>
          <p className="mt-1 text-sm text-[#6B6375]">
            Manage admin accounts and role permissions.
          </p>
        </div>
        <button
          onClick={() => setInviteOpen(true)}
          className="flex items-center gap-2 rounded-xl bg-[#2561EE] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#1A4FCC]"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Invite Admin
        </button>
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
            placeholder="Search admins..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1) }}
            className="w-full rounded-xl border border-[#E5E4E7] bg-white py-2.5 pl-10 pr-4 text-sm text-[#08060D] placeholder-[#9CA3AF] outline-none transition-colors focus:border-[#2561EE] focus:ring-1 focus:ring-[#2561EE]"
          />
        </div>
      </div>

      {/* ── Data Table ── */}
      <div className="overflow-hidden rounded-xl border border-[#E5E4E7] bg-white">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-[#E5E4E7] bg-[#F8F9FC]">
            <tr>
              <th className="px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B6375]">Admin</th>
              <th className="px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B6375]">Role</th>
              <th className="px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B6375]">Permissions</th>
              <th className="px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B6375]">Last Active</th>
              <th className="px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B6375]">2FA</th>
              <th className="px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B6375]">Status</th>
              <th className="px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B6375]">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E4E7]">
            {pagedAdmins.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-12 text-center text-sm text-[#6B6375]">
                  No admins found.
                </td>
              </tr>
            ) : (
              pagedAdmins.map((admin) => (
                <tr key={admin.id} className="transition-colors hover:bg-[#F8F9FC]">
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white ${admin.color}`}>
                        {admin.initials}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-xs font-medium text-[#08060D]">{admin.name}</p>
                        <p className="truncate text-[10px] text-[#9CA3AF]">{admin.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`inline-block whitespace-nowrap rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${roleColors[admin.role]}`}>
                      {admin.role}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-[#08060D]">{admin.permissions}</td>
                  <td className="px-4 py-3.5">
                    <span className={admin.lastActive === "Online now" ? "font-medium text-green-600" : "text-[#08060D]"}>
                      {admin.lastActive}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`inline-flex items-center gap-1 text-xs font-semibold ${admin.twoFA ? "text-green-600" : "text-red-600"}`}>
                      {admin.twoFA ? (
                        <>
                          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                          Enabled
                        </>
                      ) : (
                        <>
                          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          Disabled
                        </>
                      )}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="inline-block whitespace-nowrap rounded-full bg-green-100 px-2.5 py-0.5 text-[11px] font-semibold text-green-700">
                      Active
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      <button className="rounded-lg border border-[#E5E4E7] px-3 py-1.5 text-xs font-medium text-[#6B6375] transition-colors hover:bg-[#F8F9FC]">
                        Edit
                      </button>
                      <button
                        onClick={() => handleRevoke(admin.id)}
                        className="rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-100"
                      >
                        Revoke
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
      <div className="mt-5 flex items-center justify-between">
        <p className="text-sm text-[#6B6375]">
          Showing {filtered.length === 0 ? 0 : (page - 1) * perPage + 1}
          –{Math.min(page * perPage, filtered.length)} of{" "}
          <span>{totalAdmins}</span> admins
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

      {/* ── Invite Admin Modal ── */}
      {inviteOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          onClick={() => setInviteOpen(false)}
        >
          <div
            className="mx-4 w-full max-w-md rounded-2xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#E5E4E7] px-6 py-4">
              <h2 className="text-lg font-bold text-[#08060D]">Invite Admin</h2>
              <button
                onClick={() => setInviteOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-[#6B6375] transition-colors hover:bg-[#F8F9FC]"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-4 px-6 py-5">
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.08em] text-[#6B6375]">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="admin@loud.app"
                  className="w-full rounded-xl border border-[#E5E4E7] bg-white px-4 py-2.5 text-sm text-[#08060D] placeholder-[#9CA3AF] outline-none transition-colors focus:border-[#2561EE] focus:ring-1 focus:ring-[#2561EE]"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.08em] text-[#6B6375]">
                  Role
                </label>
                <select className="w-full cursor-pointer rounded-xl border border-[#E5E4E7] bg-white px-4 py-2.5 text-sm text-[#08060D] outline-none focus:border-[#2561EE]">
                  <option>Moderator</option>
                  <option>User Manager</option>
                  <option>Super Admin</option>
                </select>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 border-t border-[#E5E4E7] px-6 py-4">
              <button
                onClick={() => setInviteOpen(false)}
                className="rounded-xl border border-[#E5E4E7] bg-white px-5 py-2.5 text-sm font-medium text-[#08060D] transition-colors hover:bg-[#F8F9FC]"
              >
                Cancel
              </button>
              <button className="rounded-xl bg-[#2561EE] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#1A4FCC]">
                Send Invite
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
