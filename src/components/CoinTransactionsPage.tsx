import { useState } from "react"

type TxnType = "Credit" | "Debit" | "Fee" | "Refund"
type Channel = "Bank Transfer" | "Card" | "USSD" | "Paystack" | "Flutterwave"

type CoinTransaction = {
  id: number
  userInitials: string
  userColor: string
  userName: string
  type: TxnType
  naira: string
  coins: string
  fee: string
  channel: Channel
  reference: string
  dateTime: string
}

const txns: CoinTransaction[] = [
  { id: 1, userInitials: "AO", userColor: "bg-pink-500", userName: "Amara Okafor", type: "Credit", naira: "+₦17,765", coins: "+178", fee: "₦265", channel: "Bank Transfer", reference: "LDC-01004", dateTime: "16 Mar 10:12" },
  { id: 2, userInitials: "KM", userColor: "bg-blue-500", userName: "Kofi Mensah", type: "Debit", naira: "₦5,200", coins: "-52", fee: "₦78", channel: "USSD", reference: "LDC-01005", dateTime: "16 Mar 09:45" },
  { id: 3, userInitials: "ZA", userColor: "bg-green-500", userName: "Zainab Abdullah", type: "Credit", naira: "+₦32,000", coins: "+320", fee: "₦480", channel: "Paystack", reference: "LDC-01006", dateTime: "16 Mar 08:30" },
  { id: 4, userInitials: "TB", userColor: "bg-orange-500", userName: "Tunde Balogun", type: "Fee", naira: "₦1,250", coins: "—", fee: "₦0", channel: "Card", reference: "LDC-01007", dateTime: "15 Mar 22:15" },
  { id: 5, userInitials: "SO", userColor: "bg-purple-500", userName: "Sade Ogunleye", type: "Credit", naira: "+₦45,500", coins: "+455", fee: "₦683", channel: "Flutterwave", reference: "LDC-01008", dateTime: "15 Mar 20:00" },
  { id: 6, userInitials: "EO", userColor: "bg-red-500", userName: "Emeka Obi", type: "Debit", naira: "₦8,900", coins: "-89", fee: "₦134", channel: "Bank Transfer", reference: "LDC-01009", dateTime: "15 Mar 18:40" },
  { id: 7, userInitials: "CO", userColor: "bg-teal-500", userName: "Chioma Okafor", type: "Credit", naira: "+₦120,000", coins: "+1200", fee: "₦1,800", channel: "Paystack", reference: "LDC-01010", dateTime: "15 Mar 16:10" },
  { id: 8, userInitials: "KA", userColor: "bg-amber-500", userName: "Kwame Asare", type: "Refund", naira: "+₦3,200", coins: "+32", fee: "₦0", channel: "Card", reference: "LDC-01011", dateTime: "15 Mar 14:25" },
  { id: 9, userInitials: "FU", userColor: "bg-indigo-500", userName: "Fatima Usman", type: "Credit", naira: "+₦85,000", coins: "+850", fee: "₦1,275", channel: "USSD", reference: "LDC-01012", dateTime: "15 Mar 12:00" },
  { id: 10, userInitials: "NE", userColor: "bg-cyan-500", userName: "Nneka Eze", type: "Debit", naira: "₦2,100", coins: "-21", fee: "₦32", channel: "Flutterwave", reference: "LDC-01013", dateTime: "15 Mar 10:35" },
  { id: 11, userInitials: "CO", userColor: "bg-rose-500", userName: "Chidi Okonkwo", type: "Fee", naira: "₦3,450", coins: "—", fee: "₦0", channel: "Bank Transfer", reference: "LDC-01014", dateTime: "15 Mar 08:50" },
  { id: 12, userInitials: "YA", userColor: "bg-violet-500", userName: "Yaa Asantewaa", type: "Credit", naira: "+₦15,000", coins: "+150", fee: "₦225", channel: "Paystack", reference: "LDC-01015", dateTime: "14 Mar 21:30" },
]

const typeColors: Record<TxnType, string> = {
  Credit: "bg-green-100 text-green-700",
  Debit: "bg-red-100 text-red-700",
  Fee: "bg-amber-100 text-amber-700",
  Refund: "bg-blue-100 text-blue-700",
}

const channelDots: Record<Channel, string> = {
  "Bank Transfer": "bg-blue-500",
  Card: "bg-amber-500",
  USSD: "bg-purple-500",
  Paystack: "bg-green-500",
  Flutterwave: "bg-pink-500",
}

export default function CoinTransactionsPage() {
  const [search, setSearch] = useState("")
  const [typeFilter, setTypeFilter] = useState<"All" | TxnType>("All")
  const [channelFilter, setChannelFilter] = useState<"All" | Channel>("All")
  const [page, setPage] = useState(1)

  const perPage = 10

  const filtered = txns.filter((t) => {
    if (typeFilter !== "All" && t.type !== typeFilter) return false
    if (channelFilter !== "All" && t.channel !== channelFilter) return false
    if (search) {
      const q = search.toLowerCase()
      const matches =
        t.userName.toLowerCase().includes(q) ||
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
          <h1 className="text-2xl font-bold text-[#08060D]">Coin Transactions</h1>
          <p className="mt-1 text-sm text-[#6B6375]">
            Track coin funding, spending, and transaction activity across the platform.
          </p>
        </div>
      </div>

      {/* ── Metric Cards ── */}
      <div className="mb-6 grid grid-cols-4 gap-4">
        <div className="rounded-2xl border border-[#E5E4E7] bg-white p-5 shadow-sm">
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.08em] text-[#6B6375]">Total Funded</p>
          <p className="text-xl font-bold text-[#08060D]">₦48.3M</p>
          <p className="mt-1.5 text-[11px] text-[#9CA3AF]">482,050 coins minted</p>
        </div>
        <div className="rounded-2xl border border-[#E5E4E7] bg-white p-5 shadow-sm">
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.08em] text-[#6B6375]">Total Spent</p>
          <p className="text-xl font-bold text-[#08060D]">₦22.1M</p>
          <p className="mt-1.5 text-[11px] text-[#9CA3AF]">221,000 coins used</p>
        </div>
        <div className="rounded-2xl border border-[#E5E4E7] bg-white p-5 shadow-sm">
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.08em] text-[#6B6375]">Fees Earned</p>
          <p className="text-xl font-bold text-[#08060D]">₦2.4M</p>
          <p className="mt-1.5 text-[11px] text-[#9CA3AF]">From coin transactions</p>
        </div>
        <div className="rounded-2xl border border-[#E5E4E7] bg-white p-5 shadow-sm">
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.08em] text-[#6B6375]">Transactions</p>
          <p className="text-xl font-bold text-[#08060D]">18,421</p>
          <p className="mt-1.5 text-[11px]">
            <span className="font-medium text-green-600">+341 today</span>
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
          <option value="Debit">Debit</option>
          <option value="Fee">Fee</option>
          <option value="Refund">Refund</option>
        </select>

        <select
          value={channelFilter}
          onChange={(e) => { setChannelFilter(e.target.value as typeof channelFilter); setPage(1) }}
          className="cursor-pointer rounded-xl border border-[#E5E4E7] bg-white px-4 py-2.5 text-sm text-[#08060D] outline-none focus:border-[#2561EE]"
        >
          <option value="All">All Channels</option>
          <option value="Bank Transfer">Bank Transfer</option>
          <option value="Card">Card</option>
          <option value="USSD">USSD</option>
          <option value="Paystack">Paystack</option>
          <option value="Flutterwave">Flutterwave</option>
        </select>
      </div>

      {/* ── Data Table ── */}
      <div className="overflow-hidden rounded-xl border border-[#E5E4E7] bg-white">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-[#E5E4E7] bg-[#F8F9FC]">
            <tr>
              <th className="px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B6375]">User</th>
              <th className="px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B6375]">Type</th>
              <th className="px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B6375]">Naira (₦)</th>
              <th className="px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B6375]">Coins</th>
              <th className="px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B6375]">Fee (₦)</th>
              <th className="px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B6375]">Channel</th>
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
              pagedTxns.map((t) => (
                <tr key={t.id} className="transition-colors hover:bg-[#F8F9FC]">
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white ${t.userColor}`}>
                        {t.userInitials}
                      </div>
                      <span className="text-xs font-medium text-[#08060D]">{t.userName}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`inline-block whitespace-nowrap rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${typeColors[t.type]}`}>
                      {t.type}
                    </span>
                  </td>
                  <td className={`px-4 py-3.5 font-medium ${t.type === "Credit" || t.type === "Refund" ? "text-green-600" : "text-[#08060D]"}`}>
                    {t.naira}
                  </td>
                  <td className="px-4 py-3.5 text-[#08060D]">{t.coins}</td>
                  <td className="px-4 py-3.5 text-[#08060D]">{t.fee}</td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-1.5">
                      <span className={`h-2 w-2 rounded-full ${channelDots[t.channel]}`} />
                      <span className="text-[#08060D]">{t.channel}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 font-mono text-[10px] text-[#6B6375]">{t.reference}</td>
                  <td className="px-4 py-3.5 whitespace-nowrap text-[#08060D]">{t.dateTime}</td>
                  <td className="px-4 py-3.5">
                    <span className="inline-block whitespace-nowrap rounded-full bg-green-100 px-2.5 py-0.5 text-[11px] font-semibold text-green-700">
                      Completed
                    </span>
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
