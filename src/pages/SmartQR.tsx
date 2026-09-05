import { useState } from "react";

export default function SmartQR({ isLightMode = false }: { isLightMode?: boolean }) {
  const [activeVendor, setActiveVendor] = useState("ABC Catering");
  const [view, setView] = useState<"landing" | "products" | "booking">("landing");

  const vendors = ["ABC Catering", "Bliss Decor Studio", "DJ Karan Pro", "Frames & Moments"];

  return (
    <div className={`min-h-screen pt-10 pb-20 px-6 transition-colors duration-300 ${
      isLightMode ? "bg-[#F7F4EE] text-[#111116]" : "bg-[#0B0B14] text-[#F7F4EE]"
    }`}>
      <div className="max-w-[1440px] mx-auto">
        <div className="text-center mb-10">
          <p className={`text-[11px] font-mono tracking-[0.25em] uppercase mb-2 font-bold ${
            isLightMode ? "text-[#6F6B66]" : "text-[#B89B5E]"
          }`}>Instant Check-in & Ordering</p>
          <h1 className={`font-serif font-bold text-3xl md:text-5xl mb-2 ${isLightMode ? "text-[#111116]" : "text-white"}`}>
            Smart <span className="grad-champagne">QR System</span>
          </h1>
          <p className={`text-[14px] font-medium ${isLightMode ? "text-[#6F6B66]" : "text-white/50"}`}>
            Vendor QR landing pages — scan to book instantly
          </p>
        </div>

        {/* Vendor selector */}
        <div className="flex gap-2 justify-center overflow-x-auto pb-2 mb-10">
          {vendors.map((v) => {
            const isActive = activeVendor === v;
            return (
              <button key={v} onClick={() => { setActiveVendor(v); setView("landing"); }}
                className={`px-4 py-2.5 rounded-full text-[13px] font-bold whitespace-nowrap border transition-all shrink-0 ${
                  isLightMode
                    ? isActive
                      ? "btn-gold-champagne !px-4 !py-2.5 text-[#111116] shadow-md"
                      : "bg-white border-[#DED9CF] text-[#111116] hover:bg-[#EAE5DA]"
                    : isActive
                      ? "border-[#B89B5E] bg-[#B89B5E]/20 text-[#E8C98A]"
                      : "text-white/55 border-white/12 bg-[#151522] hover:border-white/25"
                }`}>
                {v}
              </button>
            );
          })}
        </div>

        {/* Phone mockup */}
        <div className="flex flex-col lg:flex-row gap-10 items-start justify-center">
          <div className="relative mx-auto lg:mx-0" style={{ maxWidth: 340 }}>
            <div className={`rounded-[44px] overflow-hidden border min-h-[600px] shadow-2xl ${
              isLightMode ? "bg-white border-[#DED9CF] text-[#111116]" : "bg-[#151522] border-white/20 text-white"
            }`}>
              {/* Status bar */}
              <div className={`px-6 py-3 flex items-center justify-between text-[11px] font-semibold ${
                isLightMode ? "text-[#6F6B66] bg-[#F7F4EE]" : "text-white/60"
              }`}>
                <span>9:41</span>
                <div className="flex gap-1">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor"><rect x="1" y="7" width="2" height="4"/><rect x="4" y="5" width="2" height="6"/><rect x="7" y="3" width="2" height="8"/><rect x="10" y="1" width="2" height="10"/></svg>
                  <span>5G 🔋</span>
                </div>
              </div>

              {view === "landing" && (
                <div className="px-6 pb-8 animate-fade-in">
                  {/* Vendor logo area */}
                  <div className="text-center mb-8">
                    <div className="w-24 h-24 rounded-3xl mx-auto flex items-center justify-center text-4xl mb-4 shadow-md text-[#111116]"
                      style={{ background: "linear-gradient(135deg, #E8C98A, #B89B5E)" }}>
                      {activeVendor.includes("Catering") ? "🍽️" : activeVendor.includes("Decor") ? "🌸" : activeVendor.includes("DJ") ? "🎵" : "📸"}
                    </div>
                    <h2 className="font-serif font-bold text-[22px]">
                      Welcome to<br/>
                      <span className="grad-champagne">{activeVendor}</span>
                    </h2>
                    <div className="flex items-center justify-center gap-2 mt-2">
                      <span className="bg-emerald-500/10 text-emerald-700 border border-emerald-500/30 px-2.5 py-1 rounded-full text-[11px] font-bold">✓ EVENTTRUST Verified</span>
                    </div>
                    <div className="text-[#B89B5E] font-bold text-[14px] mt-2">★ 4.9 · 342 reviews</div>
                  </div>

                  {/* QR code */}
                  <div className="flex justify-center mb-8">
                    <div className={`rounded-2xl p-4 border ${isLightMode ? "bg-[#F7F4EE] border-[#DED9CF]" : "bg-[#1C1C2B] border-white/15"}`}>
                      <div className="w-32 h-32 bg-white rounded-xl p-2 shadow-sm">
                        <div className="w-full h-full grid grid-cols-8 gap-0.5">
                          {Array.from({ length: 64 }).map((_, i) => (
                            <div key={i} className="rounded-sm" style={{
                              background: [0,1,2,3,4,5,6,8,14,16,22,24,30,32,33,34,35,36,37,38,39,40,46,48,54,56,57,58,59,60,61,62,63].includes(i) ? "#111116" : "white"
                            }}/>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Main action buttons */}
                  <div className="space-y-4">
                    <button onClick={() => setView("booking")}
                      className="btn-gold-champagne w-full py-4 rounded-2xl font-bold text-[16px] justify-center">
                      📋 Book Vendor
                    </button>
                    <button onClick={() => setView("products")}
                      className={`w-full py-4 rounded-2xl font-bold text-[16px] flex items-center justify-center gap-3 border ${
                        isLightMode ? "bg-[#F7F4EE] text-[#111116] border-[#DED9CF] hover:bg-[#EAE5DA]" : "btn-hero-outline"
                      }`}>
                      🛒 Order Products
                    </button>
                  </div>

                  <div className="flex gap-4 mt-6">
                    <button className={`flex-1 py-2.5 rounded-xl border text-[13px] font-bold ${
                      isLightMode ? "bg-[#F7F4EE] border-[#DED9CF] text-[#111116] hover:bg-[#EAE5DA]" : "bg-white/5 border-white/12 text-white/60 hover:text-white"
                    }`}>
                      📞 Call
                    </button>
                    <button className="flex-1 py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-[13px] font-bold text-emerald-700">
                      💬 WhatsApp
                    </button>
                    <button className={`flex-1 py-2.5 rounded-xl border text-[13px] font-bold ${
                      isLightMode ? "bg-[#F7F4EE] border-[#DED9CF] text-[#111116] hover:bg-[#EAE5DA]" : "bg-white/5 border-white/12 text-white/60 hover:text-white"
                    }`}>
                      🌐 Website
                    </button>
                  </div>
                </div>
              )}

              {view === "booking" && (
                <div className="px-6 pb-8 animate-fade-in">
                  <button onClick={() => setView("landing")} className={`flex items-center gap-1.5 text-[12px] font-bold mb-5 ${isLightMode ? "text-[#6F6B66]" : "text-white/55"}`}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 3L5 7l4 4"/></svg>
                    Back
                  </button>
                  <h3 className="font-serif font-bold text-[18px] mb-5">Book {activeVendor}</h3>

                  <div className="space-y-4">
                    <div>
                      <label className={`block text-[11px] mb-1.5 font-bold ${isLightMode ? "text-[#6F6B66]" : "text-white/45"}`}>Event Date</label>
                      <input type="date" className={`w-full px-3 py-2.5 text-[13px] rounded-xl border ${
                        isLightMode ? "bg-[#F7F4EE] border-[#DED9CF] text-[#111116]" : "bg-[#1C1C2B] border-white/15 text-white"
                      }`}/>
                    </div>
                    <div>
                      <label className={`block text-[11px] mb-1.5 font-bold ${isLightMode ? "text-[#6F6B66]" : "text-white/45"}`}>Guest Count</label>
                      <input type="number" placeholder="e.g. 200" className={`w-full px-3 py-2.5 text-[13px] rounded-xl border ${
                        isLightMode ? "bg-[#F7F4EE] border-[#DED9CF] text-[#111116]" : "bg-[#1C1C2B] border-white/15 text-white"
                      }`}/>
                    </div>
                    <div>
                      <label className={`block text-[11px] mb-1.5 font-bold ${isLightMode ? "text-[#6F6B66]" : "text-white/45"}`}>Service Required</label>
                      <select className={`w-full px-3 py-2.5 text-[13px] rounded-xl border ${
                        isLightMode ? "bg-[#F7F4EE] border-[#DED9CF] text-[#111116]" : "bg-[#1C1C2B] border-white/15 text-white"
                      }`}>
                        <option className={isLightMode ? "bg-white text-[#111116]" : "bg-[#0B0B14] text-white"}>Full Service Package</option>
                        <option className={isLightMode ? "bg-white text-[#111116]" : "bg-[#0B0B14] text-white"}>Partial Service</option>
                        <option className={isLightMode ? "bg-white text-[#111116]" : "bg-[#0B0B14] text-white"}>Consultation Only</option>
                      </select>
                    </div>
                    <button className="btn-gold-champagne w-full py-4 rounded-2xl font-bold text-[15px] justify-center">
                      Confirm Booking
                    </button>
                  </div>
                </div>
              )}

              {view === "products" && (
                <div className="px-6 pb-8 animate-fade-in">
                  <button onClick={() => setView("landing")} className={`flex items-center gap-1.5 text-[12px] font-bold mb-5 ${isLightMode ? "text-[#6F6B66]" : "text-white/55"}`}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 3L5 7l4 4"/></svg>
                    Back
                  </button>
                  <h3 className="font-serif font-bold text-[18px] mb-5">Order Products</h3>
                  <div className="space-y-3">
                    {[
                      { name: "Starter Platter", price: "₹450/plate", icon: "🥗" },
                      { name: "Main Course", price: "₹650/plate", icon: "🍛" },
                      { name: "Dessert Spread", price: "₹280/plate", icon: "🍰" },
                      { name: "Beverages Pack", price: "₹180/person", icon: "🥤" },
                    ].map((p) => (
                      <div key={p.name} className={`rounded-xl px-4 py-3 border flex items-center gap-3 ${
                        isLightMode ? "bg-[#F7F4EE] border-[#DED9CF]" : "bg-[#1C1C2B] border-white/10"
                      }`}>
                        <span className="text-xl">{p.icon}</span>
                        <div className="flex-1">
                          <div className="text-[13px] font-bold">{p.name}</div>
                          <div className={`text-[11px] font-medium ${isLightMode ? "text-[#6F6B66]" : "text-white/45"}`}>{p.price}</div>
                        </div>
                        <button className="btn-gold-champagne !w-7 !h-7 !p-0 rounded-full flex items-center justify-center text-[#111116] font-bold">+</button>
                      </div>
                    ))}
                  </div>
                  <button className="mt-5 btn-gold-champagne w-full py-3.5 rounded-full font-bold text-[15px] justify-center">
                    Place Order →
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* QR analytics panel */}
          <div className="flex-1 max-w-sm space-y-4">
            <div className={`rounded-3xl p-6 border ${
              isLightMode ? "bg-white border-[#DED9CF] shadow-sm text-[#111116]" : "bg-[#151522] border-white/10 text-white"
            }`}>
              <h3 className="font-serif font-bold text-[18px] mb-5">QR Analytics</h3>
              <div className="space-y-4">
                {[
                  { label: "Total Scans Today", value: "47", icon: "📱", color: "#B89B5E" },
                  { label: "Bookings via QR", value: "12", icon: "📋", color: "#10B981" },
                  { label: "Product Orders", value: "8", icon: "🛒", color: "#B89B5E" },
                  { label: "Conversion Rate", value: "25.5%", icon: "📈", color: "#0EA5E9" },
                ].map((s) => (
                  <div key={s.label} className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center text-[16px]"
                      style={{ background: isLightMode ? "#F7F4EE" : `${s.color}20` }}>{s.icon}</div>
                    <span className={`flex-1 text-[13px] font-medium ${isLightMode ? "text-[#6F6B66]" : "text-white/65"}`}>{s.label}</span>
                    <span className="font-mono font-extrabold text-[16px]" style={{ color: s.color }}>{s.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={`rounded-3xl p-5 border ${
              isLightMode ? "bg-white border-[#DED9CF] shadow-sm text-[#111116]" : "bg-[#151522] border-white/10 text-white"
            }`}>
              <h3 className={`font-serif font-bold text-[15px] mb-3 ${isLightMode ? "text-[#6F6B66]" : "text-white/60"}`}>Top Scan Locations</h3>
              {["Wedding - Gupta Event", "Corporate - TechCorp", "Birthday - Sharma Party"].map((l, i) => (
                <div key={l} className={`flex items-center gap-3 py-2 border-b last:border-0 ${
                  isLightMode ? "border-[#DED9CF]" : "border-white/10"
                }`}>
                  <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-extrabold text-[#111116] bg-gradient-to-br from-[#E8C98A] to-[#B89B5E] shadow-sm">{i + 1}</span>
                  <span className={`text-[12px] font-medium flex-1 ${isLightMode ? "text-[#111116]" : "text-white/65"}`}>{l}</span>
                  <span className="text-[11px] font-bold text-[#B89B5E]">{ [47, 31, 28][i]} scans</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
