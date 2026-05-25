import { useState } from "react"

type GiftTxnType = "Credit" | "Gift Sent" | "Gift Received" | "Fee" | "Withdrawal"

type GiftTransaction = {
  id: number
  senderInitials: string
  senderColor: string
  senderName: string
  recipientInitials: string
  recipientColor: string
  recipientName: string
  type: GiftTxnType
  naira: string
  giftUnits: string
  fee: string
  reference: string
  dateTime: string
}

const txns: GiftTransaction[] = [
  { id: 1, senderInitials: "AN", senderColor: "bg-pink-500", senderName: "Amara Nwosu", recipientInitials: "CO", recipientColor: "bg-teal-500", recipientName: "Chioma Okafor", type: "Gift Sent", naira: "₦1,835", giftUnits: "18 gifts", fee: "₦92", reference: "LDG-02000", dateTime: "17 Mar 12:00" },
  { id: 2, senderInitials: "KM", senderColor: "bg-blue-500", senderName: "Kofi Mensah", recipientInitials: "ZA", recipientColor: "bg-green-500", recipientName: "Zainab Abdullah", type: "Gift Sent", naira: "₦5,200", giftUnits: "52 gifts", fee: "₦260", reference: "LDG-02001", dateTime: "17 Mar 10:30" },
  { id: 3, senderInitials: "—", senderColor: "bg-[#9CA3AF]", senderName: "—", recipientInitials: "TB", recipientColor: "bg-orange-500", recipientName: "Tunde Balogun", type: "Credit", naira: "+₦10,000", giftUnits: "100 gifts", fee: "₦0", reference: "LDG-02002", dateTime: "17 Mar 09:15" },
  { id: 4, senderInitials: "SO", senderColor: "bg-purple-500", senderName: "Sade Ogunleye", recipientInitials: "EO", recipientColor: "bg-red-500", recipientName: "Emeka Obi", type: "Gift Sent", naira: "₦8,900", giftUnits: "89 gifts", fee: "₦445", reference: "LDG-02003", dateTime: "16 Mar 22:00" },
  { id: 5, senderInitials: "—", senderColor: "bg-[#9CA3AF]", senderName: "—", recipientInitials: "FU", recipientColor: "bg-indigo-500", recipientName: "Fatima Usman", type: "Gift Received", naira: "+₦25,000", giftUnits: "250 gifts", fee: "₦1,250", reference: "LDG-02004", dateTime: "16 Mar 20:45" },
  { id: 6, senderInitials: "KA", senderColor: "bg-amber-500", senderName: "Kwame Asare", recipientInitials: "NE", recipientColor: "bg-cyan-500", recipientName: "Nneka Eze", type: "Gift Sent", naira: "₦3,400", giftUnits: "34 gifts", fee: "₦170", reference: "LDG-02005", dateTime: "16 Mar 18:30" },
  { id: 7, senderInitials: "CO", senderColor: "bg-rose-500", senderName: "Chidi Okonkwo", recipientInitials: "—", recipientColor: "bg-[#9CA3AF]", recipientName: "—", type: "Withdrawal", naira: "₦12,000", giftUnits: "120 gifts", fee: "₦600", reference: "LDG-02006", dateTime: "16 Mar 16:00" },
  { id: 8, senderInitials: "YA", senderColor: "bg-violet-500", senderName: "Yaa Asantewaa", recipientInitials: "SC", recipientColor: "bg-blue-500", recipientName: "Sarah Chen", type: "Gift Sent", naira: "₦2,100", giftUnits: "21 gifts", fee: "₦105", reference: "LDG-02007", dateTime: "16 Mar 14:20" },
  { id: 9, senderInitials: "—", senderColor: "bg-[#9CA3AF]", senderName: "—", recipientInitials: "AO", recipientColor: "bg-pink-500", recipientName: "Amara Okafor", type: "Gift Received", naira: "+₦15,000", giftUnits: "150 gifts", fee: "₦750", reference: "LDG-02008", dateTime: "16 Mar 12:00" },
  { id: 10, senderInitials: "FU", senderColor: "bg-indigo-500", senderName: "Fatima Usman", recipientInitials: "KA", recipientColor: "bg-amber-500", recipientName: "Kwame Asare", type: "Gift Sent", naira: "₦6,500", giftUnits: "65 gifts", fee: "₦325", reference: "LDG-02009", dateTime: "16 Mar 10:30" },
  { id: 11, senderInitials: "NE", senderColor: "bg-cyan-500", senderName: "Nneka Eze", recipientInitials: "CO", recipientColor: "bg-teal-500", recipientName: "Chioma Okafor", type: "Fee", naira: "₦888", giftUnits: "—", fee: "₦0", reference: "LDG-02010", dateTime: "16 Mar 08:45" },
  { id: 12, senderInitials: "ZA", senderColor: "bg-green-500", senderName: "Zainab Abdullah", recipientInitials: "YA", recipientColor: "bg-violet-500", recipientName: "Yaa Asantewaa", type: "Gift Sent", naira: "₦4,200", giftUnits: "42 gifts", fee: "₦210", reference: "LDG-02011", dateTime: "15 Mar 23:15" },
]

const typeColors: Record<GiftTxnType, string> = {
  Credit: "bg-green-100 text-green-700",
  "Gift Sent": "bg-red-100 text-red-700",
  "Gift Received": "bg-green-100 text-green-700",
  Fee: "bg-amber-100 text-amber-700",
  Withdrawal: "bg-rose-100 text-rose-700",
}

export default function GiftTransactionsPage() {
  const [search, setSearch] = useState("")
  const [typeFilter, setTypeFilter] = useState<"All" | GiftTxnType>("All")
  const [page, setPage] = useState(1)

  const perPage = 10

  const filtered = txns.filter((t) => {
    if (typeFilter !== "All" && t.type !== typeFilter) return false
    if (search) {
      const q = search.toLowerCase()
      const matches =
        t.senderName.toLowerCase().includes(q) ||
        t.recipientName.toLowerCase().includes(q) ||
        t.reference.toLowerCase().includes(q)
      if (!matches) return false
    }
    return true
  })

  const totalPages = Math.ceil(filtered.length / perPage)
  const pagedTxns = filtered.slice((page - 1) * perPage, page * perPage)

  return (
    <>
      {/* ── Header Row ── */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#08060D]">Gift Transactions</h1>
          <p className="mt-1 text-sm text-[#6B6375]">
            Track gift funding, peer-to-peer tipping, and transaction activity.
          </p>
        </div>
      </div>

      {/* ── Metric Cards ── */}
      <div className="mb-6 grid grid-cols-4 gap-4">
        <div className="rounded-2xl border border-[#E5E4E7] bg-white p-5 shadow-sm">
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.08em] text-[#6B6375]">Total Funded</p>
          <p className="text-xl font-bold text-[#08060D]">₦31.8M</p>
          <p className="mt-1.5 text-[11px] text-[#9CA3AF]">317,500 gifts in system</p>
        </div>
        <div className="rounded-2xl border border-[#E5E4E7] bg-white p-5 shadow-sm">
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.08em] text-[#6B6375]">Gifts Sent</p>
          <p className="text-xl font-bold text-[#08060D]">₦18.4M</p>
          <p className="mt-1.5 text-[11px] text-[#9CA3AF]">184,000 gifts sent</p>
        </div>
        <div className="rounded-2xl border border-[#E5E4E7] bg-white p-5 shadow-sm">
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.08em] text-[#6B6375]">Fees Earned</p>
          <p className="text-xl font-bold text-[#08060D]">₦1.8M</p>
          <p className="mt-1.5 text-[11px] text-[#9CA3AF]">From gift transactions</p>
        </div>
        <div className="rounded-2xl border border-[#E5E4E7] bg-white p-5 shadow-sm">
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.08em] text-[#6B6375]">Transactions</p>
          <p className="text-xl font-bold text-[#08060D]">11,203</p>
          <p className="mt-1.5 text-[11px]">
            <span className="font-medium text-green-600">+218 today</span>
          </p>
        </div>
      </div>

      {/* ── Filter Toolbar ── */}
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <div className="relative w-56">
          <svg
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]"
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search transactions..."
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
          <option value="Credit">Credit</option>
          <option value="Gift Sent">Gift Sent</option>
          <option value="Gift Received">Gift Received</option>
          <option value="Fee">Fee</option>
          <option value="Withdrawal">Withdrawal</option>
        </select>
      </div>

      {/* ── Data Table ── */}
      <div className="overflow-hidden rounded-xl border border-[#E5E4E7] bg-white">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-[#E5E4E7] bg-[#F8F9FC]">
            <tr>
              <th className="px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B6375]">Sender</th>
              <th className="px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B6375]">Recipient</th>
              <th className="px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B6375]">Type</th>
              <th className="px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B6375]">Naira (₦)</th>
              <th className="px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B6375]">Gift Units</th>
              <th className="px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B6375]">Fee (₦)</th>
              <th className="px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B6375]">Reference</th>
              <th className="px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B6375]">Date & Time</th>
              <th className="px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B6375]">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E4E7]">
            {pagedTxns.length === 0 ? (
              <tr>
                <td colSpan={9} className="px-4 py-12 text-center text-sm text-[#6B6375]">
                  No transactions found.
                </td>
              </tr>
            ) : (
              pagedTxns.map((t) => {
                const isSenderDash = t.senderName === "—"
                const isRecipientDash = t.recipientName === "—"
                const isCreditOrReceived = t.type === "Credit" || t.type === "Gift Received"
                return (
                  <tr key={t.id} className="transition-colors hover:bg-[#F8F9FC]">
                    <td className="px-4 py-3.5">
                      {isSenderDash ? (
                        <span className="text-[#9CA3AF]">—</span>
                      ) : (
                        <div className="flex items-center gap-2.5">
                          <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white ${t.senderColor}`}>
                            {t.senderInitials}
                          </div>
                          <span className="text-xs font-medium text-[#08060D]">{t.senderName}</span>
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3.5">
                      {isRecipientDash ? (
                        <span className="text-[#9CA3AF]">—</span>
                      ) : (
                        <div className="flex items-center gap-2.5">
                          <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white ${t.recipientColor}`}>
                            {t.recipientInitials}
                          </div>
                          <span className="text-xs font-medium text-[#08060D]">{t.recipientName}</span>
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={`inline-block whitespace-nowrap rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${typeColors[t.type]}`}>
                        {t.type}
                      </span>
                    </td>
                    <td className={`px-4 py-3.5 font-medium ${isCreditOrReceived ? "text-green-600" : "text-[#08060D]"}`}>
                      {t.naira}
                    </td>
                    <td className="px-4 py-3.5 text-[#08060D]">{t.giftUnits}</td>
                    <td className="px-4 py-3.5 text-[#08060D]">{t.fee}</td>
                    <td className="px-4 py-3.5 font-mono text-[10px] text-[#6B6375]">{t.reference}</td>
                    <td className="px-4 py-3.5 whitespace-nowrap text-[#08060D]">{t.dateTime}</td>
                    <td className="px-4 py-3.5">
                      <span className="inline-block whitespace-nowrap rounded-full bg-green-100 px-2.5 py-0.5 text-[11px] font-semibold text-green-700">
                        Completed
                      </span>
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
          <span>{filtered.length.toLocaleString()}</span> transactions
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
    </>
  )
}
