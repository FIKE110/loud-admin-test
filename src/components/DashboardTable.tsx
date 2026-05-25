const rows = [
  { name: "Alex Morgan", email: "alex@example.com", role: "Moderator", status: "Active", posts: 342 },
  { name: "Sarah Chen", email: "sarah@example.com", role: "Admin", status: "Active", posts: 891 },
  { name: "James Wilson", email: "james@example.com", role: "Editor", status: "Inactive", posts: 156 },
  { name: "Emily Davis", email: "emily@example.com", role: "Moderator", status: "Active", posts: 523 },
  { name: "Michael Brown", email: "michael@example.com", role: "Viewer", status: "Suspended", posts: 78 },
]

export default function DashboardTable() {
  return (
    <div className="rounded-2xl border border-[#E5E4E7] bg-white">
      <div className="flex items-center justify-between border-b border-[#E5E4E7] px-6 py-4">
        <h3 className="text-lg font-bold text-[#08060D]">Recent Users</h3>
        <button className="rounded-xl bg-[#2561EE] px-4 py-2 text-xs font-semibold text-white transition-all hover:bg-[#1A4FCC] active:scale-[0.98]">
          View All
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#E5E4E7]">
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[#6B6375]">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[#6B6375]">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[#6B6375]">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[#6B6375]">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-[#6B6375]">
                Posts
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="border-b border-[#E5E4E7] last:border-0 hover:bg-[#F8F9FC]">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#2561EE] to-[#1A4FCC] text-[10px] font-bold text-white">
                      {row.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <span className="text-sm font-medium text-[#08060D]">{row.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-[#6B6375]">{row.email}</td>
                <td className="px-6 py-4">
                  <span className="rounded-lg bg-[#F8F9FC] px-2.5 py-1 text-xs font-medium text-[#6B6375]">
                    {row.role}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
                      row.status === "Active"
                        ? "bg-green-50 text-green-600"
                        : row.status === "Inactive"
                          ? "bg-gray-50 text-gray-500"
                          : "bg-red-50 text-red-600"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        row.status === "Active"
                          ? "bg-green-500"
                          : row.status === "Inactive"
                            ? "bg-gray-400"
                            : "bg-red-500"
                      }`}
                    />
                    {row.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right text-sm font-medium text-[#08060D]">
                  {row.posts}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
