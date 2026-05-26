import { useState } from "react"
import { Upload, Calendar, X } from "lucide-react"

const placements = ["Regular Post", "Birthday Post", "Collage / Group", "Story", "Live Stream"]

const contentTypes = [
  { label: "Text", icon: "T" },
  { label: "Image", icon: "🖼" },
  { label: "Video", icon: "▶" },
  { label: "Audio", icon: "🎵" },
]

export default function UploadAdvertModal({ onClose }: { onClose: () => void }) {
  const [placement, setPlacement] = useState("Regular Post")
  const [contentType, setContentType] = useState("Text")
  const [dragging, setDragging] = useState(false)

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 p-4 pt-8 sm:items-center sm:p-6">
      <div className="relative w-full max-w-2xl rounded-3xl bg-white shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-7 w-7 items-center justify-center rounded-full text-[#6B6375] transition-colors hover:bg-[#F8F9FC]"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="max-h-[90vh] overflow-y-auto">
          <div className="px-6 pb-2 pt-6 sm:px-8 sm:pt-8">
            <h2 className="text-xl font-extrabold text-[#08060D]">Upload New Advert</h2>
            <p className="mt-1 text-[13px] text-[#6B6375]">Create a paid advertisement to appear across the platform.</p>
          </div>

          <div className="space-y-5 px-6 pb-6 sm:px-8 sm:pb-8">
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-[#08060D]">Advert Title / Campaign Name</label>
              <input
                type="text"
                placeholder="Nike Summer 2026"
                className="w-full rounded-xl border border-[#E5E4E7] bg-white px-4 py-3 text-xs text-[#08060D] placeholder-[#9CA3AF] outline-none transition-colors focus:border-[#2561EE] focus:ring-1 focus:ring-[#2561EE]"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-[#08060D]">Client / Advertiser</label>
              <input
                type="text"
                placeholder="Nike Nigeria"
                className="w-full rounded-xl border border-[#E5E4E7] bg-white px-4 py-3 text-xs text-[#08060D] placeholder-[#9CA3AF] outline-none transition-colors focus:border-[#2561EE] focus:ring-1 focus:ring-[#2561EE]"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-[#08060D]">Call-to-Action URL</label>
              <input
                type="url"
                placeholder="https://advertiser-site.com"
                className="w-full rounded-xl border border-[#E5E4E7] bg-white px-4 py-3 text-xs text-[#08060D] placeholder-[#9CA3AF] outline-none transition-colors focus:border-[#2561EE] focus:ring-1 focus:ring-[#2561EE]"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-[#08060D]">Frequency (every N posts)</label>
              <input
                type="number"
                defaultValue={10}
                className="w-full max-w-[120px] rounded-xl border border-[#E5E4E7] bg-white px-4 py-3 text-xs text-[#08060D] outline-none transition-colors focus:border-[#2561EE] focus:ring-1 focus:ring-[#2561EE]"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold text-[#08060D]">Placement — Inject into</label>
              <div className="flex flex-wrap gap-2">
                {placements.map((p) => (
                  <button
                    key={p}
                    onClick={() => setPlacement(p)}
                    className={`rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
                      placement === p
                        ? "bg-[#2561EE] text-white"
                        : "border border-[#E5E4E7] bg-white text-[#6B6375] hover:bg-[#F8F9FC]"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold text-[#08060D]">Content Type</label>
              <div className="grid grid-cols-4 gap-3">
                {contentTypes.map((ct) => (
                  <button
                    key={ct.label}
                    onClick={() => setContentType(ct.label)}
                    className={`flex flex-col items-center gap-1.5 rounded-xl border-2 px-3 py-3 text-xs font-semibold transition-colors ${
                      contentType === ct.label
                        ? "border-[#2561EE] bg-blue-50 text-[#2561EE]"
                        : "border-[#E5E4E7] text-[#6B6375] hover:bg-[#F8F9FC]"
                    }`}
                  >
                    <span className="text-base">{ct.icon}</span>
                    <span>{ct.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold text-[#08060D]">Upload Media</label>
              <div
                onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
                onDragLeave={() => setDragging(false)}
                onDrop={(e) => { e.preventDefault(); setDragging(false) }}
                className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-4 py-8 transition-colors ${
                  dragging ? "border-[#2561EE] bg-blue-50" : "border-[#E5E4E7] hover:border-[#2561EE]"
                }`}
              >
                <Upload className="h-6 w-6 text-[#6B6375]" />
                <p className="text-xs font-medium text-[#08060D]">Click to upload or drag and drop</p>
                <p className="text-[10px] text-[#9CA3AF]">MP4, MOV, JPG, PNG, MP3, WAV — max 100MB</p>
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-[#08060D]">Caption / Body Text</label>
              <textarea
                rows={4}
                placeholder="Ad copy text..."
                className="w-full resize-y rounded-xl border border-[#E5E4E7] bg-white px-4 py-3 text-xs text-[#08060D] placeholder-[#9CA3AF] outline-none transition-colors focus:border-[#2561EE] focus:ring-1 focus:ring-[#2561EE]"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-[#08060D]">Start Date</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="mm/dd/yyyy  --:-- --"
                    className="w-full rounded-xl border border-[#E5E4E7] bg-white px-4 py-3 pr-10 text-xs text-[#08060D] placeholder-[#9CA3AF] outline-none transition-colors focus:border-[#2561EE] focus:ring-1 focus:ring-[#2561EE]"
                  />
                  <Calendar className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B6375]" />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-[#08060D]">Expiry Date</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="mm/dd/yyyy  --:-- --"
                    className="w-full rounded-xl border border-[#E5E4E7] bg-white px-4 py-3 pr-10 text-xs text-[#08060D] placeholder-[#9CA3AF] outline-none transition-colors focus:border-[#2561EE] focus:ring-1 focus:ring-[#2561EE]"
                  />
                  <Calendar className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B6375]" />
                </div>
              </div>
            </div>
          </div>

          <div className="sticky bottom-0 flex items-center justify-end gap-3 border-t border-[#E5E4E7] bg-white px-6 py-4 sm:px-8">
            <button
              onClick={onClose}
              className="rounded-xl border border-[#E5E4E7] bg-white px-5 py-2.5 text-xs font-semibold text-[#08060D] transition-colors hover:bg-[#F8F9FC]"
            >
              Cancel
            </button>
            <button className="flex items-center gap-2 rounded-xl bg-[#2561EE] px-5 py-2.5 text-xs font-semibold text-white transition-opacity hover:opacity-90">
              <Upload className="h-3.5 w-3.5" />
              Publish Advert
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
