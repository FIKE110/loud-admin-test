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
      { label: "Dashboard", path: "/dashboard", icon: <LayoutDashboard size={16} /> },
    ],
  },
  {
    label: "Content",
    items: [
      { label: "Users", path: "/dashboard/users", icon: <Users size={16} />, data: "124k", dataColor: "blue" },
      { label: "Posts", path: "/dashboard/posts", icon: <FileText size={16} />, data: "8", dataColor: "red" },
      { label: "Birthday Posts", path: "/dashboard/birthday-posts", icon: <Cake size={16} /> },
      { label: "Collage & Groups", path: "/dashboard/collage-and-groups", icon: <Grid3X3 size={16} /> },
      { label: "Stories", path: "/dashboard/stories", icon: <BookOpen size={16} /> },
      { label: "Live Streams", path: "/dashboard/live-streams", icon: <Video size={16} /> },
    ],
  },
  {
    label: "Moderation",
    items: [
      { label: "Reports & Flags", path: "/dashboard/reports-and-flags", icon: <Flag size={16} /> },
      { label: "Mod Queue", path: "/dashboard/mod-queue", icon: <ShieldCheck size={16} /> },
    ],
  },
  {
    label: "Administration",
    items: [
      { label: "Admin Team", path: "/dashboard/admin-team", icon: <Shield size={16} /> },
      { label: "Analytics", path: "/dashboard/analytics", icon: <BarChart3 size={16} /> },
      { label: "Notification", path: "/dashboard/notification", icon: <Bell size={16} />, data: "5", dataColor: "red" },
    ],
  },
  {
    label: "Finance",
    items: [
      { label: "Finance Overview", path: "/dashboard/finance", icon: <Wallet size={16} />, data: "100k₦", dataColor: "red" },
      { label: "Coin Transactions", path: "/dashboard/coin-transactions", icon: <Coins size={16} /> },
      { label: "Gift Transactions", path: "/dashboard/gift-transactions", icon: <Gift size={16} /> },
    ],
  },
  {
    label: "Advertising",
    items: [
      { label: "Adverts", path: "/dashboard/adverts", icon: <Megaphone size={16} />, data: "8", dataColor: "red" },
    ],
  },
  {
    label: "Account",
    items: [
      { label: "Settings", path: "/dashboard/settings", icon: <Settings size={16} /> },
    ],
  },
]

type SidebarProps = {
  isOpen: boolean
  onClose: () => void
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { pathname } = useLocation()

  const sidebar = (
    <aside className="flex h-full w-[256px] flex-col bg-[#06102F]">
        <div className="flex items-center gap-2.5 px-5 pt-4 pb-3">
          <img src="/logo.png" alt="Loud!" className="h-7 w-7 rounded-full border border-black/20" />
          <span className="text-sm font-bold tracking-[-0.02em]">
            <span className="text-white">Loud</span>
            <span className="text-[#2561EE]">!</span>
          </span>
        </div>

      <nav className="flex-1 overflow-y-auto px-2 pb-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">
        {sections.map((section) => (
          <div key={section.label} className="mb-4">
            <p className="mb-1.5 px-2 text-[10px] font-bold uppercase tracking-[0.12em] text-white/60">
              {section.label}
            </p>
            <div className="space-y-1">
              {section.items.map((item) => {
                const isActive = pathname === item.path
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={onClose}
                    className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-semibold transition-colors ${
                      isActive
                        ? "bg-white/10 text-white"
                        : "text-white/70 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <span className="shrink-0">{item.icon}</span>
                    <span className="flex-1 truncate">{item.label}</span>
                    {item.data && (
                      <span
                        className={`flex h-[18px] min-w-[28px] items-center justify-center rounded-full px-1.5 text-[9px] font-bold text-white ${
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

      <div className="border-t border-white/10 px-4 py-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-[#2561EE] to-[#1A4FCC] text-[10px] font-bold text-white">
            IM
          </div>
          <div className="flex-1 min-w-0">
            <p className="truncate text-xs font-medium text-white">Ikechukwu</p>
            <p className="truncate text-[10px] text-white/40">Administrator</p>
          </div>
          <svg className="h-3.5 w-3.5 shrink-0 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v14m7-7H5" />
          </svg>
        </div>
      </div>
    </aside>
  )

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}
      {/* Mobile sidebar (slide-in) */}
      <div
        className={`fixed inset-y-0 left-0 z-50 transition-transform duration-300 lg:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {sidebar}
      </div>
      {/* Desktop sidebar (always visible) */}
      <div className="fixed inset-y-0 left-0 z-30 hidden lg:flex h-screen">
        {sidebar}
      </div>
    </>
  )
}
