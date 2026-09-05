import { useState } from "react";

const upcomingEvents = [
  {
    name: "Priya & Arjun Wedding",
    date: "Oct 15, 2025",
    venue: "Palace Grounds, Bangalore",
    budget: 1800000,
    spent: 1200000,
    status: "confirmed",
    stage: "Decor & Catering Finalized",
  },
  {
    name: "Sharma Family Reunion",
    date: "Nov 2, 2025",
    venue: "Nandi Hills Vineyard Resort",
    budget: 400000,
    spent: 150000,
    status: "in_progress",
    stage: "Venue Reserved",
  },
];

const memories = [
  { event: "Parents 25th Anniversary", date: "Mar 12, 2024", photos: 142, highlight: "1519225421980-1bb2832ac795" },
  { event: "Rohan Birthday Party", date: "Jan 28, 2024", photos: 88, highlight: "1507525428034-b723cf961d3e" },
];

const favorites = [
  { name: "Palace Grounds Pavilion", type: "Venue", rating: 4.9, img: "🏰" },
  { name: "Spice & Aroma Catering", type: "Catering", rating: 4.9, img: "🍽️" },
  { name: "Bliss Decor Studio", type: "Decor", rating: 4.8, img: "🌸" },
];

export default function ClientDashboard({ isLightMode = false }: { isLightMode?: boolean }) {
  const [activeTab, setActiveTab] = useState("Overview");

  const tabs = ["Overview", "My Bookings", "Budget", "Memories", "Favorites"];

  return (
    <div className={`min-h-screen pt-10 pb-20 px-6 transition-colors duration-300 ${
      isLightMode ? "bg-[#F7F4EE] text-[#111116]" : "bg-[#0B0B14] text-[#F7F4EE]"
    }`}>
      <div className="max-w-[1440px] mx-auto">
        {/* Profile header */}
        <div className="flex flex-wrap items-center gap-5 mb-8">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-xl text-[#111116] shadow-sm"
            style={{ background: "linear-gradient(135deg, #E8C98A, #B89B5E)" }}>
            PS
          </div>
          <div>
            <h1 className={`font-serif font-bold text-3xl ${isLightMode ? "text-[#111116]" : "text-white"}`}>Priya Sharma</h1>
            <p className={`text-[13px] font-medium ${isLightMode ? "text-[#6F6B66]" : "text-white/50"}`}>priya.sharma@email.com · Premium Client since 2023</p>
          </div>
          <div className="ml-auto flex gap-3">
            <div className={`rounded-2xl px-4 py-2.5 text-center border ${
              isLightMode ? "bg-white border-[#DED9CF] text-[#111116]" : "bg-[#151522] border-white/10"
            }`}>
              <div className="font-mono font-extrabold text-[18px] text-[#B89B5E]">3</div>
              <div className={`text-[11px] font-semibold ${isLightMode ? "text-[#6F6B66]" : "text-white/40"}`}>Events</div>
            </div>
            <div className={`rounded-2xl px-4 py-2.5 text-center border ${
              isLightMode ? "bg-white border-[#DED9CF] text-[#111116]" : "bg-[#151522] border-white/10"
            }`}>
              <div className="font-mono font-extrabold text-[18px] text-[#B89B5E]">₹22L</div>
              <div className={`text-[11px] font-semibold ${isLightMode ? "text-[#6F6B66]" : "text-white/40"}`}>Invested</div>
            </div>
            <div className={`rounded-2xl px-4 py-2.5 text-center border ${
              isLightMode ? "bg-white border-[#DED9CF] text-[#111116]" : "bg-[#151522] border-white/10"
            }`}>
              <div className="font-mono font-extrabold text-[18px] text-[#B89B5E]">★ 4.9</div>
              <div className={`text-[11px] font-semibold ${isLightMode ? "text-[#6F6B66]" : "text-white/40"}`}>Rating</div>
            </div>
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
                      ? "btn-gold-champagne !px-5 !py-2.5 text-[#111116] shadow-md"
                      : "bg-white border-[#DED9CF] text-[#111116] hover:bg-[#EAE5DA]"
                    : isActive
                      ? "border-[#B89B5E] bg-[#B89B5E]/20 text-[#E8C98A]"
                      : "text-white/55 border-white/8 hover:border-white/20 hover:text-white bg-[#151522]"
                }`}>
                {t}
              </button>
            );
          })}
        </div>

        {/* Overview Tab */}
        {activeTab === "Overview" && (
          <div className="space-y-6 animate-fade-in">
            {/* Upcoming events */}
            <div>
              <h2 className={`font-serif font-bold text-2xl mb-4 ${isLightMode ? "text-[#111116]" : "text-white"}`}>Upcoming Events</h2>
              <div className="space-y-4">
                {upcomingEvents.map((e) => (
                  <div key={e.name} className={`rounded-3xl p-6 border ${
                    isLightMode ? "bg-white border-[#DED9CF] shadow-sm text-[#111116]" : "bg-[#151522] border-white/10 text-white"
                  }`}>
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                      <div>
                        <h3 className="font-serif font-bold text-xl">{e.name}</h3>
                        <p className={`text-[13px] mt-0.5 font-medium ${isLightMode ? "text-[#6F6B66]" : "text-white/50"}`}>📅 {e.date} · 📍 {e.venue}</p>
                      </div>
                      <span className="px-3 py-1 rounded-full text-[12px] font-bold bg-emerald-500/10 text-emerald-700 border border-emerald-500/30">
                        {e.status === "confirmed" ? "✓ Confirmed" : "⟳ In Progress"}
                      </span>
                    </div>
                    <div className="mb-2 flex justify-between text-[12px] font-semibold">
                      <span className={isLightMode ? "text-[#6F6B66]" : "text-white/50"}>Budget utilization</span>
                      <span className="font-mono text-[#B89B5E] font-bold">₹{(e.spent / 100000).toFixed(1)}L / ₹{(e.budget / 100000).toFixed(1)}L</span>
                    </div>
                    <div className={`h-2 rounded-full overflow-hidden ${isLightMode ? "bg-[#F7F4EE]" : "bg-white/10"}`}>
                      <div className="h-full rounded-full bg-gradient-to-r from-[#E8C98A] to-[#B89B5E]" style={{ width: `${(e.spent / e.budget) * 100}%` }}/>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick actions */}
            <div>
              <h2 className={`font-serif font-bold text-2xl mb-4 ${isLightMode ? "text-[#111116]" : "text-white"}`}>Quick Actions</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { icon: "📊", label: "Budget Planner" },
                  { icon: "📄", label: "My Documents" },
                  { icon: "🔔", label: "Notifications" },
                  { icon: "💬", label: "Talk to Manager" },
                  { icon: "👨‍👩‍👧‍👦", label: "Family Assistant" },
                  { icon: "📸", label: "Event Memories" },
                  { icon: "❤️", label: "Favorites" },
                  { icon: "💳", label: "Payments" },
                ].map((a) => (
                  <button key={a.label} onClick={() => setActiveTab(a.label.replace("My ", "").replace("Event ", "").replace(" Planner", "").replace("Notifications", "Overview"))}
                    className={`rounded-3xl p-5 flex flex-col items-center gap-2.5 border transition-all hover:-translate-y-1 ${
                      isLightMode ? "bg-white border-[#DED9CF] shadow-sm text-[#111116] hover:border-[#B89B5E]" : "bg-[#151522] border-white/10 text-white"
                    }`}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                      style={{ background: isLightMode ? "#F7F4EE" : "rgba(255,255,255,0.08)" }}>
                      {a.icon}
                    </div>
                    <span className="text-[12px] font-bold text-center">{a.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Budget Tab */}
        {activeTab === "Budget" && (
          <div className="animate-fade-in space-y-6">
            <h2 className={`font-serif font-bold text-2xl mb-2 ${isLightMode ? "text-[#111116]" : "text-white"}`}>Budget Overview — Priya & Arjun Wedding</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {[
                { label: "Total Budget", value: "₹18L", color: "text-[#111116]" },
                { label: "Spent", value: "₹12L", color: "text-rose-600" },
                { label: "Remaining", value: "₹6L", color: "text-emerald-600" },
              ].map((s) => (
                <div key={s.label} className={`rounded-3xl p-5 border text-center ${
                  isLightMode ? "bg-white border-[#DED9CF] shadow-sm" : "bg-[#151522] border-white/10"
                }`}>
                  <div className={`font-mono font-extrabold text-3xl ${s.color} mb-1`}>{s.value}</div>
                  <div className={`text-[13px] font-semibold ${isLightMode ? "text-[#6F6B66]" : "text-white/50"}`}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Memories Tab */}
        {activeTab === "Memories" && (
          <div className="animate-fade-in">
            <h2 className={`font-serif font-bold text-2xl mb-6 ${isLightMode ? "text-[#111116]" : "text-white"}`}>Event Memories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {memories.map((m) => (
                <div key={m.event} className={`rounded-3xl overflow-hidden border ${
                  isLightMode ? "bg-white border-[#DED9CF] shadow-sm text-[#111116]" : "bg-[#151522] border-white/10 text-white"
                }`}>
                  <img src={`https://images.unsplash.com/photo-${m.highlight}?w=600&h=300&fit=crop&auto=format`}
                    alt={m.event} className="w-full h-48 object-cover"/>
                  <div className="p-5">
                    <h3 className="font-serif font-bold text-lg">{m.event}</h3>
                    <p className={`text-[12px] mt-1 font-medium ${isLightMode ? "text-[#6F6B66]" : "text-white/50"}`}>📅 {m.date} · 📸 {m.photos} photos</p>
                    <button className={`mt-4 w-full py-2.5 rounded-full text-[13px] font-bold border transition-all ${
                      isLightMode
                        ? "bg-[#F7F4EE] text-[#111116] border-[#DED9CF] hover:bg-[#EAE5DA]"
                        : "btn-hero-outline"
                    }`}>
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
            <h2 className={`font-serif font-bold text-2xl mb-6 ${isLightMode ? "text-[#111116]" : "text-white"}`}>Favourite Vendors</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {favorites.map((f) => (
                <div key={f.name} className={`rounded-2xl p-6 border ${
                  isLightMode ? "bg-white border-[#DED9CF] shadow-sm text-[#111116]" : "bg-[#151522] border-white/10 text-white"
                }`}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4"
                    style={{ background: isLightMode ? "#F7F4EE" : "rgba(184,155,94,0.15)" }}>
                    {f.img}
                  </div>
                  <h3 className="font-serif font-bold text-lg">{f.name}</h3>
                  <p className={`text-[12px] mb-3 font-medium ${isLightMode ? "text-[#6F6B66]" : "text-white/50"}`}>{f.type}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[#B89B5E] font-bold text-[13px]">★ {f.rating}</span>
                    <button className="text-[12px] font-bold text-[#B89B5E] hover:underline">Book Again →</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* My Bookings Tab */}
        {activeTab === "My Bookings" && (
          <div className="animate-fade-in space-y-4">
            <h2 className={`font-serif font-bold text-2xl mb-2 ${isLightMode ? "text-[#111116]" : "text-white"}`}>All Bookings</h2>
            {[
              { id: "EVT-2025-001", name: "Priya & Arjun Wedding", date: "Oct 15, 2025", amount: "₹18L", status: "confirmed" },
              { id: "EVT-2025-002", name: "Sharma Family Reunion", date: "Nov 2, 2025", amount: "₹4L", status: "progress" },
              { id: "EVT-2024-089", name: "Parents 25th Anniversary", date: "Mar 12, 2024", amount: "₹6.5L", status: "complete" },
            ].map((b) => (
              <div key={b.id} className={`rounded-2xl px-6 py-5 border flex flex-wrap items-center gap-4 ${
                isLightMode ? "bg-white border-[#DED9CF] shadow-sm text-[#111116]" : "bg-[#151522] border-white/10 text-white"
              }`}>
                <div className="flex-1 min-w-0">
                  <div className="font-serif font-bold text-lg">{b.name}</div>
                  <div className={`text-[12px] mt-0.5 font-medium ${isLightMode ? "text-[#6F6B66]" : "text-white/45"}`}>{b.id} · {b.date}</div>
                </div>
                <div className="font-mono font-extrabold text-[16px] text-[#B89B5E]">{b.amount}</div>
                <span className={`px-3 py-1 rounded-full text-[11px] font-bold ${
                  b.status === "confirmed" 
                    ? "bg-emerald-500/10 text-emerald-700 border border-emerald-500/30" 
                    : b.status === "progress" 
                      ? "bg-amber-500/10 text-amber-700 border border-amber-500/30" 
                      : "bg-sky-500/10 text-sky-700 border border-sky-500/30"
                }`}>
                  {b.status === "confirmed" ? "Confirmed" : b.status === "progress" ? "In Progress" : "Completed"}
                </span>
                <button className="text-[12px] font-bold whitespace-nowrap text-[#B89B5E] hover:underline">View →</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
