type AdStatus = "Active" | "Scheduled" | "Expired"

type Campaign = {
  title: string
  client: string
  creative: string
  placement: string
  impressions: string
  ctr: string
  expiry: string
  status: AdStatus
}

const campaigns: Campaign[] = [
  { title: "Nike Summer 2026", client: "Nike Nigeria", creative: "Video", placement: "Post (Upper-left)", impressions: "420K", ctr: "4.2%", expiry: "Apr 30", status: "Active" },
  { title: "GTBank Promo", client: "GTBank", creative: "Image", placement: "Story (Upper-center)", impressions: "310K", ctr: "3.8%", expiry: "Mar 31", status: "Active" },
  { title: "Zara Birthday Deals", client: "Zara Nigeria", creative: "Image+Text", placement: "Birthday Post (Upper-right)", impressions: "188K", ctr: "5.1%", expiry: "Mar 20", status: "Active" },
  { title: "Bolt Rides Promo", client: "Bolt", creative: "Video", placement: "Post (Lower-left)", impressions: "95K", ctr: "2.9%", expiry: "Apr 30", status: "Scheduled" },
  { title: "Jumia Flash Sale", client: "Jumia", creative: "Image", placement: "Collage (Lower-center)", impressions: "502K", ctr: "6.3%", expiry: "Mar 15", status: "Expired" },
  { title: "MTN Data Offers", client: "MTN Nigeria", creative: "Audio+Text", placement: "Story (Lower-right)", impressions: "220K", ctr: "3.1%", expiry: "Apr 10", status: "Active" },
]

const statusColors: Record<AdStatus, string> = {
  Active: "bg-green-100 text-green-700",
  Scheduled: "bg-amber-100 text-amber-700",
  Expired: "bg-red-100 text-red-700",
}

export default function AdvertsPage() {
  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-[#08060D]">Adverts</h1>
          <p className="mt-1 text-[13px] text-[#6B6375]">Monitor and manage advertising campaigns across the platform.</p>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-4 gap-4">
        <div className="rounded-2xl border border-[#E5E4E7] bg-white p-5 shadow-sm">
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.08em] text-[#6B6375]">Active Adverts</p>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-[#08060D]">6</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-[11px] font-semibold text-green-700">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500" />Running now
            </span>
          </div>
        </div>
        <div className="rounded-2xl border border-[#E5E4E7] bg-white p-5 shadow-sm">
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.08em] text-[#6B6375]">Total Impressions</p>
          <p className="text-xl font-bold text-[#08060D]">2.4M</p>
          <p className="mt-1.5 text-[11px]"><span className="font-medium text-green-600">+180K</span> <span className="text-[#9CA3AF]">this week</span></p>
        </div>
        <div className="rounded-2xl border border-[#E5E4E7] bg-white p-5 shadow-sm">
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.08em] text-[#6B6375]">Click-Through Rate</p>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-[#08060D]">3.8%</span>
            <span className="inline-flex items-center gap-0.5 text-[11px] font-medium text-green-600">
              <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 10l7-7 7 7" /></svg>0.4%
            </span>
          </div>
        </div>
        <div className="rounded-2xl border border-[#E5E4E7] bg-white p-5 shadow-sm">
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.08em] text-[#6B6375]">Ad Revenue</p>
          <p className="text-xl font-bold text-[#08060D]">₦12.4M</p>
          <p className="mt-1.5 text-[11px]"><span className="font-medium text-green-600">+₦1.2M</span> <span className="text-[#9CA3AF]">this month</span></p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {campaigns.map((c) => (
          <div key={c.title} className="rounded-2xl border border-[#E5E4E7] bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
            <div className="mb-3 flex items-start justify-between">
              <div>
                <h3 className="text-xs font-bold text-[#08060D]">{c.title}</h3>
                <p className="text-[11px] text-[#6B6375]">{c.client} / {c.creative}</p>
              </div>
              <span className={`inline-block whitespace-nowrap rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${statusColors[c.status]}`}>{c.status}</span>
            </div>
            <div className="mb-3 inline-block rounded-md bg-[#F8F9FC] px-2.5 py-1 text-[11px] font-medium text-[#2561EE]">{c.placement}</div>
            <div className="grid grid-cols-2 gap-3 border-t border-[#E5E4E7] pt-3">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#6B6375]">Impressions</p>
                <p className="text-xs font-bold text-[#08060D]">{c.impressions}</p>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#6B6375]">CTR</p>
                <p className="text-xs font-bold text-[#08060D]">{c.ctr}</p>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#6B6375]">Expiry</p>
                <p className="text-xs font-medium text-[#08060D]">{c.expiry}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
