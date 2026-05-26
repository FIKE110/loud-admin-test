import { Link, useNavigate } from "react-router-dom"

export default function LoginForm() {
  const navigate = useNavigate()

  return (
    <div className="flex min-h-screen w-full flex-col justify-center bg-[#FEFEFE] px-6 sm:px-10 lg:w-1/2 lg:px-16">
      <div className="mx-auto w-full max-w-sm">
        <div className="mb-6 flex items-center gap-2 lg:hidden">
          <img src="/logo.png" alt="Loud!" className="h-8 w-8 rounded-full border border-black/20" />
          <span className="text-lg font-bold tracking-[-0.02em]">
            <span className="text-[#08060D]">Loud</span>
            <span className="text-[#2561EE]">!</span>
          </span>
        </div>
        <span className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] text-[#2561EE]">
          ADMIN PORTAL
        </span>

        <h2 className="mt-4 text-2xl sm:text-3xl font-extrabold tracking-tight text-[#08060D]">
          Welcome back
        </h2>
        <p className="mt-2 text-[13px] sm:text-sm text-[#6B6375]">
          Sign in to access the Loud! admin dashboard.
        </p>

        <form className="mt-8 sm:mt-10 space-y-4 sm:space-y-5" onSubmit={(e) => { e.preventDefault(); navigate("/dashboard") }}>
          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-xs sm:text-sm font-medium tracking-wide text-[#08060D]"
            >
              Email address
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                <svg
                  className="h-4 w-4 text-[#6B6375]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <input
                id="email"
                type="email"
                defaultValue="admin@loud.social"
                className="w-full rounded-xl border border-[#E5E4E7] bg-white py-3 sm:py-3.5 pl-12 pr-4 text-xs sm:text-sm text-[#08060D] placeholder-[#9CA3AF] outline-none transition-colors focus:border-[#2561EE] focus:ring-1 focus:ring-[#2561EE]"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="mb-1.5 block text-xs sm:text-sm font-medium tracking-wide text-[#08060D]"
              >
                Password
              </label>
            </div>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                <svg
                  className="h-4 w-4 text-[#6B6375]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <input
                id="password"
                type="password"
                defaultValue="••••••••"
                className="w-full rounded-xl border border-[#E5E4E7] bg-white py-3 sm:py-3.5 pl-12 pr-4 text-xs sm:text-sm text-[#08060D] outline-none transition-colors focus:border-[#2561EE] focus:ring-1 focus:ring-[#2561EE]"
              />
            </div>
          </div>

          <div className="text-right">
            <Link
              to="/reset-password"
              className="text-xs sm:text-sm font-medium text-[#2561EE] hover:underline"
            >
              Forgot your password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-[#2561EE] to-[#1A4FCC] py-3 sm:py-3.5 text-xs sm:text-sm font-semibold text-white shadow-lg shadow-[#2561EE]/25 transition-all hover:shadow-xl hover:shadow-[#2561EE]/30 active:scale-[0.98]"
          >
            Sign in to Dashboard
          </button>
        </form>

        <div className="mt-6 sm:mt-8 rounded-xl border border-[#E5E4E7] bg-[#F8F9FC] p-3 sm:p-4">
          <div className="flex items-start gap-3">
            <svg
              className="mt-0.5 h-4 w-4 shrink-0 text-[#F59E0B]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            <p className="text-[9px] sm:text-[10px] leading-snug text-[#6B6375]">
              Admin access is by invitation only. Contact a super admin to
              request access. Unauthorized login attempts are logged.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
