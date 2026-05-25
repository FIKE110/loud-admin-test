import { useState } from "react"

type TxnType = "Credit" | "Debit"
type WalletType = "Coin" | "Gift"

type Transaction = {
  id: number
  userInitials: string
  userColor: string
  userName: string
  type: TxnType
  wallet: WalletType
  naira: string
  units: string
  fee: string
  reference: string
  date: string
}

const coinTransactions: Transaction[] = [
  { id: 1, userInitials: "AO", userColor: "bg-pink-500", userName: "Amara Okafor", type: "Credit", wallet: "Coin", naira: "+₦10,000", units: "+100", fee: "₦150", reference: "LUD-AO-001", date: "Mar 17, 10:41" },
  { id: 2, userInitials: "ZA", userColor: "bg-green-500", userName: "Zainab Abdullah", type: "Credit", wallet: "Coin", naira: "+₦25,000", units: "+250", fee: "₦375", reference: "LUD-ZA-003", date: "Mar 17, 08:15" },
  { id: 3, userInitials: "TB", userColor: "bg-orange-500", userName: "Tunde Balogun", type: "Debit", wallet: "Coin", naira: "-₦2,500", units: "-25", fee: "₦38", reference: "LUD-TB-004", date: "Mar 16, 22:45" },
  { id: 4, userInitials: "CO", userColor: "bg-teal-500", userName: "Chioma Okafor", type: "Credit", wallet: "Coin", naira: "+₦100,000", units: "+1000", fee: "₦1,500", reference: "LUD-CO-007", date: "Mar 16, 16:30" },
  { id: 5, userInitials: "KA", userColor: "bg-amber-500", userName: "Kwame Asare", type: "Debit", wallet: "Coin", naira: "-₦15,000", units: "-150", fee: "₦225", reference: "LUD-KA-008", date: "Mar 16, 14:20" },
  { id: 6, userInitials: "NE", userColor: "bg-cyan-500", userName: "Nneka Eze", type: "Debit", wallet: "Coin", naira: "-₦3,200", units: "-32", fee: "₦48", reference: "LUD-NE-010", date: "Mar 16, 09:00" },
  { id: 7, userInitials: "CO", userColor: "bg-red-500", userName: "Chidi Okonkwo", type: "Credit", wallet: "Coin", naira: "+₦45,000", units: "+450", fee: "₦675", reference: "LUD-CO-011", date: "Mar 15, 23:15" },
  { id: 8, userInitials: "EO", userColor: "bg-blue-500", userName: "Emeka Obi", type: "Credit", wallet: "Coin", naira: "+₦5,500", units: "+55", fee: "₦83", reference: "LUD-EO-013", date: "Mar 15, 18:00" },
]

const giftTransactions: Transaction[] = [
  { id: 9, userInitials: "KM", userColor: "bg-blue-500", userName: "Kofi Mensah", type: "Debit", wallet: "Gift", naira: "-₦5,000", units: "-50", fee: "₦75", reference: "LUD-KM-002", date: "Mar 17, 09:32" },
  { id: 10, userInitials: "SO", userColor: "bg-purple-500", userName: "Sade Ogunleye", type: "Credit", wallet: "Gift", naira: "+₦50,000", units: "+500", fee: "₦750", reference: "LUD-SO-005", date: "Mar 16, 21:10" },
  { id: 11, userInitials: "EO", userColor: "bg-red-500", userName: "Emeka Obi", type: "Debit", wallet: "Gift", naira: "-₦8,500", units: "-85", fee: "₦128", reference: "LUD-EO-006", date: "Mar 16, 19:50" },
  { id: 12, userInitials: "FU", userColor: "bg-indigo-500", userName: "Fatima Usman", type: "Credit", wallet: "Gift", naira: "+₦75,000", units: "+750", fee: "₦1,125", reference: "LUD-FU-009", date: "Mar 16, 11:05" },
  { id: 13, userInitials: "YA", userColor: "bg-violet-500", userName: "Yaa Asantewaa", type: "Credit", wallet: "Gift", naira: "+₦12,500", units: "+125", fee: "₦188", reference: "LUD-YA-012", date: "Mar 15, 20:40" },
  { id: 14, userInitials: "SC", userColor: "bg-rose-500", userName: "Sarah Chen", type: "Debit", wallet: "Gift", naira: "-₦20,000", units: "-200", fee: "₦300", reference: "LUD-SC-014", date: "Mar 15, 15:25" },
  { id: 15, userInitials: "KM", userColor: "bg-green-500", userName: "Kwame Mensah", type: "Credit", wallet: "Gift", naira: "+₦8,000", units: "+80", fee: "₦120", reference: "LUD-KM-015", date: "Mar 15, 12:10" },
  { id: 16, userInitials: "AB", userColor: "bg-pink-500", userName: "Aisha Bello", type: "Credit", wallet: "Gift", naira: "+₦3,000", units: "+30", fee: "₦45", reference: "LUD-AB-016", date: "Mar 15, 09:45" },
]

const months = ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"]

const barData = {
  coin: [28, 35, 42, 38, 52, 48],
  gift: [18, 22, 28, 25, 34, 31],
}

export default function FinancePage() {
  const [txnTab, setTxnTab] = useState<"Coin Txns" | "Gift Txns">("Coin Txns")
  const [granularity, setGranularity] = useState<"Volume" | "Fees" | "Users">("Volume")
  const [page, setPage] = useState(1)

  const perPage = 6

  const displayed = txnTab === "Coin Txns" ? coinTransactions : giftTransactions
  const totalPages = Math.ceil(displayed.length / perPage)
  const pagedTxns = displayed.slice((page - 1) * perPage, page * perPage)

  const maxVal = Math.max(...barData.coin.map((v, i) => v + barData.gift[i]))
  const yTicks = [0, Math.round(maxVal / 4), Math.round(maxVal / 2), Math.round((3 * maxVal) / 4), maxVal]
  const chartW = 480
  const chartH = 200
  const barGap = 4
  const groupWidth = (chartW - 60) / months.length
  const barWidth = (groupWidth - barGap * 3) / 2

  return (
    <>
      {/* ── Header Row ── */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-[#08060D]">Finance Overview</h1>
          <p className="mt-1 text-[13px] text-[#6B6375]">
            Track platform revenue, wallet balances, and transaction activity.
          </p>
        </div>
      </div>

      {/* ── KPI Cards ── */}
      <div className="mb-6 grid grid-cols-4 gap-4">
        <div className="rounded-2xl border border-[#E5E4E7] bg-white p-5 shadow-sm">
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.08em] text-[#6B6375]">Coin Wallet</p>
          <p className="text-xl font-bold text-[#08060D]">₦48,320,500</p>
          <div className="mt-2 flex items-center gap-2 text-[11px]">
            <span className="text-[#9CA3AF]">482,050 Coins in system</span>
            <span className="font-medium text-green-600">+₦2.1M</span>
          </div>
        </div>
        <div className="rounded-2xl border border-[#E5E4E7] bg-white p-5 shadow-sm">
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.08em] text-[#6B6375]">Gift Wallet</p>
          <p className="text-xl font-bold text-[#08060D]">₦31,750,000</p>
          <div className="mt-2 flex items-center gap-2 text-[11px]">
            <span className="text-[#9CA3AF]">317,500 Gifts in system</span>
            <span className="font-medium text-green-600">+₦980K</span>
          </div>
        </div>
        <div className="rounded-2xl border border-[#E5E4E7] bg-white p-5 shadow-sm">
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.08em] text-[#6B6375]">Interest Wallet</p>
          <p className="text-xl font-bold text-[#08060D]">₦4,218,340</p>
          <p className="mt-2 text-[11px] text-[#9CA3AF]">From transaction fees & charges</p>
        </div>
        <div className="rounded-2xl border border-[#E5E4E7] bg-white p-5 shadow-sm">
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.08em] text-[#6B6375]">Total Platform Value</p>
          <p className="text-xl font-bold text-[#08060D]">₦84,288,840</p>
          <p className="mt-2 text-[11px] text-[#9CA3AF]">Across 12,841 active wallets</p>
        </div>
      </div>

      {/* ── Analytics & Visualizations ── */}
      <div className="mb-6 flex gap-4">
        {/* Monthly Funding Volume */}
        <div className="flex-1 rounded-2xl border border-[#E5E4E7] bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#08060D]">Monthly Funding Volume</h3>
            <div className="flex items-center gap-1 rounded-lg border border-[#E5E4E7] p-0.5">
              {(["Volume", "Fees", "Users"] as const).map((g) => (
                <button
                  key={g}
                  onClick={() => setGranularity(g)}
                  className={`rounded-md px-3 py-1 text-[11px] font-medium transition-colors ${
                    granularity === g
                      ? "bg-[#2561EE] text-white"
                      : "text-[#6B6375] hover:bg-[#F8F9FC]"
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>
          <svg viewBox={`0 0 ${chartW + 60} ${chartH + 40}`} className="w-full" style={{ maxHeight: 240 }}>
            {/* Y-axis gridlines & labels */}
            {yTicks.map((tick, i) => {
              const y = chartH - (tick / maxVal) * chartH + 20
              return (
                <g key={i}>
                  <line x1={50} y1={y} x2={chartW + 10} y2={y} stroke="#E5E4E7" strokeWidth={1} />
                  <text x={48} y={y + 3} textAnchor="end" className="fill-[#9CA3AF]" fontSize={10}>
                    ₦{tick}M
                  </text>
                </g>
              )
            })}
            {/* Bars */}
            {months.map((month, i) => {
              const x = 50 + i * groupWidth + barGap
              const coinH = (barData.coin[i] / maxVal) * chartH
              const giftH = (barData.gift[i] / maxVal) * chartH
              const baseY = chartH + 20
              return (
                <g key={month}>
                  <rect x={x} y={baseY - coinH} width={barWidth} height={coinH} rx={3} fill="#EAB308" />
                  <rect x={x + barWidth + barGap} y={baseY - giftH} width={barWidth} height={giftH} rx={3} fill="#A855F7" />
                  <text x={x + groupWidth / 2} y={baseY + 14} textAnchor="middle" className="fill-[#6B6375]" fontSize={10}>
                    {month}
                  </text>
                </g>
              )
            })}
            {/* Legend */}
            <rect x={chartW - 80} y={0} width={10} height={10} rx={2} fill="#EAB308" />
            <text x={chartW - 66} y={9} className="fill-[#6B6375]" fontSize={10}>Coin</text>
            <rect x={chartW - 25} y={0} width={10} height={10} rx={2} fill="#A855F7" />
            <text x={chartW - 11} y={9} className="fill-[#6B6375]" fontSize={10}>Gift</text>
          </svg>
        </div>

        {/* Wallet Distribution Donut */}
        <div className="w-[280px] rounded-2xl border border-[#E5E4E7] bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-sm font-bold text-[#08060D]">Wallet Distribution</h3>
          <svg viewBox="0 0 200 200" className="mx-auto w-48 h-48">
            <g transform="translate(100, 100)">
              {/* Coin: 57% → 205.2° */}
              <path d={describeArc(0, 0, 72, 0, 205.2)} fill="#EAB308" />
              {/* Gift: 38% → 136.8° */}
              <path d={describeArc(0, 0, 72, 205.2, 342)} fill="#A855F7" />
              {/* Interest: 5% → 18° */}
              <path d={describeArc(0, 0, 72, 342, 360)} fill="#10B981" />
              <circle cx={0} cy={0} r={48} fill="white" />
            </g>
          </svg>
          <div className="mt-3 space-y-1.5 text-xs">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-sm bg-[#EAB308]" />
              <span className="text-[#6B6375]">Coin Wallets</span>
              <span className="ml-auto font-semibold text-[#08060D]">57%</span>
              <span className="text-[#9CA3AF]">₦48.3M</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-sm bg-[#A855F7]" />
              <span className="text-[#6B6375]">Gift Wallets</span>
              <span className="ml-auto font-semibold text-[#08060D]">38%</span>
              <span className="text-[#9CA3AF]">₦31.8M</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-sm bg-[#10B981]" />
              <span className="text-[#6B6375]">Interest Pool</span>
              <span className="ml-auto font-semibold text-[#08060D]">5%</span>
              <span className="text-[#9CA3AF]">₦4.2M</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Recent Transactions ── */}
      <div className="overflow-x-auto rounded-2xl border border-[#E5E4E7] bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-bold text-[#08060D]">Recent Transactions</h3>
          <div className="flex items-center gap-1 rounded-lg border border-[#E5E4E7] p-0.5">
            {(["Coin Txns", "Gift Txns"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => { setTxnTab(tab); setPage(1) }}
                className={`rounded-md px-3 py-1 text-[11px] font-medium transition-colors ${
                  txnTab === tab
                    ? "bg-[#2561EE] text-white"
                    : "text-[#6B6375] hover:bg-[#F8F9FC]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-[#E5E4E7]">
              <th className="pb-3 pr-4 text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B6375]">User</th>
              <th className="pb-3 pr-4 text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B6375]">Type</th>
              <th className="pb-3 pr-4 text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B6375]">Wallet</th>
              <th className="pb-3 pr-4 text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B6375]">Naira (₦)</th>
              <th className="pb-3 pr-4 text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B6375]">Units</th>
              <th className="pb-3 pr-4 text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B6375]">Fee (₦)</th>
              <th className="pb-3 pr-4 text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B6375]">Reference</th>
              <th className="pb-3 pr-4 text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B6375]">Date</th>
              <th className="pb-3 text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B6375]">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E4E7]">
            {pagedTxns.map((txn) => (
              <tr key={txn.id} className="transition-colors hover:bg-[#F8F9FC]">
                <td className="py-3 pr-4">
                  <div className="flex items-center gap-2">
                    <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[9px] font-bold text-white ${txn.userColor}`}>
                      {txn.userInitials}
                    </div>
                    <span className="text-[#08060D]">{txn.userName}</span>
                  </div>
                </td>
                <td className="py-3 pr-4">
                  <span className={`inline-block whitespace-nowrap rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                    txn.type === "Credit" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                  }`}>
                    {txn.type}
                  </span>
                </td>
                <td className="py-3 pr-4">
                  <div className="flex items-center gap-1.5">
                    <span className={`h-2 w-2 rounded-full ${txn.wallet === "Coin" ? "bg-[#EAB308]" : "bg-[#A855F7]"}`} />
                    <span className="text-[#08060D]">{txn.wallet}</span>
                  </div>
                </td>
                <td className={`py-3 pr-4 font-medium ${txn.type === "Credit" ? "text-green-600" : "text-red-600"}`}>
                  {txn.naira}
                </td>
                <td className="py-3 pr-4 text-[#08060D]">{txn.units}</td>
                <td className="py-3 pr-4 text-[#08060D]">{txn.fee}</td>
                <td className="py-3 pr-4 font-mono text-[10px] text-[#6B6375]">{txn.reference}</td>
                <td className="py-3 pr-4 text-[#08060D]">{txn.date}</td>
                <td className="py-3">
                  <span className="inline-block whitespace-nowrap rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-semibold text-green-700">
                    Completed
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-[#E5E4E7] pt-4">
          <p className="text-xs text-[#6B6375]">
            Showing {displayed.length === 0 ? 0 : (page - 1) * perPage + 1}
            –{Math.min(page * perPage, displayed.length)} of{" "}
            <span>{displayed.length}</span> transactions
          </p>
          {totalPages > 1 && (
            <div className="flex items-center gap-1">
              <button
                disabled={page <= 1}
                onClick={() => setPage(page - 1)}
                className="flex h-7 w-7 items-center justify-center rounded-lg text-xs text-[#6B6375] transition-colors hover:bg-[#E5E4E7] disabled:opacity-30"
              >
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <span
                  key={p}
                  onClick={() => setPage(p)}
                  className={`flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg text-xs transition-colors ${
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
                className="flex h-7 w-7 items-center justify-center rounded-lg text-xs text-[#6B6375] transition-colors hover:bg-[#E5E4E7] disabled:opacity-30"
              >
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

function describeArc(cx: number, cy: number, r: number, startDeg: number, endDeg: number) {
  const start = polarToCartesian(cx, cy, r, endDeg)
  const end = polarToCartesian(cx, cy, r, startDeg)
  const large = endDeg - startDeg > 180 ? 1 : 0
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${large} 0 ${end.x} ${end.y} L ${cx} ${cy} Z`
}
