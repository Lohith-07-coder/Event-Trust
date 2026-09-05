import { useState } from "react";

const attentionItems = [
  { label: "Managers Awaiting Approval", count: 3, icon: "👨‍💼", color: "#F59E0B", action: "Review" },
  { label: "Vendors Pending Confirmation", count: 7, icon: "🏪", color: "#EF4444", action: "Approve" },
  { label: "Workers Yet to Be Assigned", count: 14, icon: "👷", color: "#8B5CF6", action: "Assign" },
  { label: "Events Starting in 24h", count: 2, icon: "⚡", color: "#EF4444", action: "Monitor" },
  { label: "Client Follow-ups Pending", count: 5, icon: "📞", color: "#0EA5E9", action: "Call" },
];

const liveStats = [
  { label: "Total Bookings", value: "1,284", icon: "📋", delta: "+12%", color: "#6A38FF" },
  { label: "Revenue (Sep)", value: "₹48.2L", icon: "💰", delta: "+23%", color: "#10B981" },
  { label: "Active Managers", value: "18", icon: "👨‍💼", delta: "+2", color: "#0EA5E9" },
  { label: "Workers Assigned", value: "342", icon: "👷", delta: "Today", color: "#F59E0B" },
  { label: "Venues Confirmed", value: "47", icon: "🏛️", delta: "Active", color: "#8B5CF6" },
  { label: "Events in Progress", value: "9", icon: "⟳", delta: "Live", color: "#EC4899" },
  { label: "Completed Events", value: "1,142", icon: "✅", delta: "All time", color: "#D4AF37" },
  { label: "Avg Rating", value: "4.87★", icon: "⭐", delta: "Platform", color: "#F59E0B" },
];

const recentEvents = [
  { id: "EVT-001", name: "Gupta Wedding", manager: "Rohan Mehra", date: "Oct 15", status: "progress", revenue: "15L" },
  { id: "EVT-002", name: "TechCorp Gala", manager: "Sneha Patel", date: "Nov 8", status: "contacted", revenue: "6L" },
  { id: "EVT-003", name: "Sharma Reunion", manager: "Arjun Das", date: "Nov 2", status: "confirmed", revenue: "4L" },
  { id: "EVT-004", name: "SRM College Fest", manager: "Prithvi K.", date: "Oct 22", status: "ready", revenue: "8L" },
  { id: "EVT-005", name: "Azure Gala Night", manager: "Rohan Mehra", date: "Sep 14", status: "started", revenue: "12L" },
];

const statusMap: Record<string, string> = {
  "new": "status-new",
  "contacted": "status-contacted",
  "confirmed": "status-confirmed",
  "progress": "status-progress",
  "ready": "status-complete",
  "started": "status-progress",
  "complete": "status-complete",
};

const statusLabel: Record<string, string> = {
  "new": "New Enquiry",
  "contacted": "Contacted",
  "confirmed": "Venue Confirmed",
  "progress": "Vendor Confirmed",
  "ready": "Event Ready",
  "started": "Event Started",
  "complete": "Completed",
};

const pendingManagers = [
  { name: "Vikram Sharma", exp: "5 yrs", city: "Mumbai", events: 82, rating: 4.8 },
  { name: "Neha Kapoor", exp: "3 yrs", city: "Delhi", events: 41, rating: 4.7 },
  { name: "Arun Pillai", exp: "7 yrs", city: "Bangalore", events: 128, rating: 4.9 },
];

export default function AdminDashboard({ isLightMode = false }: { isLightMode?: boolean }) {
  const [activeSection, setActiveSection] = useState("overview");

  return (
    <div className={`min-h-screen pt-8 pb-20 px-6 transition-colors duration-300 ${
      isLightMode ? "bg-[#F7F4EE] text-[#111116]" : "bg-[#0B0B14] text-[#F7F4EE]"
    }`}>
      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="flex flex-wrap items-center gap-5 mb-8">
          <div>
            <h1 className={`font-serif font-bold text-3xl md:text-4xl ${isLightMode ? "text-[#111116]" : "text-white"}`}>
              Admin <span className="font-handwriting text-[#B89B5E] text-4xl md:text-5xl normal-case">Control Center</span>
            </h1>
            <p className={`text-[13px] mt-1 font-medium ${isLightMode ? "text-[#6F6B66]" : "text-white/50"}`}>EVENTTRUST Platform · Sep 5, 2025 · 14:32 IST</p>
          </div>
          <div className="ml-auto flex gap-3">
            <div className={`flex items-center gap-2 rounded-full px-4 py-2 border ${
              isLightMode ? "bg-emerald-50 border-emerald-200 text-emerald-700" : "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
            }`}>
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse-glow"/>
              <span className="text-[12px] font-bold">Platform Live</span>
            </div>
          </div>
        </div>

        {/* ── ATTENTION REQUIRED ── */}
        <div className={`rounded-3xl p-6 border mb-8 ${
          isLightMode ? "bg-white border-[#DED9CF] shadow-sm" : "bg-[#151522] border-red-500/20 text-white"
        }`}>
          <h2 className="font-serif font-bold text-[18px] text-rose-600 mb-4">⚠️ Attention Required</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {attentionItems.map((item) => (
              <div key={item.label} className={`rounded-2xl p-4 border transition-all ${
                isLightMode ? "bg-[#F7F4EE] border-[#DED9CF]" : "bg-white/5 border-white/8 hover:border-white/20"
              }`}>
                <div className="text-2xl mb-2">{item.icon}</div>
                <div className="font-serif font-bold text-3xl mb-1" style={{ color: item.color }}>{item.count}</div>
                <div className={`text-[12px] mb-3 leading-tight font-medium ${isLightMode ? "text-[#6F6B66]" : "text-white/55"}`}>{item.label}</div>
                <button className="text-[11px] font-bold px-3 py-1.5 rounded-full border transition-all hover:scale-105"
                  style={{ borderColor: `${item.color}40`, color: item.color, background: `${item.color}15` }}>
                  {item.action} →
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* ── LIVE OPS WIDGETS ── */}
        <div className="mb-8">
          <h2 className={`font-serif font-bold text-[22px] mb-4 ${isLightMode ? "text-[#111116]" : "text-white"}`}>Live Operations</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {liveStats.map((s) => (
              <div key={s.label} className={`rounded-3xl p-5 border transition-all hover:shadow-md ${
                isLightMode ? "bg-white border-[#DED9CF] text-[#111116]" : "bg-[#151522] border-white/10 text-white"
              }`}>
                <div className="flex items-start justify-between mb-3">
                  <span className="text-2xl">{s.icon}</span>
                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                    isLightMode ? "bg-[#F7F4EE] border-[#DED9CF] text-[#6F6B66]" : "text-white/60 border-white/10"
                  }`}>{s.delta}</span>
                </div>
                <div className="font-serif font-bold text-[26px] mb-0.5 text-[#B89B5E]">{s.value}</div>
                <div className={`text-[12px] font-semibold ${isLightMode ? "text-[#6F6B66]" : "text-white/45"}`}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── SECTION NAVIGATION ── */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
          {["overview", "events", "managers", "vendors", "analytics"].map((s) => {
            const isActive = activeSection === s;
            return (
              <button key={s} onClick={() => setActiveSection(s)}
                className={`px-5 py-2.5 rounded-full text-[13px] font-bold whitespace-nowrap border transition-all shrink-0 capitalize ${
                  isLightMode
                    ? isActive
                      ? "bg-[#B89B5E] text-[#111116] border-[#B89B5E] shadow-sm"
                      : "bg-white border-[#DED9CF] text-[#6F6B66] hover:bg-[#E8C98A]/20"
                    : isActive
                      ? "btn-gold-champagne"
                      : "text-white/55 border-white/8 hover:border-white/20 hover:text-white bg-[#151522]"
                }`}>
                {s}
              </button>
            );
          })}
        </div>

        {/* Recent Events Table */}
        {activeSection === "events" && (
          <div className={`animate-fade-in rounded-3xl border overflow-hidden ${
            isLightMode ? "bg-white border-[#DED9CF] text-[#111116]" : "bg-[#151522] border-white/10 text-white"
          }`}>
            <div className={`px-6 py-4 border-b ${isLightMode ? "border-[#DED9CF]" : "border-white/8"}`}>
              <h2 className="font-serif font-bold text-[18px]">All Events</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className={`border-b ${isLightMode ? "border-[#DED9CF] bg-[#F7F4EE]" : "border-white/6"}`}>
                    {["Event ID", "Name", "Manager", "Date", "Revenue", "Status", "Action"].map((h) => (
                      <th key={h} className={`px-5 py-3 text-left text-[11px] font-bold uppercase tracking-wider whitespace-nowrap ${
                        isLightMode ? "text-[#6F6B66]" : "text-white/35"
                      }`}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {recentEvents.map((e, i) => (
                    <tr key={e.id} className={`border-b transition-colors ${
                      isLightMode
                        ? i % 2 === 0 ? "border-[#DED9CF] hover:bg-[#E8C98A]/10" : "bg-[#F7F4EE]/50 border-[#DED9CF] hover:bg-[#E8C98A]/10"
                        : i % 2 === 0 ? "border-white/5 hover:bg-white/4" : "bg-white/2 border-white/5 hover:bg-white/4"
                    }`}>
                      <td className="px-5 py-4"><span className="font-mono text-[12px] font-bold text-[#B89B5E]">{e.id}</span></td>
                      <td className="px-5 py-4"><span className={`font-serif font-bold text-[14px] ${isLightMode ? "text-[#111116]" : "text-white"}`}>{e.name}</span></td>
                      <td className="px-5 py-4"><span className={`text-[13px] font-medium ${isLightMode ? "text-[#6F6B66]" : "text-white/65"}`}>{e.manager}</span></td>
                      <td className="px-5 py-4"><span className={`text-[13px] font-medium ${isLightMode ? "text-[#6F6B66]" : "text-white/65"}`}>{e.date}</span></td>
                      <td className="px-5 py-4"><span className="text-[14px] font-serif font-bold text-[#B89B5E]">₹{e.revenue}</span></td>
                      <td className="px-5 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                          e.status === "confirmed" || e.status === "ready" 
                            ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/30" 
                            : e.status === "progress" || e.status === "started"
                              ? "bg-[#E8C98A]/20 text-[#B89B5E] border border-[#B89B5E]/30" 
                              : "bg-blue-500/10 text-blue-600 border border-blue-500/30"
                        }`}>
                          {statusLabel[e.status]}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <button className="text-[12px] font-bold text-[#B89B5E] hover:underline">View →</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Managers Approval */}
        {activeSection === "managers" && (
          <div className="animate-fade-in space-y-4">
            <h2 className={`font-serif font-bold text-[18px] mb-2 ${isLightMode ? "text-[#111116]" : "text-white"}`}>Manager Approval Queue</h2>
            {pendingManagers.map((m) => (
              <div key={m.name} className={`rounded-3xl p-6 border flex flex-wrap items-center gap-4 ${
                isLightMode ? "bg-white border-[#DED9CF] text-[#111116]" : "bg-[#151522] border-white/10 text-white"
              }`}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center font-serif font-bold text-lg text-[#111116] shadow-md grad-champagne">
                  {m.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-serif font-bold text-[16px]">{m.name}</div>
                  <div className={`text-[12px] font-medium ${isLightMode ? "text-[#6F6B66]" : "text-white/45"}`}>{m.city} · {m.exp} experience · {m.events} events managed</div>
                </div>
                <div className="text-[#B89B5E] font-bold text-[14px]">★ {m.rating}</div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 rounded-full text-[12px] font-bold bg-emerald-500/10 text-emerald-600 border border-emerald-500/30 hover:bg-emerald-500/20 transition-all">
                    Approve
                  </button>
                  <button className="px-4 py-2 rounded-full text-[12px] font-bold bg-rose-500/10 text-rose-600 border border-rose-500/30 hover:bg-rose-500/20 transition-all">
                    Reject
                  </button>
                  <button className={`px-4 py-2 rounded-full text-[12px] font-bold border transition-all ${
                    isLightMode ? "bg-[#F7F4EE] text-[#111116] border-[#DED9CF] hover:bg-[#E8C98A]/20" : "text-white/60 border-white/15 hover:border-white/30 bg-white/5"
                  }`}>
                    Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Overview (default) */}
        {(activeSection === "overview" || activeSection === "vendors" || activeSection === "analytics") && (
          <div className="animate-fade-in grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Recent events compact */}
            <div className={`rounded-3xl border overflow-hidden ${
              isLightMode ? "bg-white border-[#DED9CF] text-[#111116]" : "bg-[#151522] border-white/10 text-white"
            }`}>
              <div className={`px-5 py-4 border-b flex items-center justify-between ${isLightMode ? "border-[#DED9CF]" : "border-white/8"}`}>
                <h3 className="font-serif font-bold text-[16px]">Recent Events</h3>
                <button onClick={() => setActiveSection("events")} className="text-[12px] font-bold text-[#B89B5E] hover:underline">View all →</button>
              </div>
              <div className={`divide-y ${isLightMode ? "divide-[#DED9CF]" : "divide-white/6"}`}>
                {recentEvents.slice(0, 4).map((e) => (
                  <div key={e.id} className="px-5 py-3 flex items-center gap-3">
                    <div className="flex-1">
                      <div className="text-[13px] font-serif font-bold">{e.name}</div>
                      <div className={`text-[11px] font-medium ${isLightMode ? "text-[#6F6B66]" : "text-white/40"}`}>{e.manager} · {e.date}</div>
                    </div>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      e.status === "confirmed" || e.status === "ready"
                        ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/30"
                        : "bg-[#E8C98A]/20 text-[#B89B5E] border border-[#B89B5E]/30"
                    }`}>
                      {statusLabel[e.status]}
                    </span>
                    <span className="text-[#B89B5E] text-[13px] font-serif font-bold">₹{e.revenue}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Platform health */}
            <div className={`rounded-3xl p-6 border ${
              isLightMode ? "bg-white border-[#DED9CF] text-[#111116]" : "bg-[#151522] border-white/10 text-white"
            }`}>
              <h3 className="font-serif font-bold text-[16px] mb-5">Platform Health</h3>
              <div className="space-y-4">
                {[
                  { label: "Client Satisfaction", value: 97, color: "#10B981" },
                  { label: "Vendor Response Rate", value: 94, color: "#B89B5E" },
                  { label: "On-Time Event Rate", value: 99, color: "#E8C98A" },
                  { label: "Budget Accuracy", value: 91, color: "#D4AF37" },
                  { label: "Worker Availability", value: 88, color: "#F59E0B" },
                ].map((m) => (
                  <div key={m.label}>
                    <div className="flex justify-between text-[12px] font-bold mb-1.5">
                      <span className={isLightMode ? "text-[#6F6B66]" : "text-white/60"}>{m.label}</span>
                      <span className={isLightMode ? "text-[#111116] font-bold" : "text-white"}>{m.value}%</span>
                    </div>
                    <div className={`h-2 rounded-full overflow-hidden ${isLightMode ? "bg-[#F7F4EE]" : "bg-white/8"}`}>
                      <div className="h-full rounded-full transition-all" style={{ width: `${m.value}%`, background: m.color }}/>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Revenue by event type */}
            <div className={`rounded-3xl p-6 border md:col-span-2 ${
              isLightMode ? "bg-white border-[#DED9CF] text-[#111116]" : "bg-[#151522] border-white/10 text-white"
            }`}>
              <h3 className="font-serif font-bold text-[16px] mb-5">Revenue by Event Type</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { type: "Weddings", revenue: "₹28.4L", pct: 59, color: "#B89B5E" },
                  { type: "Corporate", revenue: "₹10.2L", pct: 21, color: "#E8C98A" },
                  { type: "Birthdays", revenue: "₹5.8L", pct: 12, color: "#10B981" },
                  { type: "Others", revenue: "₹3.8L", pct: 8, color: "#8B5CF6" },
                ].map((r) => (
                  <div key={r.type} className="text-center">
                    <div className="relative w-20 h-20 mx-auto mb-3">
                      <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                        <circle cx="18" cy="18" r="15.9" fill="none" stroke={isLightMode ? "#F7F4EE" : "rgba(255,255,255,0.08)"} strokeWidth="3"/>
                        <circle cx="18" cy="18" r="15.9" fill="none" stroke={r.color} strokeWidth="3"
                          strokeDasharray={`${r.pct} ${100 - r.pct}`} strokeLinecap="round"/>
                      </svg>
                      <div className={`absolute inset-0 flex items-center justify-center font-bold text-[14px] ${isLightMode ? "text-[#111116]" : "text-white"}`}>{r.pct}%</div>
                    </div>
                    <div className="font-serif font-bold text-[16px] text-[#B89B5E]">{r.revenue}</div>
                    <div className={`text-[12px] font-semibold ${isLightMode ? "text-[#6F6B66]" : "text-white/45"}`}>{r.type}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
