import { useState } from "react"

type UserStatus = "Active" | "Blocked" | "Pending"

type User = {
  id: number
  initials: string
  avatarColor: string
  name: string
  email: string
  country: string
  city: string
  joined: string
  posts: number
  followers: number
  status: UserStatus
}

const users: User[] = [
  { id: 1, initials: "JD", avatarColor: "bg-blue-500", name: "John Doe", email: "john.doe@example.com", country: "Nigeria", city: "Lagos", joined: "Jan 15, 2024", posts: 142, followers: 12450, status: "Active" },
  { id: 2, initials: "SM", avatarColor: "bg-purple-500", name: "Sarah Miller", email: "sarah.m@example.com", country: "United States", city: "New York", joined: "Mar 22, 2024", posts: 89, followers: 8732, status: "Active" },
  { id: 3, initials: "CS", avatarColor: "bg-red-500", name: "Carlos Silva", email: "carlos.s@example.com", country: "Brazil", city: "São Paulo", joined: "Feb 08, 2024", posts: 256, followers: 32100, status: "Blocked" },
  { id: 4, initials: "AW", avatarColor: "bg-green-500", name: "Aisha Williams", email: "aisha.w@example.com", country: "Nigeria", city: "Abuja", joined: "Apr 11, 2024", posts: 67, followers: 5400, status: "Active" },
  { id: 5, initials: "KL", avatarColor: "bg-orange-500", name: "Kenji Tanaka", email: "kenji.t@example.com", country: "Japan", city: "Tokyo", joined: "May 03, 2024", posts: 194, followers: 28900, status: "Pending" },
  { id: 6, initials: "EM", avatarColor: "bg-teal-500", name: "Emily Chen", email: "emily.c@example.com", country: "United States", city: "Los Angeles", joined: "Jun 19, 2024", posts: 45, followers: 3200, status: "Active" },
  { id: 7, initials: "OM", avatarColor: "bg-pink-500", name: "Oluwaseun Adebayo", email: "o.adebayo@example.com", country: "Nigeria", city: "Ibadan", joined: "Jul 07, 2024", posts: 312, followers: 45600, status: "Blocked" },
  { id: 8, initials: "PM", avatarColor: "bg-indigo-500", name: "Pierre Martin", email: "pierre.m@example.com", country: "France", city: "Paris", joined: "Aug 25, 2024", posts: 78, followers: 9800, status: "Active" },
  { id: 9, initials: "LR", avatarColor: "bg-cyan-500", name: "Lucas Rodriguez", email: "lucas.r@example.com", country: "Brazil", city: "Rio de Janeiro", joined: "Sep 14, 2024", posts: 153, followers: 18700, status: "Pending" },
  { id: 10, initials: "AK", avatarColor: "bg-amber-500", name: "Aisha Kamara", email: "aisha.k@example.com", country: "Nigeria", city: "Kano", joined: "Oct 30, 2024", posts: 91, followers: 6100, status: "Active" },
]

const statusBadge: Record<UserStatus, string> = {
  Active: "bg-green-100 text-green-700",
  Blocked: "bg-red-100 text-red-700",
  Pending: "bg-amber-100 text-amber-700",
}

export default function UsersPage() {
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set())
  const [blockedIds, setBlockedIds] = useState<Set<number>>(new Set([3, 7]))

  const allSelected = selectedIds.size === users.length
  const someSelected = selectedIds.size > 0 && !allSelected

  function toggleAll() {
    if (allSelected) {
      setSelectedIds(new Set())
    } else {
      setSelectedIds(new Set(users.map((u) => u.id)))
    }
  }

  function toggleOne(id: number) {
    const next = new Set(selectedIds)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    setSelectedIds(next)
  }

  function toggleBlock(id: number) {
    const next = new Set(blockedIds)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    setBlockedIds(next)
  }

  return (
    <>
      {/* ── Header Row ── */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-[#08060D]">Users</h1>
          <p className="mt-1 text-[13px] text-[#6B6375]">
            Manage all registered users on the platform.
          </p>
        </div>
        <button className="flex items-center gap-2 rounded-xl bg-[#2561EE] px-5 py-2.5 text-xs font-semibold text-white transition-opacity hover:opacity-90">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v14m7-7H5" />
          </svg>
          Invite Admin
        </button>
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
            placeholder="Search users..."
            className="w-full rounded-xl border border-[#E5E4E7] bg-white py-2.5 pl-10 pr-4 text-sm text-[#08060D] placeholder-[#9CA3AF] outline-none transition-colors focus:border-[#2561EE] focus:ring-1 focus:ring-[#2561EE]"
          />
        </div>

        <select className="cursor-pointer rounded-xl border border-[#E5E4E7] bg-white px-4 py-2.5 text-sm text-[#08060D] outline-none focus:border-[#2561EE]">
          <option>All Countries</option>
          <option>Nigeria</option>
          <option>United States</option>
          <option>Brazil</option>
          <option>Japan</option>
          <option>France</option>
        </select>

        <select className="cursor-pointer rounded-xl border border-[#E5E4E7] bg-white px-4 py-2.5 text-sm text-[#08060D] outline-none focus:border-[#2561EE]">
          <option>All Cities</option>
          <option>Lagos</option>
          <option>New York</option>
          <option>São Paulo</option>
          <option>Tokyo</option>
          <option>Paris</option>
        </select>

        <select className="cursor-pointer rounded-xl border border-[#E5E4E7] bg-white px-4 py-2.5 text-sm text-[#08060D] outline-none focus:border-[#2561EE]">
          <option>All Status</option>
          <option>Active</option>
          <option>Blocked</option>
          <option>Pending</option>
        </select>

        <select className="cursor-pointer rounded-xl border border-[#E5E4E7] bg-white px-4 py-2.5 text-sm text-[#08060D] outline-none focus:border-[#2561EE]">
          <option>Join Date</option>
          <option>Last 7 days</option>
          <option>Last 30 days</option>
          <option>Last 90 days</option>
          <option>This year</option>
        </select>

        <button className="ml-auto flex items-center gap-2 rounded-xl border border-[#E5E4E7] bg-white px-4 py-2.5 text-xs font-medium text-[#08060D] transition-colors hover:bg-[#F8F9FC]">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 11l5 5 5-5M12 4v12" />
          </svg>
          Export
        </button>
      </div>

      {/* ── Data Table ── */}
      <div className="overflow-x-auto overflow-hidden rounded-xl border border-[#E5E4E7] bg-white">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-[#E5E4E7] bg-[#F8F9FC]">
            <tr>
              <th className="w-10 px-4 py-3.5">
                <input
                  type="checkbox"
                  checked={allSelected}
                  ref={(el) => { if (el) el.indeterminate = someSelected }}
                  onChange={toggleAll}
                  className="h-4 w-4 cursor-pointer rounded border-[#D1D5DB] text-[#2561EE] accent-[#2561EE]"
                />
              </th>
              <th className="px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B6375]">User</th>
              <th className="px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B6375]">Country / City</th>
              <th className="px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B6375]">Joined</th>
              <th className="px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B6375]">Posts</th>
              <th className="px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B6375]">Followers</th>
              <th className="px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B6375]">Status</th>
              <th className="px-4 py-3.5 text-center text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B6375]">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E4E7]">
            {users.map((user) => {
              const isBlocked = blockedIds.has(user.id)
              return (
                <tr key={user.id} className="transition-colors hover:bg-[#F8F9FC]">
                  <td className="px-4 py-3.5">
                    <input
                      type="checkbox"
                      checked={selectedIds.has(user.id)}
                      onChange={() => toggleOne(user.id)}
                      className="h-4 w-4 cursor-pointer rounded border-[#D1D5DB] text-[#2561EE] accent-[#2561EE]"
                    />
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold text-white ${user.avatarColor}`}>
                        {user.initials}
                      </div>
                      <div>
                        <p className="font-medium text-[#08060D]">{user.name}</p>
                        <p className="text-xs text-[#6B6375]">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <p className="text-[#08060D]">{user.country}</p>
                    <p className="text-xs text-[#6B6375]">{user.city}</p>
                  </td>
                  <td className="px-4 py-3.5 text-[#08060D]">{user.joined}</td>
                  <td className="px-4 py-3.5 text-[#08060D]">{user.posts}</td>
                  <td className="px-4 py-3.5 text-[#08060D]">{user.followers.toLocaleString()}</td>
                  <td className="px-4 py-3.5">
                    <span className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${statusBadge[isBlocked ? "Blocked" : user.status]}`}>
                      {isBlocked ? "Blocked" : user.status}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center justify-center gap-2">
                      <button className="rounded-lg px-3 py-1.5 text-xs font-medium text-[#2561EE] transition-colors hover:bg-blue-50">
                        View
                      </button>
                      <button
                        onClick={() => toggleBlock(user.id)}
                        className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                          isBlocked
                            ? "bg-green-50 text-green-600 hover:bg-green-100"
                            : "bg-red-50 text-red-600 hover:bg-red-100"
                        }`}
                      >
                        {isBlocked ? "Unblock" : "Block"}
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* ── Pagination ── */}
      <div className="mt-5 flex flex-wrap items-center justify-between gap-2">
        <p className="text-xs text-[#6B6375]">Showing 1–10 of 124,831 users</p>
        <div className="flex items-center gap-1">
          <button className="flex h-8 w-8 items-center justify-center rounded-lg text-xs text-[#6B6375] transition-colors hover:bg-[#E5E4E7]">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#2561EE] text-xs font-semibold text-white">1</span>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg text-xs text-[#6B6375] transition-colors hover:bg-[#E5E4E7] cursor-pointer">2</span>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg text-xs text-[#6B6375] transition-colors hover:bg-[#E5E4E7] cursor-pointer">3</span>
          <span className="flex h-8 w-8 items-center justify-center text-xs text-[#6B6375]">...</span>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg text-xs text-[#6B6375] transition-colors hover:bg-[#E5E4E7] cursor-pointer">248</span>
          <button className="flex h-8 w-8 items-center justify-center rounded-lg text-xs text-[#6B6375] transition-colors hover:bg-[#E5E4E7]">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </>
  )
}
