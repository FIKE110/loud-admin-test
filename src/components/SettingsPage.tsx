import { useState } from "react"
import { User, Lock, Bell, Settings, Upload, Smartphone } from "lucide-react"

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "security", label: "Security", icon: Lock },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "platform", label: "Platform", icon: Settings },
]

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile")

  return (
    <>
      <div className="mb-6">
        <h1 className="text-lg sm:text-xl font-bold text-[#08060D]">Settings</h1>
        <p className="mt-1 text-[13px] text-[#6B6375]">Manage your profile, security, and preferences.</p>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="w-full shrink-0 lg:w-56">
          <div className="overflow-hidden rounded-xl border border-[#E5E4E7] bg-white">
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-semibold transition-colors ${
                    isActive
                      ? "bg-blue-50 text-[#2561EE]"
                      : "text-[#6B6375] hover:bg-[#F8F9FC]"
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="flex-1">
          {activeTab === "profile" && (
            <div className="rounded-xl border border-[#E5E4E7] bg-white">
              <div className="p-6 sm:p-8">
                <h2 className="text-base font-bold text-[#08060D]">Profile Information</h2>
                <p className="mt-1 text-[13px] text-[#6B6375]">Update your personal details and public profile.</p>

                <div className="mt-6 flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#2561EE] text-lg font-bold text-white">
                    SA
                  </div>
                  <div>
                    <button className="flex items-center gap-1.5 rounded-lg border border-[#E5E4E7] bg-white px-4 py-2 text-xs font-semibold text-[#08060D] transition-colors hover:bg-[#F8F9FC]">
                      <Upload className="h-3.5 w-3.5" />
                      Upload Photo
                    </button>
                    <p className="mt-1 text-[10px] text-[#9CA3AF]">JPG, PNG or GIF. Max 2MB.</p>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-[#08060D]">First Name</label>
                    <input
                      type="text"
                      defaultValue="Super"
                      className="w-full rounded-xl border border-[#E5E4E7] bg-white px-4 py-3 text-xs text-[#08060D] outline-none transition-colors focus:border-[#2561EE] focus:ring-1 focus:ring-[#2561EE]"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-[#08060D]">Last Name</label>
                    <input
                      type="text"
                      defaultValue="Admin"
                      className="w-full rounded-xl border border-[#E5E4E7] bg-white px-4 py-3 text-xs text-[#08060D] outline-none transition-colors focus:border-[#2561EE] focus:ring-1 focus:ring-[#2561EE]"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-[#08060D]">Email</label>
                    <input
                      type="email"
                      defaultValue="admin@loud.social"
                      className="w-full rounded-xl border border-[#E5E4E7] bg-white px-4 py-3 text-xs text-[#08060D] outline-none transition-colors focus:border-[#2561EE] focus:ring-1 focus:ring-[#2561EE]"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-[#08060D]">Phone</label>
                    <input
                      type="text"
                      defaultValue="+1 555 000 1234"
                      className="w-full rounded-xl border border-[#E5E4E7] bg-white px-4 py-3 text-xs text-[#08060D] outline-none transition-colors focus:border-[#2561EE] focus:ring-1 focus:ring-[#2561EE]"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="mb-1.5 block text-xs font-semibold text-[#08060D]">Bio</label>
                  <textarea
                    rows={4}
                    defaultValue="Platform administrator for Loud!"
                    className="w-full resize-y rounded-xl border border-[#E5E4E7] bg-white px-4 py-3 text-xs text-[#08060D] outline-none transition-colors focus:border-[#2561EE] focus:ring-1 focus:ring-[#2561EE]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end border-t border-[#E5E4E7] px-6 py-4 sm:px-8">
                <button className="rounded-xl bg-[#2561EE] px-5 py-2.5 text-xs font-semibold text-white transition-opacity hover:opacity-90">
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="space-y-6">
              <div className="rounded-xl border border-[#E5E4E7] bg-white">
                <div className="p-6 sm:p-8">
                  <h2 className="text-base font-bold text-[#08060D]">Change Password</h2>
                  <p className="mt-1 text-[13px] text-[#6B6375]">Choose a strong, unique password.</p>

                  <div className="mt-6 space-y-4">
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-[#08060D]">Current Password</label>
                      <div className="relative">
                        <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B6375]" />
                        <input
                          type="password"
                          placeholder="Enter current password"
                          className="w-full rounded-xl border border-[#E5E4E7] bg-white py-3 pl-11 pr-4 text-xs text-[#08060D] placeholder-[#9CA3AF] outline-none transition-colors focus:border-[#2561EE] focus:ring-1 focus:ring-[#2561EE]"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-xs font-semibold text-[#08060D]">New Password</label>
                        <div className="relative">
                          <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B6375]" />
                          <input
                            type="password"
                            placeholder="New password"
                            className="w-full rounded-xl border border-[#E5E4E7] bg-white py-3 pl-11 pr-4 text-xs text-[#08060D] placeholder-[#9CA3AF] outline-none transition-colors focus:border-[#2561EE] focus:ring-1 focus:ring-[#2561EE]"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="mb-1.5 block text-xs font-semibold text-[#08060D]">Confirm New Password</label>
                        <div className="relative">
                          <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B6375]" />
                          <input
                            type="password"
                            placeholder="Confirm password"
                            className="w-full rounded-xl border border-[#E5E4E7] bg-white py-3 pl-11 pr-4 text-xs text-[#08060D] placeholder-[#9CA3AF] outline-none transition-colors focus:border-[#2561EE] focus:ring-1 focus:ring-[#2561EE]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-end border-t border-[#E5E4E7] px-6 py-4 sm:px-8">
                  <button className="rounded-xl bg-[#2561EE] px-5 py-2.5 text-xs font-semibold text-white transition-opacity hover:opacity-90">
                    Update Password
                  </button>
                </div>
              </div>

              <div className="rounded-xl border border-[#E5E4E7] bg-white">
                <div className="p-6 sm:p-8">
                  <h2 className="text-base font-bold text-[#08060D]">Two-Factor Authentication (2FA)</h2>
                  <p className="mt-1 text-[13px] text-[#6B6375]">Add an extra layer of security to your account.</p>

                  <div className="mt-6 space-y-4">
                    <div className="flex items-center justify-between rounded-xl border border-[#E5E4E7] px-4 py-3">
                      <div className="flex items-start gap-3">
                        <Smartphone className="mt-0.5 h-4 w-4 shrink-0 text-[#6B6375]" />
                        <div>
                          <p className="text-xs font-semibold text-[#08060D]">Authenticator App (TOTP)</p>
                          <p className="text-[11px] text-[#6B6375]">Use Google Authenticator or Authy.</p>
                        </div>
                      </div>
                      <button className="relative h-5 w-9 rounded-full bg-[#2561EE] transition-colors">
                        <span className="absolute right-0.5 top-0.5 h-4 w-4 rounded-full bg-white shadow-sm" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between rounded-xl border border-[#E5E4E7] px-4 py-3">
                      <div className="flex items-start gap-3">
                        <Smartphone className="mt-0.5 h-4 w-4 shrink-0 text-[#6B6375]" />
                        <div>
                          <p className="text-xs font-semibold text-[#08060D]">SMS Verification</p>
                          <p className="text-[11px] text-[#6B6375]">Receive codes via text message.</p>
                        </div>
                      </div>
                      <button className="relative h-5 w-9 rounded-full bg-[#E5E4E7] transition-colors">
                        <span className="absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white shadow-sm" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {(activeTab === "notifications") && (
            <div className="flex items-center justify-center rounded-xl border border-[#E5E4E7] bg-white p-12">
              <p className="text-sm text-[#6B6375]">Coming soon.</p>
            </div>
          )}

          {activeTab === "platform" && (
            <div className="rounded-xl border border-[#E5E4E7] bg-white">
              <div className="p-6 sm:p-8">
                <h2 className="text-base font-bold text-[#08060D]">Platform Configuration</h2>
                <p className="mt-1 text-[13px] text-[#6B6375]">Manage global platform settings and feature toggles.</p>

                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-[#08060D]">Platform Name</label>
                    <input
                      type="text"
                      defaultValue="Loud!"
                      className="w-full rounded-xl border border-[#E5E4E7] bg-white px-4 py-3 text-xs text-[#08060D] outline-none transition-colors focus:border-[#2561EE] focus:ring-1 focus:ring-[#2561EE]"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-[#08060D]">Support Email</label>
                    <input
                      type="email"
                      defaultValue="support@loud.social"
                      className="w-full rounded-xl border border-[#E5E4E7] bg-white px-4 py-3 text-xs text-[#08060D] outline-none transition-colors focus:border-[#2561EE] focus:ring-1 focus:ring-[#2561EE]"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-[#08060D]">Max Post Length</label>
                    <input
                      type="number"
                      defaultValue={2000}
                      className="w-full rounded-xl border border-[#E5E4E7] bg-white px-4 py-3 text-xs text-[#08060D] outline-none transition-colors focus:border-[#2561EE] focus:ring-1 focus:ring-[#2561EE]"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-[#08060D]">Max Upload Size (MB)</label>
                    <input
                      type="number"
                      defaultValue={50}
                      className="w-full rounded-xl border border-[#E5E4E7] bg-white px-4 py-3 text-xs text-[#08060D] outline-none transition-colors focus:border-[#2561EE] focus:ring-1 focus:ring-[#2561EE]"
                    />
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <div className="flex items-center justify-between rounded-xl border border-[#E5E4E7] px-4 py-3">
                    <div>
                      <p className="text-xs font-semibold text-[#08060D]">Auto-remove with 5+ reports</p>
                      <p className="text-[11px] text-[#6B6375]">Automatically remove flagged content</p>
                    </div>
                    <button className="relative h-5 w-9 shrink-0 rounded-full bg-[#2561EE] transition-colors">
                      <span className="absolute right-0.5 top-0.5 h-4 w-4 rounded-full bg-white shadow-sm" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between rounded-xl border border-[#E5E4E7] px-4 py-3">
                    <div>
                      <p className="text-xs font-semibold text-[#08060D]">AI content scanning</p>
                      <p className="text-[11px] text-[#6B6375]">Use ML to detect policy violations</p>
                    </div>
                    <button className="relative h-5 w-9 shrink-0 rounded-full bg-[#2561EE] transition-colors">
                      <span className="absolute right-0.5 top-0.5 h-4 w-4 rounded-full bg-white shadow-sm" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between rounded-xl border border-[#E5E4E7] px-4 py-3">
                    <div>
                      <p className="text-xs font-semibold text-[#08060D]">Maintenance mode</p>
                      <p className="text-[11px] text-[#6B6375]">Temporarily disable user access</p>
                    </div>
                    <button className="relative h-5 w-9 shrink-0 rounded-full bg-[#E5E4E7] transition-colors">
                      <span className="absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white shadow-sm" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-end border-t border-[#E5E4E7] px-6 py-4 sm:px-8">
                <button className="rounded-xl bg-[#2561EE] px-5 py-2.5 text-xs font-semibold text-white transition-opacity hover:opacity-90">
                  Save Platform Settings
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
