import { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const tabs = ["Overview", "My Bookings", "Budget", "Documents", "Memories", "Favorites"];

const upcomingEvents = [
  { name: "Priya & Arjun Wedding", date: "Oct 15, 2025", venue: "The Grand Pavilion", status: "confirmed", budget: 1800000, spent: 1200000 },
  { name: "Sharma Family Reunion", date: "Nov 2, 2025", venue: "Royal Terrace", status: "progress", budget: 400000, spent: 180000 },
];

const budgetData = [
  { name: "Venue", value: 540000, color: "#6A38FF" },
  { name: "Catering", value: 360000, color: "#8B5CF6" },
  { name: "Decor", value: 200000, color: "#0EA5E9" },
  { name: "Photography", value: 140000, color: "#10B981" },
  { name: "DJ & Music", value: 100000, color: "#F59E0B" },
  { name: "Remaining", value: 460000, color: "#374151" },
];

const notifications = [
  { type: "success", msg: "Catering confirmed by Spice & Aroma — Oct 15", time: "2h ago" },
  { type: "info", msg: "DJ Karan has sent a revised quote — please review", time: "5h ago" },
  { type: "warning", msg: "Venue requires final headcount by Sep 30", time: "1d ago" },
  { type: "success", msg: "Photography deposit paid ₹17,500", time: "2d ago" },
];

const favorites = [
  { name: "Bliss Decor Studio", type: "Decorator", rating: 4.8, img: "🌸" },
  { name: "Frames & Moments", type: "Photography", rating: 5.0, img: "📸" },
  { name: "DJ Karan Pro", type: "DJ & Music", rating: 4.7, img: "🎵" },
];

const memories = [
  { event: "Parents 25th Anniversary", date: "Mar 2024", photos: 342, highlight: "1519225421980-1bb2832ac795" },
  { event: "Cousin Riya Wedding", date: "Jan 2024", photos: 567, highlight: "1464366400600-ac2779b46d32" },
];

export default function ClientDashboard() {
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-[1440px] mx-auto">
        {/* Profile header */}
        <div className="flex flex-wrap items-center gap-5 mb-8">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center font-display font-700 text-xl text-white"
            style={{ background: "linear-gradient(135deg, #6A38FF, #8B5CF6)" }}>
            PS
          </div>
          <div>
            <h1 className="font-display font-700 text-2xl text-white">Priya Sharma</h1>
            <p className="text-white/50 text-[13px]">priya.sharma@email.com · Premium Client since 2023</p>
          </div>
          <div className="ml-auto flex gap-3">
            <div className="glass rounded-xl px-4 py-2.5 text-center border border-white/10">
              <div className="font-display font-700 text-[18px] grad-primary">3</div>
              <div className="text-[11px] text-white/40">Events</div>
            </div>
            <div className="glass rounded-xl px-4 py-2.5 text-center border border-white/10">
              <div className="font-display font-700 text-[18px] grad-primary">₹22L</div>
              <div className="text-[11px] text-white/40">Invested</div>
            </div>
            <div className="glass rounded-xl px-4 py-2.5 text-center border border-white/10">
              <div className="font-display font-700 text-[18px] text-amber-400">★ 4.9</div>
              <div className="text-[11px] text-white/40">Rating</div>
            </div>
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

        {/* Overview Tab */}
        {activeTab === "Overview" && (
          <div className="space-y-6 animate-fade-in">
            {/* Upcoming events */}
            <div>
              <h2 className="font-display font-600 text-[17px] mb-4">Upcoming Events</h2>
              <div className="space-y-4">
                {upcomingEvents.map((e) => (
                  <div key={e.name} className="glass rounded-2xl p-6 border border-white/10">
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                      <div>
                        <h3 className="font-display font-600 text-[16px] text-white">{e.name}</h3>
                        <p className="text-white/50 text-[13px] mt-0.5">📅 {e.date} · 📍 {e.venue}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-[12px] font-medium ${e.status === "confirmed" ? "status-confirmed" : "status-progress"}`}>
                        {e.status === "confirmed" ? "✓ Confirmed" : "⟳ In Progress"}
                      </span>
                    </div>
                    <div className="mb-2 flex justify-between text-[12px]">
                      <span className="text-white/50">Budget utilization</span>
                      <span className="text-white font-medium">₹{(e.spent / 100000).toFixed(1)}L / ₹{(e.budget / 100000).toFixed(1)}L</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full rounded-full progress-bar" style={{ width: `${(e.spent / e.budget) * 100}%` }}/>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick actions */}
            <div>
              <h2 className="font-display font-600 text-[17px] mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { icon: "📊", label: "Budget Planner", color: "#6A38FF" },
                  { icon: "📄", label: "My Documents", color: "#0EA5E9" },
                  { icon: "🔔", label: "Notifications", color: "#F59E0B" },
                  { icon: "💬", label: "Talk to Manager", color: "#10B981" },
                  { icon: "👨‍👩‍👧‍👦", label: "Family Assistant", color: "#EC4899" },
                  { icon: "📸", label: "Event Memories", color: "#8B5CF6" },
                  { icon: "❤️", label: "Favorites", color: "#EF4444" },
                  { icon: "💳", label: "Payments", color: "#D4AF37" },
                ].map((a) => (
                  <button key={a.label} onClick={() => setActiveTab(a.label.replace("My ", "").replace("Event ", "").replace(" Planner", "").replace("Notifications", "Overview"))}
                    className="glass rounded-2xl p-5 flex flex-col items-center gap-2.5 border border-white/8 hover:border-white/20 hover-lift transition-all">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                      style={{ background: `${a.color}25` }}>
                      {a.icon}
                    </div>
                    <span className="text-[12px] text-white/65 text-center">{a.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Notifications */}
            <div>
              <h2 className="font-display font-600 text-[17px] mb-4">Recent Notifications</h2>
              <div className="space-y-3">
                {notifications.map((n, i) => (
                  <div key={i} className="glass rounded-xl px-5 py-3.5 border border-white/8 flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm ${n.type === "success" ? "bg-green-500/20 text-green-400" : n.type === "warning" ? "bg-amber-500/20 text-amber-400" : "bg-blue-500/20 text-blue-400"}`}>
                      {n.type === "success" ? "✓" : n.type === "warning" ? "!" : "i"}
                    </div>
                    <p className="flex-1 text-[13px] text-white/70">{n.msg}</p>
                    <span className="text-[11px] text-white/30 shrink-0">{n.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Budget Tab */}
        {activeTab === "Budget" && (
          <div className="animate-fade-in space-y-6">
            <h2 className="font-display font-600 text-[17px] mb-2">Budget Overview — Priya & Arjun Wedding</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {[
                { label: "Total Budget", value: "₹18L", color: "text-white" },
                { label: "Spent", value: "₹12L", color: "text-red-400" },
                { label: "Remaining", value: "₹6L", color: "text-green-400" },
              ].map((s) => (
                <div key={s.label} className="glass rounded-2xl p-5 border border-white/10 text-center">
                  <div className={`font-display font-800 text-3xl ${s.color} mb-1`}>{s.value}</div>
                  <div className="text-white/50 text-[13px]">{s.label}</div>
                </div>
              ))}
            </div>
            <div className="glass rounded-2xl p-6 border border-white/10">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="w-full md:w-64 h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={budgetData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={2} dataKey="value">
                        {budgetData.map((entry, i) => <Cell key={i} fill={entry.color}/>)}
                      </Pie>
                      <Tooltip contentStyle={{ background: "rgba(13,8,24,0.95)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 12, fontSize: 12 }}
                        formatter={(v) => [`₹${((v as number) / 1000).toFixed(0)}K`, ""]}/>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex-1 space-y-3">
                  {budgetData.map((item) => (
                    <div key={item.name} className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full shrink-0" style={{ background: item.color }}/>
                      <span className="text-[13px] text-white/70 flex-1">{item.name}</span>
                      <span className="text-[13px] font-semibold text-white">₹{(item.value / 1000).toFixed(0)}K</span>
                      <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${(item.value / 1800000) * 100}%`, background: item.color }}/>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Memories Tab */}
        {activeTab === "Memories" && (
          <div className="animate-fade-in">
            <h2 className="font-display font-600 text-[17px] mb-6">Event Memories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {memories.map((m) => (
                <div key={m.event} className="glass rounded-3xl overflow-hidden border border-white/10 hover-lift">
                  <img src={`https://images.unsplash.com/photo-${m.highlight}?w=600&h=300&fit=crop&auto=format`}
                    alt={m.event} className="w-full h-48 object-cover"/>
                  <div className="p-5">
                    <h3 className="font-display font-600 text-[15px] text-white">{m.event}</h3>
                    <p className="text-white/50 text-[12px] mt-1">📅 {m.date} · 📸 {m.photos} photos</p>
                    <button className="mt-4 w-full py-2.5 rounded-xl text-[13px] font-medium text-purple-400 border border-purple-500/30 hover:bg-purple-500/10 transition-all">
                      View Gallery
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Favorites Tab */}
        {activeTab === "Favorites" && (
          <div className="animate-fade-in">
            <h2 className="font-display font-600 text-[17px] mb-6">Favourite Vendors</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {favorites.map((f) => (
                <div key={f.name} className="glass rounded-2xl p-6 border border-white/10 hover-lift">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4"
                    style={{ background: "rgba(106,56,255,0.2)" }}>
                    {f.img}
                  </div>
                  <h3 className="font-display font-600 text-[15px] text-white">{f.name}</h3>
                  <p className="text-white/50 text-[12px] mb-3">{f.type}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-amber-400 font-semibold text-[13px]">★ {f.rating}</span>
                    <button className="text-[12px] text-purple-400 hover:text-purple-300">Book Again →</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* My Bookings Tab */}
        {activeTab === "My Bookings" && (
          <div className="animate-fade-in space-y-4">
            <h2 className="font-display font-600 text-[17px] mb-2">All Bookings</h2>
            {[
              { id: "EVT-2025-001", name: "Priya & Arjun Wedding", date: "Oct 15, 2025", amount: "₹18L", status: "confirmed" },
              { id: "EVT-2025-002", name: "Sharma Family Reunion", date: "Nov 2, 2025", amount: "₹4L", status: "progress" },
              { id: "EVT-2024-089", name: "Parents 25th Anniversary", date: "Mar 12, 2024", amount: "₹6.5L", status: "complete" },
            ].map((b) => (
              <div key={b.id} className="glass rounded-2xl px-6 py-5 border border-white/10 flex flex-wrap items-center gap-4">
                <div className="flex-1 min-w-0">
                  <div className="font-display font-600 text-[15px] text-white">{b.name}</div>
                  <div className="text-white/45 text-[12px] mt-0.5">{b.id} · {b.date}</div>
                </div>
                <div className="font-display font-700 text-[16px]" style={{ color: "#8B5CF6" }}>{b.amount}</div>
                <span className={`px-3 py-1 rounded-full text-[11px] font-medium ${b.status === "confirmed" ? "status-confirmed" : b.status === "progress" ? "status-progress" : "status-complete"}`}>
                  {b.status === "confirmed" ? "Confirmed" : b.status === "progress" ? "In Progress" : "Completed"}
                </span>
                <button className="text-[12px] text-purple-400 hover:text-purple-300 whitespace-nowrap">View →</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
