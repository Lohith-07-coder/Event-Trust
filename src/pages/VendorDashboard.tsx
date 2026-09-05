import { useState } from "react";

const earningsData = [
  { month: "Apr", amount: 48000 },
  { month: "May", amount: 62000 },
  { month: "Jun", amount: 95000 },
  { month: "Jul", amount: 78000 },
  { month: "Aug", amount: 112000 },
  { month: "Sep", amount: 89000 },
];

const maxEarnings = Math.max(...earningsData.map((d) => d.amount));

const todayBookings = [
  { event: "Gupta Wedding", time: "10:00 AM", guests: 450, amount: 85000, status: "confirmed" },
  { event: "TechCorp Annual Gala", time: "6:00 PM", guests: 200, amount: 42000, status: "progress" },
];

const reviews = [
  { client: "Priya S.", rating: 5, date: "Sep 01", comment: "Absolutely stunning decor. Every guest was amazed!" },
  { client: "Rahul M.", rating: 5, date: "Aug 25", comment: "Professional, on-time, and exceeded all expectations." },
  { client: "Kavitha I.", rating: 4, date: "Aug 18", comment: "Beautiful setup. Minor delay but overall great service." },
];

const qrScans = [
  { date: "Sep 04", scans: 47, conversions: 12 },
  { date: "Sep 03", scans: 31, conversions: 8 },
  { date: "Sep 02", scans: 62, conversions: 19 },
  { date: "Sep 01", scans: 28, conversions: 7 },
];

const portfolio = [
  { title: "Royal Wedding Setup", type: "Wedding", img: "1519167758481-83f550bb49b3" },
  { title: "Corporate Gala Decor", type: "Corporate", img: "1464366400600-ac2779b46d32" },
  { title: "Birthday Wonderland", type: "Birthday", img: "1507525428034-b723cf961d3e" },
  { title: "Engagement Ceremony", type: "Engagement", img: "1519225421980-1bb2832ac795" },
];

const calendarDays = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  booked: [3, 7, 8, 15, 16, 21, 22, 23, 28].includes(i + 1),
  pending: [10, 25, 29].includes(i + 1),
}));

export default function VendorDashboard({ isLightMode = false }: { isLightMode?: boolean }) {
  const [activeTab, setActiveTab] = useState("Today");
  const tabs = ["Today", "Earnings", "Calendar", "QR Analytics", "BrandWorks", "Reviews", "Portfolio"];

  return (
    <div className={`min-h-screen pt-8 pb-20 px-6 transition-colors duration-300 ${
      isLightMode ? "bg-[#F7F4EE] text-[#111116]" : "bg-[#0B0B14] text-[#F7F4EE]"
    }`}>
      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="flex flex-wrap items-center gap-5 mb-8">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center font-serif font-bold text-xl text-[#111116] shadow-md grad-champagne">
            BD
          </div>
          <div>
            <h1 className={`font-serif font-bold text-3xl ${isLightMode ? "text-[#111116]" : "text-white"}`}>Bliss Decor Studio</h1>
            <p className={`text-[13px] font-medium ${isLightMode ? "text-[#6F6B66]" : "text-white/50"}`}>Vendor Dashboard · Delhi · ★ 4.8 (215 reviews)</p>
          </div>
          <div className="ml-auto flex gap-3">
            {[
              { label: "This Month", value: "₹89K" },
              { label: "Active Bookings", value: "6" },
              { label: "Completion Rate", value: "98%" },
            ].map((s) => (
              <div key={s.label} className={`rounded-2xl px-4 py-2.5 text-center border ${
                isLightMode ? "bg-white border-[#DED9CF] text-[#111116]" : "bg-[#151522] border-white/10"
              }`}>
                <div className="font-serif font-bold text-[18px] text-[#B89B5E]">{s.value}</div>
                <div className={`text-[11px] font-semibold uppercase tracking-wider ${isLightMode ? "text-[#6F6B66]" : "text-white/40"}`}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto mb-8 pb-1">
          {tabs.map((t) => {
            const isActive = activeTab === t;
            return (
              <button key={t} onClick={() => setActiveTab(t)}
                className={`px-5 py-2.5 rounded-full text-[13px] font-bold whitespace-nowrap border transition-all shrink-0 ${
                  isLightMode
                    ? isActive
                      ? "bg-[#B89B5E] text-[#111116] border-[#B89B5E] shadow-sm"
                      : "bg-white border-[#DED9CF] text-[#6F6B66] hover:bg-[#E8C98A]/20"
                    : isActive
                      ? "btn-gold-champagne"
                      : "text-white/60 border-white/10 hover:border-[#B89B5E]/50 hover:text-white bg-[#151522]"
                }`}>
                {t}
              </button>
            );
          })}
        </div>

        {/* Today's Bookings */}
        {activeTab === "Today" && (
          <div className="animate-fade-in space-y-5">
            <h2 className={`font-serif font-bold text-[20px] mb-2 ${isLightMode ? "text-[#111116]" : "text-white"}`}>Today&apos;s Bookings — Sep 5, 2025</h2>
            {todayBookings.map((b) => (
              <div key={b.event} className={`rounded-3xl p-6 border transition-all hover:shadow-lg ${
                isLightMode ? "bg-white border-[#DED9CF] text-[#111116]" : "bg-[#151522] border-white/10 text-white"
              }`}>
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <div>
                    <h3 className="font-serif font-bold text-[18px]">{b.event}</h3>
                    <p className={`text-[13px] font-medium ${isLightMode ? "text-[#6F6B66]" : "text-white/50"}`}>🕐 {b.time} · 👥 {b.guests} guests</p>
                  </div>
                  <div className="text-right">
                    <div className="font-serif font-bold text-[20px] text-[#B89B5E]">₹{(b.amount / 1000).toFixed(0)}K</div>
                    <span className="text-[12px] font-bold text-emerald-600">
                      {b.status === "confirmed" ? "✓ Confirmed" : "⟳ Setting up"}
                    </span>
                  </div>
                </div>
                <div className="flex gap-3 mt-4">
                  <button className={`px-5 py-2 rounded-full text-[13px] font-bold transition-all border ${
                    isLightMode ? "bg-[#F7F4EE] border-[#DED9CF] text-[#111116] hover:bg-[#E8C98A]/20" : "bg-white/10 border-white/15 text-white"
                  }`}>
                    View Details
                  </button>
                  <button className="btn-gold-champagne px-5 py-2 rounded-full text-[13px] font-bold">
                    Mark Complete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Earnings */}
        {activeTab === "Earnings" && (
          <div className="animate-fade-in space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "This Month", value: "₹89K", delta: "+18%", positive: true },
                { label: "Last Month", value: "₹1.12L", delta: "-9%", positive: false },
                { label: "YTD Total", value: "₹4.84L", delta: "+32%", positive: true },
                { label: "Avg Per Event", value: "₹62K", delta: "+5%", positive: true },
              ].map((s) => (
                <div key={s.label} className={`rounded-2xl p-5 border ${
                  isLightMode ? "bg-white border-[#DED9CF] text-[#111116]" : "bg-[#151522] border-white/10"
                }`}>
                  <div className={`text-[12px] font-medium mb-1 ${isLightMode ? "text-[#6F6B66]" : "text-white/45"}`}>{s.label}</div>
                  <div className={`font-serif font-bold text-[24px] ${isLightMode ? "text-[#111116]" : "text-white"}`}>{s.value}</div>
                  <div className={`text-[11px] font-semibold mt-1 ${s.positive ? "text-emerald-600" : "text-rose-600"}`}>{s.delta} vs prev</div>
                </div>
              ))}
            </div>
            {/* Bar chart */}
            <div className={`rounded-3xl p-6 border ${
              isLightMode ? "bg-white border-[#DED9CF] text-[#111116]" : "bg-[#151522] border-white/10"
            }`}>
              <h3 className={`font-serif font-bold text-[16px] mb-5 ${isLightMode ? "text-[#111116]" : "text-white"}`}>Monthly Earnings (₹)</h3>
              <div className="flex items-end gap-3 h-40">
                {earningsData.map((d) => (
                  <div key={d.month} className="flex-1 flex flex-col items-center gap-2">
                    <div className={`text-[11px] font-medium ${isLightMode ? "text-[#6F6B66]" : "text-white/50"}`}>₹{(d.amount / 1000).toFixed(0)}K</div>
                    <div className="w-full rounded-t-lg transition-all"
                      style={{ height: `${(d.amount / maxEarnings) * 100}%`, background: "linear-gradient(to top, #B89B5E, #E8C98A)", minHeight: 8 }}/>
                    <div className={`text-[11px] font-medium ${isLightMode ? "text-[#6F6B66]" : "text-white/40"}`}>{d.month}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Calendar */}
        {activeTab === "Calendar" && (
          <div className="animate-fade-in">
            <div className={`rounded-3xl p-6 border ${
              isLightMode ? "bg-white border-[#DED9CF] text-[#111116]" : "bg-[#151522] border-white/10"
            }`}>
              <h2 className="font-serif font-bold text-[20px] mb-5">September 2025</h2>
              <div className="grid grid-cols-7 gap-1.5 mb-2">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                  <div key={d} className={`text-center text-[11px] font-bold py-1 ${isLightMode ? "text-[#6F6B66]" : "text-white/35"}`}>{d}</div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1.5">
                {calendarDays.map((d) => (
                  <div key={d.day}
                    className={`aspect-square rounded-xl flex items-center justify-center text-[13px] font-medium transition-all cursor-pointer ${
                      d.booked 
                        ? "text-[#111116] font-bold shadow-sm grad-champagne" 
                        : d.pending 
                          ? isLightMode ? "text-[#B89B5E] bg-[#E8C98A]/20 border border-[#B89B5E]/30 font-semibold" : "text-[#E8C98A] border border-[#B89B5E]/30" 
                          : isLightMode ? "text-[#6F6B66] bg-[#F7F4EE] border border-[#DED9CF] hover:bg-[#E8C98A]/10" : "text-white/40 bg-white/5 border border-white/6 hover:border-white/20"
                    }`}>
                    {d.day}
                  </div>
                ))}
              </div>
              <div className="flex gap-4 mt-4 text-[12px]">
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-md grad-champagne"/><span className={isLightMode ? "text-[#6F6B66]" : "text-white/55"}>Booked</span></div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-md bg-[#E8C98A]/40 border border-[#B89B5E]/30"/><span className={isLightMode ? "text-[#6F6B66]" : "text-white/55"}>Pending</span></div>
                <div className="flex items-center gap-2"><div className={`w-3 h-3 rounded-md ${isLightMode ? "bg-[#F7F4EE] border border-[#DED9CF]" : "bg-white/8"}`}/><span className={isLightMode ? "text-[#6F6B66]" : "text-white/55"}>Available</span></div>
              </div>
            </div>
          </div>
        )}

        {/* QR Analytics */}
        {activeTab === "QR Analytics" && (
          <div className="animate-fade-in space-y-5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-2">
              {[
                { label: "Total QR Scans", value: "1,284", icon: "📱" },
                { label: "Bookings via QR", value: "342", icon: "📋" },
                { label: "Conversion Rate", value: "26.6%", icon: "📈" },
                { label: "QR Revenue", value: "₹2.1L", icon: "💰" },
              ].map((s) => (
                <div key={s.label} className={`rounded-2xl p-5 border ${
                  isLightMode ? "bg-white border-[#DED9CF] text-[#111116]" : "bg-[#151522] border-white/10"
                }`}>
                  <div className="text-2xl mb-2">{s.icon}</div>
                  <div className="font-serif font-bold text-[24px] text-[#B89B5E]">{s.value}</div>
                  <div className={`text-[12px] font-medium mt-1 ${isLightMode ? "text-[#6F6B66]" : "text-white/45"}`}>{s.label}</div>
                </div>
              ))}
            </div>
            <div className={`rounded-3xl p-6 border ${
              isLightMode ? "bg-white border-[#DED9CF] text-[#111116]" : "bg-[#151522] border-white/10"
            }`}>
              <h3 className={`font-serif font-bold text-[16px] mb-4 ${isLightMode ? "text-[#111116]" : "text-white"}`}>Recent QR Activity</h3>
              <div className="space-y-3">
                {qrScans.map((q) => (
                  <div key={q.date} className="flex items-center gap-4">
                    <span className={`text-[13px] font-medium w-16 ${isLightMode ? "text-[#6F6B66]" : "text-white/50"}`}>{q.date}</span>
                    <div className={`flex-1 h-2 rounded-full overflow-hidden ${isLightMode ? "bg-[#F7F4EE]" : "bg-white/8"}`}>
                      <div className="h-full rounded-full grad-champagne" style={{ width: `${(q.scans / 70) * 100}%` }}/>
                    </div>
                    <span className={`text-[13px] font-semibold w-12 ${isLightMode ? "text-[#111116]" : "text-white"}`}>{q.scans}</span>
                    <span className="text-[12px] font-bold text-emerald-600 w-12">{q.conversions} ✓</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Reviews */}
        {activeTab === "Reviews" && (
          <div className="animate-fade-in space-y-4">
            {reviews.map((r, i) => (
              <div key={i} className={`rounded-3xl p-6 border ${
                isLightMode ? "bg-white border-[#DED9CF] text-[#111116]" : "bg-[#151522] border-white/10"
              }`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center font-serif font-bold text-[13px] text-[#111116] shadow-sm grad-champagne">{r.client[0]}</div>
                    <span className={`font-serif font-bold text-[16px] ${isLightMode ? "text-[#111116]" : "text-white"}`}>{r.client}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#B89B5E]">{"★".repeat(r.rating)}</span>
                    <span className={`text-[12px] font-medium ${isLightMode ? "text-[#6F6B66]" : "text-white/30"}`}>{r.date}</span>
                  </div>
                </div>
                <p className={`text-[14px] leading-relaxed font-medium ${isLightMode ? "text-[#6F6B66]" : "text-white/65"}`}>&ldquo;{r.comment}&rdquo;</p>
              </div>
            ))}
          </div>
        )}

        {/* Portfolio */}
        {activeTab === "Portfolio" && (
          <div className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {portfolio.map((p) => (
                <div key={p.title} className={`rounded-3xl overflow-hidden border transition-all hover:shadow-lg ${
                  isLightMode ? "bg-white border-[#DED9CF]" : "bg-[#151522] border-white/10"
                }`}>
                  <img src={`https://images.unsplash.com/photo-${p.img}?w=600&h=350&fit=crop&auto=format`}
                    alt={p.title} className="w-full h-52 object-cover"/>
                  <div className="p-5 flex items-center justify-between">
                    <div>
                      <h3 className={`font-serif font-bold text-[16px] ${isLightMode ? "text-[#111116]" : "text-white"}`}>{p.title}</h3>
                      <p className={`text-[12px] font-medium ${isLightMode ? "text-[#6F6B66]" : "text-white/45"}`}>{p.type}</p>
                    </div>
                    <button className="text-[12px] font-bold text-[#B89B5E] hover:underline">Full View →</button>
                  </div>
                </div>
              ))}
              <button className={`rounded-3xl border-2 border-dashed h-64 flex flex-col items-center justify-center gap-3 transition-all ${
                isLightMode ? "bg-[#F7F4EE] border-[#DED9CF] text-[#6F6B66] hover:text-[#111116] hover:border-[#B89B5E]" : "bg-[#151522] border-white/15 text-white/40 hover:text-white/70 hover:border-white/30"
              }`}>
                <div className="text-4xl text-[#B89B5E]">+</div>
                <span className="text-[13px] font-bold">Add Portfolio Item</span>
              </button>
            </div>
          </div>
        )}

        {/* BrandWorks */}
        {activeTab === "BrandWorks" && (
          <div className="animate-fade-in space-y-5">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { id: "BOT001", product: "Custom Branded Bottle", qty: 500, status: "printing", amount: 18500 },
                { id: "BOT002", product: "Logo Cups (Set of 200)", qty: 200, status: "delivered", amount: 6200 },
                { id: "BOT003", product: "Tissue Packs — Branded", qty: 1000, status: "pending", amount: 12000 },
              ].map((o) => (
                <div key={o.id} className={`rounded-2xl p-5 border ${
                  isLightMode ? "bg-white border-[#DED9CF] text-[#111116]" : "bg-[#151522] border-white/10"
                }`}>
                  <div className={`font-mono text-[11px] font-bold mb-2 ${isLightMode ? "text-[#6F6B66]" : "text-white/35"}`}>{o.id}</div>
                  <h3 className={`font-serif font-bold text-[16px] mb-1 ${isLightMode ? "text-[#111116]" : "text-white"}`}>{o.product}</h3>
                  <p className={`text-[12px] font-medium mb-3 ${isLightMode ? "text-[#6F6B66]" : "text-white/50"}`}>Qty: {o.qty}</p>
                  <div className="flex items-center justify-between">
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                      o.status === "delivered" 
                        ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/30" 
                        : o.status === "printing" 
                          ? "bg-sky-500/10 text-sky-600 border border-sky-500/30" 
                          : "bg-amber-500/10 text-amber-600 border border-amber-500/30"
                    }`}>
                      {o.status}
                    </span>
                    <span className="text-[#B89B5E] font-serif font-bold text-[15px]">₹{o.amount.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
