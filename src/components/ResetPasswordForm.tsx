import { Link } from "react-router-dom"

export default function ResetPasswordForm() {
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
          PASSWORD RESET
        </span>

        <h2 className="mt-4 text-2xl sm:text-3xl font-extrabold tracking-tight text-[#08060D]">
          Reset password
        </h2>
        <p className="mt-2 text-[13px] sm:text-sm text-[#6B6375]">
          Enter your admin email and we'll send you a secure reset link.
        </p>

        <form className="mt-8 sm:mt-10 space-y-4 sm:space-y-5" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label
              htmlFor="admin-email"
              className="mb-1.5 block text-xs sm:text-sm font-medium tracking-wide text-[#08060D]"
            >
              Admin Email Address
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
                id="admin-email"
                type="email"
                placeholder="your@admin-email.com"
                className="w-full rounded-xl border border-[#E5E4E7] bg-white py-3 sm:py-3.5 pl-12 pr-4 text-xs sm:text-sm text-[#08060D] placeholder-[#9CA3AF] outline-none transition-colors focus:border-[#2561EE] focus:ring-1 focus:ring-[#2561EE]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-[#2561EE] to-[#1A4FCC] py-3 sm:py-3.5 text-xs sm:text-sm font-semibold text-white shadow-lg shadow-[#2561EE]/25 transition-all hover:shadow-xl hover:shadow-[#2561EE]/30 active:scale-[0.98]"
          >
            Send Reset Link
          </button>
        </form>

        <div className="mt-6 sm:mt-8 text-center">
          <Link
            to="/login"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-[#6B6375] transition-colors hover:text-[#2561EE]"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to sign in
          </Link>
        </div>
      </div>
    </div>
  )
}
