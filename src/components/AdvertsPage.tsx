import { useState } from "react"
import { Eye, TrendingUp, Calendar, List, Grid3X3, Plus } from "lucide-react"
import UploadAdvertModal from "./UploadAdvertModal"
import EditAdvertModal from "./EditAdvertModal"

type AdStatus = "Active" | "Scheduled" | "Expired"

type Campaign = {
  title: string
  client: string
  creative: string
  placement: string
  impressions: string
  ctr: string
  start: string
  expiry: string
  status: AdStatus
  image: string
}

const campaigns: Campaign[] = [
  { title: "Nike Summer 2026", client: "Nike Nigeria", creative: "Video", placement: "Post", impressions: "420K", ctr: "4.2%", start: "Mar 1", expiry: "Apr 30", status: "Active", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=250&fit=crop" },
  { title: "GTBank Promo", client: "GTBank", creative: "Image", placement: "Story", impressions: "310K", ctr: "3.8%", start: "Feb 15", expiry: "Mar 31", status: "Active", image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=250&fit=crop" },
  { title: "Zara Birthday Deals", client: "Zara Nigeria", creative: "Image+Text", placement: "Banner", impressions: "188K", ctr: "5.1%", start: "Mar 5", expiry: "Mar 20", status: "Active", image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=250&fit=crop" },
  { title: "Bolt Rides Promo", client: "Bolt", creative: "Video", placement: "Post", impressions: "95K", ctr: "2.9%", start: "Apr 1", expiry: "Apr 30", status: "Scheduled", image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&h=250&fit=crop" },
  { title: "Jumia Flash Sale", client: "Jumia", creative: "Image", placement: "Collage", impressions: "502K", ctr: "6.3%", start: "Feb 1", expiry: "Mar 15", status: "Expired", image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop" },
  { title: "MTN Data Offers", client: "MTN Nigeria", creative: "Audio+Text", placement: "Story", impressions: "220K", ctr: "3.1%", start: "Mar 10", expiry: "Apr 10", status: "Active", image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop" },
]

const statusColors: Record<AdStatus, string> = {
  Active: "bg-green-100 text-green-700",
  Scheduled: "bg-amber-100 text-amber-700",
  Expired: "bg-red-100 text-red-700",
}

export default function AdvertsPage() {
  const [view, setView] = useState<"grid" | "list">("grid")
  const [showUpload, setShowUpload] = useState(false)
  const [editCampaign, setEditCampaign] = useState<Campaign | null>(null)

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-[#08060D]">Adverts</h1>
          <p className="mt-1 text-[13px] text-[#6B6375]">Monitor and manage advertising campaigns across the platform.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex overflow-hidden rounded-lg border border-[#E5E4E7] bg-white">
            <button
              onClick={() => setView("grid")}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium transition-colors ${
                view === "grid" ? "bg-[#2561EE] text-white" : "text-[#6B6375] hover:bg-[#F8F9FC]"
              }`}
            >
              <Grid3X3 className="h-3.5 w-3.5" />
              Grid
            </button>
            <button
              onClick={() => setView("list")}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium transition-colors ${
                view === "list" ? "bg-[#2561EE] text-white" : "text-[#6B6375] hover:bg-[#F8F9FC]"
              }`}
            >
              <List className="h-3.5 w-3.5" />
              List
            </button>
          </div>
          <button
            onClick={() => setShowUpload(true)}
            className="flex items-center gap-1.5 rounded-lg bg-[#2561EE] px-4 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-90"
          >
            <Plus className="h-3.5 w-3.5" />
            Upload Advert
          </button>
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

      {view === "grid" && <div className="mb-8 grid grid-cols-3 gap-4">
        {campaigns.map((c) => (
          <div key={c.title} className="flex flex-col rounded-2xl border border-[#E5E4E7] bg-white shadow-sm transition-shadow hover:shadow-md">
            <img src={c.image} alt={c.client} className="h-40 w-full rounded-t-2xl object-cover" />
            <div className="flex flex-1 flex-col p-5">
              <div className="mb-3 flex items-start justify-between">
                <div>
                  <h3 className="text-xs font-bold text-[#08060D]">{c.title}</h3>
                  <p className="text-[11px] text-[#6B6375]">{c.client} / {c.creative}</p>
                </div>
                <span className={`inline-block whitespace-nowrap rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${statusColors[c.status]}`}>{c.status}</span>
              </div>
              <div className="mb-4 grid grid-cols-3 gap-3 border-t border-[#E5E4E7] pt-3">
                <div className="flex items-center gap-1.5">
                  <Eye className="h-3.5 w-3.5 text-[#6B6375]" />
                  <span className="text-xs font-bold text-[#08060D]">{c.impressions}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <TrendingUp className="h-3.5 w-3.5 text-[#6B6375]" />
                  <span className="text-xs font-bold text-[#08060D]">{c.ctr}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-[#6B6375]" />
                  <span className="text-xs font-medium text-[#08060D]">{c.start}</span>
                </div>
              </div>
              <div className="mt-auto flex items-center gap-2 border-t border-[#E5E4E7] pt-4">
                <button onClick={() => setEditCampaign(c)} className="flex-1 rounded-lg border border-[#E5E4E7] bg-white px-3 py-2 text-xs font-medium text-[#08060D] transition-colors hover:bg-[#F8F9FC]">Edit</button>
                <button className="flex-1 rounded-lg border border-[#E5E4E7] bg-white px-3 py-2 text-xs font-medium text-[#2561EE] transition-colors hover:bg-blue-50">Pause</button>
                <button className="flex-1 rounded-lg border border-red-200 bg-white px-3 py-2 text-xs font-medium text-red-600 transition-colors hover:bg-red-50">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>}

      {view === "list" && <div>
        <h2 className="mb-4 text-base font-bold text-[#08060D]">Advert Management</h2>
        <div className="overflow-hidden rounded-xl border border-[#E5E4E7]">
          <table className="w-full">
            <thead className="bg-[#F8F9FC]">
              <tr>
                <th className="px-4 py-3.5 text-left text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B6375]">Advert</th>
                <th className="px-4 py-3.5 text-left text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B6375]">Client</th>
                <th className="px-4 py-3.5 text-left text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B6375]">Placement</th>
                <th className="px-4 py-3.5 text-left text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B6375]">Type</th>
                <th className="px-4 py-3.5 text-left text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B6375]">Impressions</th>
                <th className="px-4 py-3.5 text-left text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B6375]">CTR</th>
                <th className="px-4 py-3.5 text-left text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B6375]">Start</th>
                <th className="px-4 py-3.5 text-left text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B6375]">Expires</th>
                <th className="px-4 py-3.5 text-left text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B6375]">Status</th>
                <th className="px-4 py-3.5 text-center text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B6375]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E4E7]">
              {campaigns.map((c) => (
                <tr key={c.title} className="hover:bg-[#F8F9FC]">
                  <td className="px-4 py-3.5 text-xs font-medium text-[#08060D]">{c.title}</td>
                  <td className="px-4 py-3.5 text-xs text-[#6B6375]">{c.client}</td>
                  <td className="px-4 py-3.5 text-xs text-[#6B6375]">{c.placement}</td>
                  <td className="px-4 py-3.5 text-xs text-[#6B6375]">{c.creative}</td>
                  <td className="px-4 py-3.5 text-xs font-semibold text-[#08060D]">{c.impressions}</td>
                  <td className="px-4 py-3.5 text-xs font-semibold text-[#08060D]">{c.ctr}</td>
                  <td className="px-4 py-3.5 text-xs text-[#6B6375]">{c.start}</td>
                  <td className="px-4 py-3.5 text-xs text-[#6B6375]">{c.expiry}</td>
                  <td className="px-4 py-3.5">
                    <span className={`inline-block whitespace-nowrap rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${statusColors[c.status]}`}>{c.status}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center justify-center gap-1">
                      <button onClick={() => setEditCampaign(c)} className="rounded-lg px-2 py-1.5 text-xs font-medium text-[#08060D] transition-colors hover:bg-[#F8F9FC]">Edit</button>
                      <button className="rounded-lg px-2 py-1.5 text-xs font-medium text-[#2561EE] transition-colors hover:bg-blue-50">Pause</button>
                      <button className="rounded-lg px-2 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-50">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>}

      {showUpload && <UploadAdvertModal onClose={() => setShowUpload(false)} />}
      {editCampaign && <EditAdvertModal campaign={editCampaign} onClose={() => setEditCampaign(null)} />}
    </>
  )
}
