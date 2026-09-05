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

export default function VendorDashboard() {
  const [activeTab, setActiveTab] = useState("Today");
  const tabs = ["Today", "Earnings", "Calendar", "QR Analytics", "BrandWorks", "Reviews", "Portfolio"];

  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="flex flex-wrap items-center gap-5 mb-8">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center font-display font-700 text-xl text-white"
            style={{ background: "linear-gradient(135deg, #10B981, #0EA5E9)" }}>
            BD
          </div>
          <div>
            <h1 className="font-display font-700 text-2xl text-white">Bliss Decor Studio</h1>
            <p className="text-white/50 text-[13px]">Vendor Dashboard · Delhi · ★ 4.8 (215 reviews)</p>
          </div>
          <div className="ml-auto flex gap-3">
            {[
              { label: "This Month", value: "₹89K" },
              { label: "Active Bookings", value: "6" },
              { label: "Completion Rate", value: "98%" },
            ].map((s) => (
              <div key={s.label} className="glass rounded-xl px-4 py-2.5 text-center border border-white/10">
                <div className="font-display font-700 text-[18px] grad-primary">{s.value}</div>
                <div className="text-[11px] text-white/40">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 overflow-x-auto mb-8 pb-1">
          {tabs.map((t) => (
            <button key={t} onClick={() => setActiveTab(t)}
              className={`px-5 py-2.5 rounded-xl text-[13px] font-medium whitespace-nowrap border transition-all shrink-0 ${
                activeTab === t ? "tab-active border-purple-500/40" : "text-white/55 border-white/8 hover:border-white/20 hover:text-white glass"
              }`}>
              {t}
            </button>
          ))}
        </div>

        {/* Today's Bookings */}
        {activeTab === "Today" && (
          <div className="animate-fade-in space-y-5">
            <h2 className="font-display font-600 text-[17px] mb-2">Today&apos;s Bookings — Sep 5, 2025</h2>
            {todayBookings.map((b) => (
              <div key={b.event} className="glass rounded-2xl p-6 border border-white/10">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <div>
                    <h3 className="font-display font-600 text-[16px] text-white">{b.event}</h3>
                    <p className="text-white/50 text-[13px]">🕐 {b.time} · 👥 {b.guests} guests</p>
                  </div>
                  <div className="text-right">
                    <div className="font-display font-700 text-[18px]" style={{ color: "#10B981" }}>₹{(b.amount / 1000).toFixed(0)}K</div>
                    <span className={`text-[12px] font-medium ${b.status === "confirmed" ? "text-green-400" : "text-purple-400"}`}>
                      {b.status === "confirmed" ? "✓ Confirmed" : "⟳ Setting up"}
                    </span>
                  </div>
                </div>
                <div className="flex gap-3 mt-4">
                  <button className="px-4 py-2 rounded-xl text-[13px] font-medium text-white border border-white/15 hover:border-white/35 glass transition-all">
                    View Details
                  </button>
                  <button className="px-4 py-2 rounded-xl text-[13px] font-medium text-white"
                    style={{ background: "linear-gradient(135deg, #6A38FF, #8B5CF6)" }}>
                    Mark Complete
                  </button>
                </div>
              </div>
            ))}
            <div className="glass rounded-2xl p-6 border border-amber-500/20">
              <h3 className="font-600 text-[14px] text-amber-400 mb-2">📋 Manager Notes</h3>
              <p className="text-white/65 text-[13px]">Gupta Wedding — Bride prefers pastel pink & white theme. Phoolon ki Chaadar arrangement required. Confirm with manager Rohan by 9 AM.</p>
            </div>
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
                <div key={s.label} className="glass rounded-2xl p-5 border border-white/10">
                  <div className="text-[12px] text-white/45 mb-1">{s.label}</div>
                  <div className="font-display font-700 text-[22px] text-white">{s.value}</div>
                  <div className={`text-[11px] font-medium mt-1 ${s.positive ? "text-green-400" : "text-red-400"}`}>{s.delta} vs prev</div>
                </div>
              ))}
            </div>
            {/* Bar chart */}
            <div className="glass rounded-2xl p-6 border border-white/10">
              <h3 className="font-600 text-[14px] text-white/60 mb-5">Monthly Earnings (₹)</h3>
              <div className="flex items-end gap-3 h-40">
                {earningsData.map((d) => (
                  <div key={d.month} className="flex-1 flex flex-col items-center gap-2">
                    <div className="text-[11px] text-white/50">₹{(d.amount / 1000).toFixed(0)}K</div>
                    <div className="w-full rounded-t-lg transition-all"
                      style={{ height: `${(d.amount / maxEarnings) * 100}%`, background: "linear-gradient(to top, #6A38FF, #8B5CF6)", minHeight: 8 }}/>
                    <div className="text-[11px] text-white/40">{d.month}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Calendar */}
        {activeTab === "Calendar" && (
          <div className="animate-fade-in">
            <div className="glass rounded-2xl p-6 border border-white/10">
              <h2 className="font-display font-600 text-[17px] mb-5">September 2025</h2>
              <div className="grid grid-cols-7 gap-1.5 mb-2">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                  <div key={d} className="text-center text-[11px] text-white/35 py-1">{d}</div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1.5">
                {/* offset for Sep starting on Monday */}
                {calendarDays.map((d) => (
                  <div key={d.day}
                    className={`aspect-square rounded-xl flex items-center justify-center text-[13px] font-medium transition-all cursor-pointer ${
                      d.booked ? "text-white glow-primary" : d.pending ? "text-amber-400 border border-amber-500/30" : "text-white/40 glass border border-white/6 hover:border-white/20"
                    }`}
                    style={d.booked ? { background: "linear-gradient(135deg, #6A38FF, #8B5CF6)" } : d.pending ? { background: "rgba(245,158,11,0.15)" } : {}}>
                    {d.day}
                  </div>
                ))}
              </div>
              <div className="flex gap-4 mt-4 text-[12px]">
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-md" style={{ background: "linear-gradient(135deg, #6A38FF, #8B5CF6)" }}/><span className="text-white/55">Booked</span></div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-md bg-amber-500/40"/><span className="text-white/55">Pending</span></div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-md bg-white/8"/><span className="text-white/55">Available</span></div>
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
                <div key={s.label} className="glass rounded-2xl p-5 border border-white/10">
                  <div className="text-2xl mb-2">{s.icon}</div>
                  <div className="font-display font-700 text-[22px] grad-primary">{s.value}</div>
                  <div className="text-[12px] text-white/45 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
            <div className="glass rounded-2xl p-6 border border-white/10">
              <h3 className="font-600 text-[14px] text-white/60 mb-4">Recent QR Activity</h3>
              <div className="space-y-3">
                {qrScans.map((q) => (
                  <div key={q.date} className="flex items-center gap-4">
                    <span className="text-[13px] text-white/50 w-16">{q.date}</span>
                    <div className="flex-1 h-2 bg-white/8 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${(q.scans / 70) * 100}%`, background: "linear-gradient(90deg, #6A38FF, #8B5CF6)" }}/>
                    </div>
                    <span className="text-[13px] text-white font-medium w-12">{q.scans}</span>
                    <span className="text-[12px] text-green-400 w-12">{q.conversions} ✓</span>
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
              <div key={i} className="glass rounded-2xl p-6 border border-white/10">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center font-semibold text-[13px] text-white"
                      style={{ background: "linear-gradient(135deg, #6A38FF, #8B5CF6)" }}>{r.client[0]}</div>
                    <span className="font-medium text-white text-[14px]">{r.client}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-amber-400">{"★".repeat(r.rating)}</span>
                    <span className="text-white/30 text-[12px]">{r.date}</span>
                  </div>
                </div>
                <p className="text-white/65 text-[13px] leading-relaxed">&ldquo;{r.comment}&rdquo;</p>
              </div>
            ))}
          </div>
        )}

        {/* Portfolio */}
        {activeTab === "Portfolio" && (
          <div className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {portfolio.map((p) => (
                <div key={p.title} className="glass rounded-3xl overflow-hidden border border-white/10 hover-lift">
                  <img src={`https://images.unsplash.com/photo-${p.img}?w=600&h=350&fit=crop&auto=format`}
                    alt={p.title} className="w-full h-52 object-cover"/>
                  <div className="p-5 flex items-center justify-between">
                    <div>
                      <h3 className="font-display font-600 text-[15px] text-white">{p.title}</h3>
                      <p className="text-white/45 text-[12px]">{p.type}</p>
                    </div>
                    <button className="text-[12px] text-purple-400 hover:text-purple-300">Full View →</button>
                  </div>
                </div>
              ))}
              <button className="glass rounded-3xl border-2 border-dashed border-white/15 h-64 flex flex-col items-center justify-center gap-3 text-white/40 hover:text-white/70 hover:border-white/30 transition-all">
                <div className="text-4xl">+</div>
                <span className="text-[13px]">Add Portfolio Item</span>
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
                <div key={o.id} className="glass rounded-2xl p-5 border border-white/10">
                  <div className="font-mono text-[11px] text-white/35 mb-2">{o.id}</div>
                  <h3 className="font-600 text-[14px] text-white mb-1">{o.product}</h3>
                  <p className="text-white/50 text-[12px] mb-3">Qty: {o.qty}</p>
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${o.status === "delivered" ? "status-complete" : o.status === "printing" ? "status-progress" : "status-new"}`}>
                      {o.status}
                    </span>
                    <span className="text-green-400 font-semibold text-[13px]">₹{o.amount.toLocaleString()}</span>
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
