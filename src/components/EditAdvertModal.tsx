import { useState } from "react"
import { Calendar, ChevronDown, X } from "lucide-react"

const statuses = ["Active", "Scheduled", "Expired"] as const

type EditAdvertModalProps = {
  campaign: {
    title: string
    client: string
    start: string
    expiry: string
    status: string
  }
  onClose: () => void
}

export default function EditAdvertModal({ campaign, onClose }: EditAdvertModalProps) {
  const [campaignName, setCampaignName] = useState(campaign.title)
  const [status, setStatus] = useState(campaign.status)
  const [showStatus, setShowStatus] = useState(false)
  const [startDate, setStartDate] = useState(campaign.start)
  const [expiryDate, setExpiryDate] = useState(campaign.expiry)
  const [frequency, setFrequency] = useState(10)
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [dateTarget, setDateTarget] = useState<"start" | "expiry">("expiry")

  const [pickMonth, setPickMonth] = useState("03")
  const [pickDay, setPickDay] = useState("15")
  const [pickYear, setPickYear] = useState("2026")
  const [pickHour, setPickHour] = useState("11")
  const [pickMinute, setPickMinute] = useState("59")

  const months = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0"))
  const days = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, "0"))
  const years = ["2025", "2026", "2027", "2028"]
  const hours = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, "0"))
  const minutes = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, "0"))

  const applyDatePicker = () => {
    const value = `${pickMonth}/${pickDay}/${pickYear} ${pickHour}:${pickMinute}`
    if (dateTarget === "start") setStartDate(value)
    else setExpiryDate(value)
    setShowDatePicker(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 p-4 pt-8 sm:items-center sm:p-6">
      <div className="relative w-full max-w-lg rounded-3xl bg-white shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-7 w-7 items-center justify-center rounded-full text-[#6B6375] transition-colors hover:bg-[#F8F9FC]"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="max-h-[90vh] overflow-y-auto">
          <div className="px-6 pb-2 pt-6 sm:px-8 sm:pt-8">
            <h2 className="text-lg font-extrabold text-[#08060D]">Edit Advert</h2>
            <p className="mt-1 text-[13px] text-[#6B6375]">Update campaign settings and scheduling.</p>
          </div>

          <div className="space-y-5 px-6 pb-6 sm:px-8 sm:pb-8">
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-[#08060D]">Campaign Name</label>
              <input
                type="text"
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
                className="w-full rounded-xl border border-[#E5E4E7] bg-white px-4 py-3 text-xs text-[#08060D] outline-none transition-colors focus:border-[#2561EE] focus:ring-1 focus:ring-[#2561EE]"
              />
            </div>

            <div className="relative">
              <label className="mb-1.5 block text-xs font-semibold text-[#08060D]">Status</label>
              <button
                onClick={() => setShowStatus(!showStatus)}
                className="flex w-full items-center justify-between rounded-xl border border-[#E5E4E7] bg-white px-4 py-3 text-xs text-[#08060D] outline-none transition-colors focus:border-[#2561EE] focus:ring-1 focus:ring-[#2561EE]"
              >
                <span>{status}</span>
                <ChevronDown className={`mr-1.5 h-3.5 w-3.5 text-[#6B6375] transition-transform ${showStatus ? "rotate-180" : ""}`} />
              </button>
              {showStatus && (
                <div className="absolute z-20 mt-1 w-full overflow-hidden rounded-xl border border-[#E5E4E7] bg-white shadow-lg">
                  {statuses.map((s) => (
                    <button
                      key={s}
                      onClick={() => { setStatus(s); setShowStatus(false) }}
                      className={`w-full px-4 py-2.5 text-left text-xs transition-colors hover:bg-[#F8F9FC] ${
                        s === status ? "font-semibold text-[#2561EE]" : "text-[#08060D]"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-[#08060D]">Start Date</label>
                <div className="relative">
                  <input
                    type="text"
                    value={startDate}
                    readOnly
                    onClick={() => { setDateTarget("start"); setShowDatePicker(true) }}
                    className="w-full cursor-pointer rounded-xl border border-[#E5E4E7] bg-white px-4 py-3 pr-10 text-xs text-[#08060D] outline-none transition-colors focus:border-[#2561EE] focus:ring-1 focus:ring-[#2561EE]"
                  />
                  <Calendar className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B6375]" />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-[#08060D]">Expiry Date</label>
                <div className="relative">
                  <input
                    type="text"
                    value={expiryDate}
                    readOnly
                    onClick={() => { setDateTarget("expiry"); setShowDatePicker(true) }}
                    className="w-full cursor-pointer rounded-xl border border-[#E5E4E7] bg-white px-4 py-3 pr-10 text-xs text-[#08060D] outline-none transition-colors focus:border-[#2561EE] focus:ring-1 focus:ring-[#2561EE]"
                  />
                  <Calendar className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B6375]" />
                </div>
              </div>
            </div>

            {showDatePicker && (
              <div className="z-20 rounded-xl border border-[#E5E4E7] bg-white p-4 shadow-lg">
                <p className="mb-3 text-xs font-semibold text-[#08060D]">
                  Set {dateTarget === "start" ? "Start" : "Expiry"} Date & Time
                </p>
                <div className="mb-3 grid grid-cols-5 gap-2">
                  <div>
                    <label className="mb-1 block text-[9px] font-medium text-[#6B6375]">Month</label>
                    <select
                      value={pickMonth}
                      onChange={(e) => setPickMonth(e.target.value)}
                      className="w-full rounded-lg border border-[#E5E4E7] bg-white px-2 py-2 text-xs outline-none"
                    >
                      {months.map((m) => <option key={m} value={m}>{m}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="mb-1 block text-[9px] font-medium text-[#6B6375]">Day</label>
                    <select
                      value={pickDay}
                      onChange={(e) => setPickDay(e.target.value)}
                      className="w-full rounded-lg border border-[#E5E4E7] bg-white px-2 py-2 text-xs outline-none"
                    >
                      {days.map((d) => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="mb-1 block text-[9px] font-medium text-[#6B6375]">Year</label>
                    <select
                      value={pickYear}
                      onChange={(e) => setPickYear(e.target.value)}
                      className="w-full rounded-lg border border-[#E5E4E7] bg-white px-2 py-2 text-xs outline-none"
                    >
                      {years.map((y) => <option key={y} value={y}>{y}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="mb-1 block text-[9px] font-medium text-[#6B6375]">Hour</label>
                    <select
                      value={pickHour}
                      onChange={(e) => setPickHour(e.target.value)}
                      className="w-full rounded-lg border border-[#E5E4E7] bg-white px-2 py-2 text-xs outline-none"
                    >
                      {hours.map((h) => <option key={h} value={h}>{h}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="mb-1 block text-[9px] font-medium text-[#6B6375]">Min</label>
                    <select
                      value={pickMinute}
                      onChange={(e) => setPickMinute(e.target.value)}
                      className="w-full rounded-lg border border-[#E5E4E7] bg-white px-2 py-2 text-xs outline-none"
                    >
                      {minutes.map((m) => <option key={m} value={m}>{m}</option>)}
                    </select>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setShowDatePicker(false)}
                    className="rounded-lg border border-[#E5E4E7] px-3 py-1.5 text-xs font-medium text-[#6B6375] transition-colors hover:bg-[#F8F9FC]"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={applyDatePicker}
                    className="rounded-lg bg-[#2561EE] px-3 py-1.5 text-xs font-medium text-white transition-opacity hover:opacity-90"
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-[#08060D]">Frequency (every N posts)</label>
              <input
                type="number"
                value={frequency}
                onChange={(e) => setFrequency(Number(e.target.value))}
                className="w-full max-w-[120px] rounded-xl border border-[#E5E4E7] bg-white px-4 py-3 text-xs text-[#08060D] outline-none transition-colors focus:border-[#2561EE] focus:ring-1 focus:ring-[#2561EE]"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 border-t border-[#E5E4E7] bg-white px-6 py-4 sm:px-8">
            <button
              onClick={onClose}
              className="rounded-xl border border-[#E5E4E7] bg-white px-5 py-2.5 text-xs font-semibold text-[#08060D] transition-colors hover:bg-[#F8F9FC]"
            >
              Cancel
            </button>
            <button
              onClick={onClose}
              className="rounded-xl bg-[#2561EE] px-5 py-2.5 text-xs font-semibold text-white transition-opacity hover:opacity-90"
            >
              Save Updates
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
