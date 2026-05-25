import { Link, useLocation } from "react-router-dom"
import {
  LayoutDashboard,
  Users,
  FileText,
  Cake,
  Grid3X3,
  BookOpen,
  Video,
  Flag,
  ShieldCheck,
  Shield,
  BarChart3,
  Bell,
  Wallet,
  Coins,
  Gift,
  Megaphone,
  Settings,
} from "lucide-react"

type NavItem = {
  label: string
  path: string
  icon: React.ReactNode
  data?: string
  dataColor?: "blue" | "red"
}

type Section = {
  label: string
  items: NavItem[]
}

const sections: Section[] = [
  {
    label: "Overview",
    items: [
      { label: "Dashboard", path: "/dashboard", icon: <LayoutDashboard size={18} /> },
    ],
  },
  {
    label: "Content",
    items: [
      { label: "Users", path: "/dashboard/users", icon: <Users size={18} />, data: "124k", dataColor: "blue" },
      { label: "Posts", path: "/dashboard/posts", icon: <FileText size={18} />, data: "8", dataColor: "red" },
      { label: "Birthday Posts", path: "/dashboard/birthday-posts", icon: <Cake size={18} /> },
      { label: "Collage & Groups", path: "/dashboard/collage-and-groups", icon: <Grid3X3 size={18} /> },
      { label: "Stories", path: "/dashboard/stories", icon: <BookOpen size={18} /> },
      { label: "Live Streams", path: "/dashboard/live-streams", icon: <Video size={18} /> },
    ],
  },
  {
    label: "Moderation",
    items: [
      { label: "Reports & Flags", path: "/dashboard/reports-and-flags", icon: <Flag size={18} /> },
      { label: "Mod Queue", path: "/dashboard/mod-queue", icon: <ShieldCheck size={18} /> },
    ],
  },
  {
    label: "Administration",
    items: [
      { label: "Admin Team", path: "/dashboard/admin-team", icon: <Shield size={18} /> },
      { label: "Analytics", path: "/dashboard/analytics", icon: <BarChart3 size={18} /> },
      { label: "Notification", path: "/dashboard/notification", icon: <Bell size={18} />, data: "5", dataColor: "red" },
    ],
  },
  {
    label: "Finance",
    items: [
      { label: "Finance Overview", path: "/dashboard/finance", icon: <Wallet size={18} />, data: "100k₦", dataColor: "red" },
      { label: "Coin Transactions", path: "/dashboard/coin-transactions", icon: <Coins size={18} /> },
      { label: "Gift Transactions", path: "/dashboard/gift-transactions", icon: <Gift size={18} /> },
    ],
  },
  {
    label: "Advertising",
    items: [
      { label: "Adverts", path: "/dashboard/adverts", icon: <Megaphone size={18} />, data: "8", dataColor: "red" },
    ],
  },
  {
    label: "Account",
    items: [
      { label: "Settings", path: "/dashboard/settings", icon: <Settings size={18} /> },
    ],
  },
]

export default function Sidebar() {
  const { pathname } = useLocation()

  return (
    <aside className="fixed inset-y-0 left-0 z-30 flex h-screen w-[256px] flex-col bg-[#06102F]">
      <div className="flex items-center gap-3 px-5 pt-5 pb-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#2561EE]">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M6 4h12M6 12h8M6 20h12" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="18" cy="8" r="2" fill="white" />
            <circle cx="16" cy="16" r="2" fill="white" />
          </svg>
        </div>
        <span className="text-lg font-bold text-white">Loud!</span>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 pb-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">
        {sections.map((section) => (
          <div key={section.label} className="mb-3">
            <p className="mb-1 px-2 text-[11px] font-bold uppercase tracking-[0.12em] text-white/60">
              {section.label}
            </p>
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const isActive = pathname === item.path
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
                      isActive
                        ? "bg-white/10 text-white"
                        : "text-white/70 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <span className="shrink-0">{item.icon}</span>
                    <span className="flex-1 truncate">{item.label}</span>
                    {item.data && (
                      <span
                        className={`flex h-5 min-w-[36px] items-center justify-center rounded-full px-2 text-[10px] font-bold text-white ${
                          item.dataColor === "blue" ? "bg-blue-500" : "bg-red-500"
                        }`}
                      >
                        {item.data}
                      </span>
                    )}
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="border-t border-white/10 px-5 py-3.5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#2561EE] to-[#1A4FCC] text-xs font-bold text-white">
            IM
          </div>
          <div className="flex-1 min-w-0">
            <p className="truncate text-sm font-medium text-white">Ikechukwu</p>
            <p className="truncate text-xs text-white/40">Administrator</p>
          </div>
          <svg className="h-4 w-4 shrink-0 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v14m7-7H5" />
          </svg>
        </div>
      </div>
    </aside>
  )
}
