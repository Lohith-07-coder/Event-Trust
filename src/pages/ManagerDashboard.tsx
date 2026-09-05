import { useState } from "react";

const pipeline = [
  "New Enquiry",
  "Contacted",
  "Quotation Sent",
  "Venue Confirmed",
  "Vendor Confirmed",
  "Workers Assigned",
  "Event Ready",
  "Event Started",
  "Completed",
];

const events = [
  {
    id: "EVT-001",
    name: "Gupta Wedding",
    client: "Anita Gupta",
    date: "Oct 15, 2025",
    venue: "The Grand Pavilion",
    guests: 800,
    budget: 1500000,
    stage: 6,
    vendors: ["Spice & Aroma", "Bliss Decor", "Frames & Moments", "DJ Karan"],
    workers: { servers: 20, security: 4, setup: 8, cleaners: 6 },
    notes: "Bride prefers pastel theme. Phoolon ki Chaadar setup needed. Confirm PA system test by Oct 10.",
    checklist: [
      { task: "Confirm venue layout with manager", done: true },
      { task: "Finalize floral decor theme", done: true },
      { task: "Catering trial on Oct 5", done: true },
      { task: "Sound check rehearsal", done: false },
      { task: "Guest seating arrangement", done: false },
      { task: "Backup generator confirmation", done: false },
    ],
  },
  {
    id: "EVT-002",
    name: "TechCorp Gala",
    client: "Rahul Menon (TechCorp HR)",
    date: "Nov 8, 2025",
    venue: "Skyline Rooftop Lounge",
    guests: 250,
    budget: 600000,
    stage: 4,
    vendors: ["Royal Feast Catering", "StarAct Entertainment"],
    workers: { servers: 8, security: 2, setup: 4, cleaners: 3 },
    notes: "Corporate dress code. Live singer for 45 min set. Award ceremony at 9 PM sharp.",
    checklist: [
      { task: "Venue walkthrough", done: true },
      { task: "Confirm catering menu", done: false },
      { task: "AV equipment list", done: false },
      { task: "Guest list finalization", done: false },
    ],
  },
];

export default function ManagerDashboard({ isLightMode = false }: { isLightMode?: boolean }) {
  const [selectedEvent, setSelectedEvent] = useState(events[0]);
  const [checklistState, setChecklistState] = useState<Record<string, boolean>>({});

  const toggleCheck = (task: string) => {
    setChecklistState((prev) => ({ ...prev, [task]: !prev[task] }));
  };

  return (
    <div className={`min-h-screen pt-8 pb-20 px-6 transition-colors duration-300 ${
      isLightMode ? "bg-[#F7F4EE] text-[#111116]" : "bg-[#0B0B14] text-[#F7F4EE]"
    }`}>
      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="flex flex-wrap items-center gap-5 mb-8">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center font-serif font-bold text-xl text-[#111116] shadow-md grad-champagne">
            RM
          </div>
          <div>
            <h1 className={`font-serif font-bold text-3xl ${isLightMode ? "text-[#111116]" : "text-white"}`}>Rohan Mehra — Event Manager</h1>
            <p className={`text-[13px] font-medium ${isLightMode ? "text-[#6F6B66]" : "text-white/50"}`}>Manager Dashboard · 2 Active Events · Senior Manager</p>
          </div>
          <div className="ml-auto flex gap-3">
            {[
              { label: "Assigned Events", value: "2" },
              { label: "Events Done", value: "47" },
              { label: "Client Rating", value: "4.9★" },
            ].map((s) => (
              <div key={s.label} className={`rounded-xl px-4 py-2.5 text-center border ${
                isLightMode ? "bg-white border-[#DED9CF] text-[#111116]" : "bg-[#151522] border-white/10"
              }`}>
                <div className="font-serif font-bold text-[18px] text-[#B89B5E]">{s.value}</div>
                <div className={`text-[11px] font-semibold uppercase tracking-wider ${isLightMode ? "text-[#6F6B66]" : "text-white/40"}`}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Event list sidebar */}
          <div className="lg:w-72 shrink-0 space-y-3">
            <h3 className={`font-bold text-[12px] uppercase tracking-wider mb-2 ${isLightMode ? "text-[#6F6B66]" : "text-white/50"}`}>Assigned Events</h3>
            {events.map((e) => (
              <button key={e.id} onClick={() => setSelectedEvent(e)}
                className={`w-full text-left rounded-3xl p-4 border transition-all ${
                  isLightMode
                    ? selectedEvent.id === e.id
                      ? "border-[#B89B5E] bg-[#E8C98A]/20 shadow-sm text-[#111116]"
                      : "bg-white border-[#DED9CF] hover:border-[#B89B5E] text-[#111116]"
                    : selectedEvent.id === e.id
                      ? "border-[#B89B5E] bg-[#E8C98A]/15 text-white"
                      : "bg-[#151522] border-white/10 hover:border-white/25 text-white"
                }`}>
                <div className="font-serif font-bold text-[16px]">{e.name}</div>
                <div className={`text-[12px] mt-0.5 font-medium ${isLightMode ? "text-[#6F6B66]" : "text-white/45"}`}>📅 {e.date}</div>
                <div className={`mt-2 inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                  e.stage >= 6 
                    ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/30" 
                    : "bg-[#E8C98A]/20 text-[#B89B5E] border border-[#B89B5E]/30"
                }`}>
                  {pipeline[e.stage]}
                </div>
              </button>
            ))}
          </div>

          {/* Event detail */}
          <div className="flex-1 space-y-5 animate-fade-in">
            {/* Status pipeline */}
            <div className={`rounded-3xl p-5 border overflow-x-auto ${
              isLightMode ? "bg-white border-[#DED9CF] text-[#111116]" : "bg-[#151522] border-white/10 text-white"
            }`}>
              <h3 className={`font-serif font-bold text-[16px] mb-4 ${isLightMode ? "text-[#111116]" : "text-white"}`}>Event Pipeline</h3>
              <div className="flex items-center gap-1 min-w-max">
                {pipeline.map((stage, i) => (
                  <div key={stage} className="flex items-center gap-1">
                    <div className={`px-3 py-1.5 rounded-full text-[11px] font-bold whitespace-nowrap transition-all ${
                      i < selectedEvent.stage
                        ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/30"
                        : i === selectedEvent.stage
                          ? "btn-gold-champagne text-[#111116] shadow-sm"
                          : isLightMode
                            ? "bg-[#F7F4EE] text-[#6F6B66] border border-[#DED9CF]"
                            : "text-white/25 border border-white/8 bg-white/5"
                    }`}>
                      {i < selectedEvent.stage ? "✓ " : ""}{stage}
                    </div>
                    {i < pipeline.length - 1 && (
                      <div className={`w-3 h-px ${i < selectedEvent.stage ? "bg-emerald-500" : (isLightMode ? "bg-[#DED9CF]" : "bg-white/15")}`}/>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Event overview */}
            <div className={`rounded-3xl p-6 border ${
              isLightMode ? "bg-white border-[#DED9CF] text-[#111116]" : "bg-[#151522] border-white/10 text-white"
            }`}>
              <div className="flex items-start justify-between flex-wrap gap-3 mb-5">
                <div>
                  <h2 className="font-serif font-bold text-2xl">{selectedEvent.name}</h2>
                  <p className={`text-[13px] mt-0.5 font-medium ${isLightMode ? "text-[#6F6B66]" : "text-white/50"}`}>👤 {selectedEvent.client} · 📅 {selectedEvent.date}</p>
                </div>
                <div className="text-right">
                  <div className="font-serif font-bold text-2xl text-[#B89B5E]">₹{(selectedEvent.budget / 100000).toFixed(0)}L</div>
                  <div className={`text-[12px] font-medium ${isLightMode ? "text-[#6F6B66]" : "text-white/40"}`}>Total Budget</div>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <div className={`rounded-2xl p-3.5 border ${
                  isLightMode ? "bg-[#F7F4EE] border-[#DED9CF]" : "bg-white/5 border-white/8"
                }`}>
                  <div className={`text-[11px] font-semibold ${isLightMode ? "text-[#6F6B66]" : "text-white/40"}`}>Venue</div>
                  <div className={`text-[13px] font-bold ${isLightMode ? "text-[#111116]" : "text-white"}`}>{selectedEvent.venue}</div>
                </div>
                <div className={`rounded-2xl p-3.5 border ${
                  isLightMode ? "bg-[#F7F4EE] border-[#DED9CF]" : "bg-white/5 border-white/8"
                }`}>
                  <div className={`text-[11px] font-semibold ${isLightMode ? "text-[#6F6B66]" : "text-white/40"}`}>Guest Count</div>
                  <div className={`text-[13px] font-bold ${isLightMode ? "text-[#111116]" : "text-white"}`}>{selectedEvent.guests.toLocaleString()}</div>
                </div>
                <div className={`rounded-2xl p-3.5 border ${
                  isLightMode ? "bg-[#F7F4EE] border-[#DED9CF]" : "bg-white/5 border-white/8"
                }`}>
                  <div className={`text-[11px] font-semibold ${isLightMode ? "text-[#6F6B66]" : "text-white/40"}`}>Event ID</div>
                  <div className="font-mono text-[13px] font-bold text-[#B89B5E]">{selectedEvent.id}</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Vendors */}
              <div className={`rounded-3xl p-5 border ${
                isLightMode ? "bg-white border-[#DED9CF] text-[#111116]" : "bg-[#151522] border-white/10 text-white"
              }`}>
                <h3 className={`font-serif font-bold text-[16px] mb-3 ${isLightMode ? "text-[#111116]" : "text-white"}`}>Vendor Allocation</h3>
                <div className="space-y-2.5">
                  {selectedEvent.vendors.map((v) => (
                    <div key={v} className="flex items-center gap-3 py-1">
                      <div className="w-2 h-2 rounded-full bg-emerald-500"/>
                      <span className={`text-[13px] font-medium flex-1 ${isLightMode ? "text-[#111116]" : "text-white/75"}`}>{v}</span>
                      <span className="bg-emerald-500/10 text-emerald-600 border border-emerald-500/30 px-2.5 py-0.5 rounded-full text-[10px] font-bold">✓ Confirmed</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Workers */}
              <div className={`rounded-3xl p-5 border ${
                isLightMode ? "bg-white border-[#DED9CF] text-[#111116]" : "bg-[#151522] border-white/10 text-white"
              }`}>
                <h3 className={`font-serif font-bold text-[16px] mb-3 ${isLightMode ? "text-[#111116]" : "text-white"}`}>Worker Allocation</h3>
                <div className="space-y-2.5">
                  {Object.entries(selectedEvent.workers).map(([role, count]) => (
                    <div key={role} className="flex items-center justify-between">
                      <span className={`text-[13px] font-medium capitalize ${isLightMode ? "text-[#111116]" : "text-white/75"}`}>{role}</span>
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1">
                          {Array.from({ length: Math.min(count, 8) }).map((_, i) => (
                            <div key={i} className="w-4 h-4 rounded-full grad-champagne"/>
                          ))}
                          {count > 8 && <span className={`text-[11px] font-medium ${isLightMode ? "text-[#6F6B66]" : "text-white/40"}`}>+{count - 8}</span>}
                        </div>
                        <span className={`font-bold text-[13px] ${isLightMode ? "text-[#111116]" : "text-white"}`}>{count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className={`rounded-3xl p-5 border ${
              isLightMode ? "bg-[#E8C98A]/20 border-[#B89B5E]/30 text-[#111116]" : "bg-[#151522] border border-[#B89B5E]/30 text-white"
            }`}>
              <h3 className="font-serif font-bold text-[16px] text-[#B89B5E] mb-2">📝 Internal Notes</h3>
              <p className={`text-[13px] leading-relaxed font-medium ${isLightMode ? "text-[#111116]" : "text-white/75"}`}>{selectedEvent.notes}</p>
            </div>

            {/* Checklist */}
            <div className={`rounded-3xl p-5 border ${
              isLightMode ? "bg-white border-[#DED9CF] text-[#111116]" : "bg-[#151522] border-white/10 text-white"
            }`}>
              <h3 className="font-serif font-bold text-[18px] mb-4">Event Checklist</h3>
              <div className="space-y-3">
                {selectedEvent.checklist.map((item, i) => {
                  const key = `${selectedEvent.id}-${i}`;
                  const done = key in checklistState ? checklistState[key] : item.done;
                  return (
                    <button key={i} onClick={() => toggleCheck(key)}
                      className="w-full flex items-center gap-3 py-2 text-left group">
                      <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all shrink-0 ${
                        done 
                          ? "border-[#B89B5E] bg-[#B89B5E]" 
                          : (isLightMode ? "border-[#DED9CF] group-hover:border-[#B89B5E]" : "border-white/30 group-hover:border-[#B89B5E]")
                      }`}>
                        {done && <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2 2 4-4" stroke="#111116" strokeWidth="2" strokeLinecap="round"/></svg>}
                      </div>
                      <span className={`text-[13px] font-medium transition-all ${
                        done 
                          ? (isLightMode ? "line-through text-[#6F6B66]" : "line-through text-white/35") 
                          : (isLightMode ? "text-[#111116]" : "text-white/75")
                      }`}>{item.task}</span>
                    </button>
                  );
                })}
              </div>
              <div className={`mt-4 h-2 rounded-full overflow-hidden ${isLightMode ? "bg-[#F7F4EE]" : "bg-white/10"}`}>
                <div className="h-full rounded-full grad-champagne"
                  style={{ width: `${(selectedEvent.checklist.filter((c) => c.done).length / selectedEvent.checklist.length) * 100}%` }}/>
              </div>
              <p className={`text-[11px] font-medium mt-2 ${isLightMode ? "text-[#6F6B66]" : "text-white/35"}`}>
                {selectedEvent.checklist.filter((c) => c.done).length} / {selectedEvent.checklist.length} completed
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
