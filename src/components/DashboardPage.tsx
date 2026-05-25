import Sidebar from "./Sidebar"
import DashboardHeader from "./DashboardHeader"
import StatCard from "./StatCard"
import UserGrowthChart from "./UserGrowthChart"
import ContentBreakdownChart from "./ContentBreakdownChart"
import TopCountries from "./TopCountries"
import EngagementChart from "./EngagementChart"
import LiveActivity from "./LiveActivity"

const stats = [
  {
    title: "Joined Users",
    value: "892,451",
    change: "+14.8%",
    trend: "up" as const,
    accent: "bg-purple-50 text-purple-600",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
  },
  {
    title: "Joined Today",
    value: "1,247",
    change: "+18.3%",
    trend: "up" as const,
    accent: "bg-blue-50 text-blue-600",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
      </svg>
    ),
  },
  {
    title: "Joined This Week",
    value: "8,432",
    change: "+5.2%",
    trend: "up" as const,
    accent: "bg-indigo-50 text-indigo-600",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    title: "Monthly Active",
    value: "124,893",
    change: "+12.5%",
    trend: "up" as const,
    accent: "bg-green-50 text-green-600",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
  {
    title: "Joined This Month",
    value: "24,561",
    change: "+8.7%",
    trend: "up" as const,
    accent: "bg-teal-50 text-teal-600",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: "Joined This Year",
    value: "142,807",
    change: "+22.4%",
    trend: "up" as const,
    accent: "bg-cyan-50 text-cyan-600",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Flagged Content",
    value: "234",
    change: "-5.7%",
    trend: "down" as const,
    accent: "bg-orange-50 text-orange-600",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
      </svg>
    ),
  },
  {
    title: "Live Streams Now",
    value: "18",
    change: "+3",
    trend: "up" as const,
    accent: "bg-red-50 text-red-600",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
  },
]

export default function DashboardPage() {
  return (
    <div className="bg-[#F9FAFC]">
      <Sidebar />
      <div className="flex h-screen flex-col pl-[256px]">
        <DashboardHeader />
        <main className="flex-1 overflow-y-auto px-8 py-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-[#08060D]">Dashboard</h1>
            <p className="mt-1 text-sm text-[#6B6375]">
              Welcome back, Ikechukwu. Here's what's happening today.
            </p>
          </div>

          <div className="mb-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {stats.map((stat) => (
              <StatCard key={stat.title} {...stat} />
            ))}
          </div>

          <div className="mb-6 grid grid-cols-1 gap-5 xl:grid-cols-2">
            <UserGrowthChart />
            <ContentBreakdownChart />
          </div>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            <TopCountries />
            <EngagementChart />
            <LiveActivity />
          </div>
        </main>
      </div>
    </div>
  )
}
