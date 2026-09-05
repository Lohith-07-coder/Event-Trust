import { useState } from "react";

export default function SmartQR() {
  const [activeVendor, setActiveVendor] = useState("ABC Catering");
  const [view, setView] = useState<"landing" | "products" | "booking">("landing");

  const vendors = ["ABC Catering", "Bliss Decor Studio", "DJ Karan Pro", "Frames & Moments"];

  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-[1440px] mx-auto">
        <div className="text-center mb-10">
          <h1 className="font-display font-700 text-3xl md:text-4xl mb-2">
            Smart <span className="grad-primary">QR System</span>
          </h1>
          <p className="text-white/50 text-[14px]">Vendor QR landing pages — scan to book instantly</p>
        </div>

        {/* Vendor selector */}
        <div className="flex gap-2 justify-center overflow-x-auto pb-2 mb-10">
          {vendors.map((v) => (
            <button key={v} onClick={() => { setActiveVendor(v); setView("landing"); }}
              className={`px-4 py-2.5 rounded-xl text-[13px] font-medium whitespace-nowrap border transition-all shrink-0 ${
                activeVendor === v ? "tab-active border-purple-500/40" : "text-white/55 border-white/12 glass hover:border-white/25"
              }`}>
              {v}
            </button>
          ))}
        </div>

        {/* Phone mockup */}
        <div className="flex flex-col lg:flex-row gap-10 items-start justify-center">
          <div className="relative mx-auto lg:mx-0" style={{ maxWidth: 340 }}>
            {/* Neon rings */}
            <div className="absolute inset-0 rounded-[44px] qr-glow pointer-events-none"/>
            <div className="glass rounded-[44px] overflow-hidden border border-white/20 min-h-[600px]">
              {/* Status bar */}
              <div className="px-6 py-3 flex items-center justify-between text-[11px] text-white/60">
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
                    <div className="w-24 h-24 rounded-3xl mx-auto flex items-center justify-center text-4xl mb-4 glow-primary"
                      style={{ background: "linear-gradient(135deg, #6A38FF, #8B5CF6)" }}>
                      {activeVendor.includes("Catering") ? "🍽️" : activeVendor.includes("Decor") ? "🌸" : activeVendor.includes("DJ") ? "🎵" : "📸"}
                    </div>
                    <h2 className="font-display font-700 text-[22px] text-white">
                      Welcome to<br/>
                      <span className="grad-primary">{activeVendor}</span>
                    </h2>
                    <div className="flex items-center justify-center gap-2 mt-2">
                      <span className="status-confirmed px-2.5 py-1 rounded-full text-[11px]">✓ EVENTTRUST Verified</span>
                    </div>
                    <div className="text-amber-400 font-semibold text-[14px] mt-2">★ 4.9 · 342 reviews</div>
                  </div>

                  {/* QR code (decorative) */}
                  <div className="flex justify-center mb-8">
                    <div className="glass rounded-2xl p-4 border border-white/15 qr-glow">
                      <div className="w-32 h-32 bg-white rounded-xl p-2">
                        <div className="w-full h-full grid grid-cols-8 gap-0.5">
                          {Array.from({ length: 64 }).map((_, i) => (
                            <div key={i} className="rounded-sm" style={{
                              background: [0,1,2,3,4,5,6,8,14,16,22,24,30,32,33,34,35,36,37,38,39,40,46,48,54,56,57,58,59,60,61,62,63].includes(i) ? "#05010A" : "white"
                            }}/>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Main action buttons */}
                  <div className="space-y-4">
                    <button onClick={() => setView("booking")}
                      className="w-full py-4 rounded-2xl font-semibold text-white text-[16px] glow-primary flex items-center justify-center gap-3"
                      style={{ background: "linear-gradient(135deg, #6A38FF, #8B5CF6)" }}>
                      📋 Book Vendor
                    </button>
                    <button onClick={() => setView("products")}
                      className="w-full py-4 rounded-2xl font-semibold text-[16px] flex items-center justify-center gap-3 glass border-2"
                      style={{ borderColor: "rgba(212,175,55,0.5)", color: "#D4AF37" }}>
                      🛒 Order Products
                    </button>
                  </div>

                  <div className="flex gap-4 mt-6">
                    <button className="flex-1 py-2.5 rounded-xl glass border border-white/12 text-[13px] text-white/60 hover:text-white">
                      📞 Call
                    </button>
                    <button className="flex-1 py-2.5 rounded-xl glass border border-green-500/30 text-[13px] text-green-400">
                      💬 WhatsApp
                    </button>
                    <button className="flex-1 py-2.5 rounded-xl glass border border-white/12 text-[13px] text-white/60 hover:text-white">
                      🌐 Website
                    </button>
                  </div>
                </div>
              )}

              {view === "booking" && (
                <div className="px-6 pb-8 animate-fade-in">
                  <button onClick={() => setView("landing")} className="flex items-center gap-1.5 text-[12px] text-white/55 mb-5">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 3L5 7l4 4"/></svg>
                    Back
                  </button>
                  <h3 className="font-display font-600 text-[18px] text-white mb-5">Book {activeVendor}</h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-[11px] text-white/45 mb-1.5">Event Date</label>
                      <input type="date" className="input-glass w-full px-3 py-2.5 text-[13px]"/>
                    </div>
                    <div>
                      <label className="block text-[11px] text-white/45 mb-1.5">Guest Count</label>
                      <input type="number" placeholder="e.g. 200" className="input-glass w-full px-3 py-2.5 text-[13px]"/>
                    </div>
                    <div>
                      <label className="block text-[11px] text-white/45 mb-1.5">Service Required</label>
                      <select className="input-glass w-full px-3 py-2.5 text-[13px] bg-transparent">
                        <option>Full Service Package</option>
                        <option>Partial Service</option>
                        <option>Consultation Only</option>
                      </select>
                    </div>
                    <button className="w-full py-4 rounded-2xl font-semibold text-white glow-primary"
                      style={{ background: "linear-gradient(135deg, #6A38FF, #8B5CF6)" }}>
                      Confirm Booking
                    </button>
                  </div>
                </div>
              )}

              {view === "products" && (
                <div className="px-6 pb-8 animate-fade-in">
                  <button onClick={() => setView("landing")} className="flex items-center gap-1.5 text-[12px] text-white/55 mb-5">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 3L5 7l4 4"/></svg>
                    Back
                  </button>
                  <h3 className="font-display font-600 text-[18px] text-white mb-5">Order Products</h3>
                  <div className="space-y-3">
                    {[
                      { name: "Starter Platter", price: "₹450/plate", icon: "🥗" },
                      { name: "Main Course", price: "₹650/plate", icon: "🍛" },
                      { name: "Dessert Spread", price: "₹280/plate", icon: "🍰" },
                      { name: "Beverages Pack", price: "₹180/person", icon: "🥤" },
                    ].map((p) => (
                      <div key={p.name} className="glass rounded-xl px-4 py-3 border border-white/8 flex items-center gap-3">
                        <span className="text-xl">{p.icon}</span>
                        <div className="flex-1">
                          <div className="text-[13px] font-medium text-white">{p.name}</div>
                          <div className="text-[11px] text-white/45">{p.price}</div>
                        </div>
                        <button className="w-7 h-7 rounded-full flex items-center justify-center text-white font-semibold"
                          style={{ background: "linear-gradient(135deg, #6A38FF, #8B5CF6)" }}>+</button>
                      </div>
                    ))}
                  </div>
                  <button className="mt-5 w-full py-3.5 rounded-2xl font-semibold text-[15px]"
                    style={{ background: "linear-gradient(135deg, #D4AF37, #B8860B)", color: "#05010A" }}>
                    Place Order
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* QR analytics panel */}
          <div className="flex-1 max-w-sm space-y-4">
            <div className="glass rounded-2xl p-6 border border-white/10">
              <h3 className="font-display font-600 text-[16px] mb-5">QR Analytics</h3>
              <div className="space-y-4">
                {[
                  { label: "Total Scans Today", value: "47", icon: "📱", color: "#6A38FF" },
                  { label: "Bookings via QR", value: "12", icon: "📋", color: "#10B981" },
                  { label: "Product Orders", value: "8", icon: "🛒", color: "#D4AF37" },
                  { label: "Conversion Rate", value: "25.5%", icon: "📈", color: "#8B5CF6" },
                ].map((s) => (
                  <div key={s.label} className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center text-[16px]"
                      style={{ background: `${s.color}20` }}>{s.icon}</div>
                    <span className="flex-1 text-[13px] text-white/65">{s.label}</span>
                    <span className="font-display font-700 text-[16px]" style={{ color: s.color }}>{s.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass rounded-2xl p-5 border border-white/10">
              <h3 className="font-600 text-[14px] text-white/60 mb-3">Top Scan Locations</h3>
              {["Wedding - Gupta Event", "Corporate - TechCorp", "Birthday - Sharma Party"].map((l, i) => (
                <div key={l} className="flex items-center gap-3 py-2 border-b border-white/6 last:border-0">
                  <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                    style={{ background: "linear-gradient(135deg, #6A38FF, #8B5CF6)" }}>{i + 1}</span>
                  <span className="text-[12px] text-white/65 flex-1">{l}</span>
                  <span className="text-[11px] text-purple-400">{[47, 31, 28][i]} scans</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
