import { Outlet } from "react-router-dom"
import Sidebar from "./Sidebar"
import DashboardHeader from "./DashboardHeader"

export default function DashboardLayout() {
  return (
    <div className="bg-[#F9FAFC]">
      <Sidebar />
      <div className="flex h-screen flex-col pl-[256px]">
        <DashboardHeader />
        <main className="flex-1 overflow-y-auto px-8 py-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
