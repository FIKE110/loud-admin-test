import { Link } from "react-router-dom"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#FEFEFE]">
      <p className="text-6xl font-bold text-[#2561EE]">404</p>
      <h1 className="text-2xl font-semibold text-[#08060D]">Page not found</h1>
      <p className="text-sm text-[#6B6375]">
        The page you're looking for doesn't exist.
      </p>
      <Link
        to="/login"
        className="mt-4 rounded-xl bg-[#2561EE] px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-[#1A4FCC]"
      >
        Go to Login
      </Link>
    </div>
  )
}
