import { Menu } from "lucide-react"

type HeaderProps = {
  onToggleSidebar: () => void
}

export default function DashboardHeader({ onToggleSidebar }: HeaderProps) {
  return (
    <header className="flex items-center justify-between border-b border-[#E5E4E7] bg-white px-4 sm:px-8 py-4">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="rounded-lg p-2 text-[#6B6375] hover:bg-[#F8F9FC] lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className="relative w-48 sm:w-64 lg:w-80">
          <svg
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search..."
            className="w-full rounded-xl border border-[#E5E4E7] bg-[#F8F9FC] py-2.5 pl-10 pr-4 text-sm text-[#08060D] placeholder-[#9CA3AF] outline-none transition-colors focus:border-[#2561EE] focus:bg-white focus:ring-1 focus:ring-[#2561EE]"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-5">
        <button className="relative text-[#6B6375] transition-colors hover:text-[#08060D]">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white">
            3
          </span>
        </button>

        <button className="hidden sm:flex text-[#6B6375] transition-colors hover:text-[#08060D]">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
        </button>

        <button className="hidden sm:flex h-7 w-7 items-center justify-center rounded-full border border-[#E5E4E7] text-[#6B6375] transition-colors hover:border-[#2561EE] hover:text-[#2561EE]">
          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
            />
          </svg>
        </button>

        <div className="flex items-center gap-3 border-l border-[#E5E4E7] pl-3 sm:pl-5">
          <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#2561EE] to-[#1A4FCC] text-xs font-bold text-white">
            IM
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-[#08060D]">Ikechukwu</p>
            <p className="text-xs text-[#6B6375]">Administrator</p>
          </div>
        </div>
      </div>
    </header>
  )
}
