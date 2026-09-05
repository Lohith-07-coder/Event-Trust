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

export default function ManagerDashboard() {
  const [selectedEvent, setSelectedEvent] = useState(events[0]);
  const [checklistState, setChecklistState] = useState<Record<string, boolean>>({});

  const toggleCheck = (task: string) => {
    setChecklistState((prev) => ({ ...prev, [task]: !prev[task] }));
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="flex flex-wrap items-center gap-5 mb-8">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center font-display font-700 text-xl text-white"
            style={{ background: "linear-gradient(135deg, #F59E0B, #EF4444)" }}>
            RM
          </div>
          <div>
            <h1 className="font-display font-700 text-2xl text-white">Rohan Mehra — Event Manager</h1>
            <p className="text-white/50 text-[13px]">Manager Dashboard · 2 Active Events · Senior Manager</p>
          </div>
          <div className="ml-auto flex gap-3">
            {[
              { label: "Assigned Events", value: "2" },
              { label: "Events Done", value: "47" },
              { label: "Client Rating", value: "4.9★" },
            ].map((s) => (
              <div key={s.label} className="glass rounded-xl px-4 py-2.5 text-center border border-white/10">
                <div className="font-display font-700 text-[18px] grad-primary">{s.value}</div>
                <div className="text-[11px] text-white/40">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Event list sidebar */}
          <div className="lg:w-72 shrink-0 space-y-3">
            <h3 className="font-600 text-[13px] text-white/50 uppercase tracking-wider mb-2">Assigned Events</h3>
            {events.map((e) => (
              <button key={e.id} onClick={() => setSelectedEvent(e)}
                className={`w-full text-left glass rounded-2xl p-4 border transition-all ${selectedEvent.id === e.id ? "border-purple-500/50 bg-purple-500/10" : "border-white/10 hover:border-white/25"}`}>
                <div className="font-display font-600 text-[14px] text-white">{e.name}</div>
                <div className="text-white/45 text-[12px] mt-0.5">📅 {e.date}</div>
                <div className={`mt-2 inline-block px-2 py-0.5 rounded-full text-[10px] font-medium ${e.stage >= 6 ? "status-confirmed" : "status-progress"}`}>
                  {pipeline[e.stage]}
                </div>
              </button>
            ))}
          </div>

          {/* Event detail */}
          <div className="flex-1 space-y-5 animate-fade-in">
            {/* Status pipeline */}
            <div className="glass rounded-2xl p-5 border border-white/10 overflow-x-auto">
              <h3 className="font-display font-600 text-[14px] text-white/60 mb-4">Event Pipeline</h3>
              <div className="flex items-center gap-1 min-w-max">
                {pipeline.map((stage, i) => (
                  <div key={stage} className="flex items-center gap-1">
                    <div className={`px-2.5 py-1.5 rounded-xl text-[10px] font-medium whitespace-nowrap transition-all ${
                      i < selectedEvent.stage ? "status-confirmed" :
                      i === selectedEvent.stage ? "status-progress" :
                      "text-white/25 border border-white/8"
                    }`}>
                      {i < selectedEvent.stage ? "✓ " : ""}{stage}
                    </div>
                    {i < pipeline.length - 1 && (
                      <div className={`w-3 h-px ${i < selectedEvent.stage ? "bg-green-500/50" : "bg-white/15"}`}/>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Event overview */}
            <div className="glass rounded-2xl p-6 border border-white/10">
              <div className="flex items-start justify-between flex-wrap gap-3 mb-5">
                <div>
                  <h2 className="font-display font-700 text-xl text-white">{selectedEvent.name}</h2>
                  <p className="text-white/50 text-[13px] mt-0.5">👤 {selectedEvent.client} · 📅 {selectedEvent.date}</p>
                </div>
                <div className="text-right">
                  <div className="font-display font-700 text-xl grad-primary">₹{(selectedEvent.budget / 100000).toFixed(0)}L</div>
                  <div className="text-white/40 text-[12px]">Total Budget</div>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <div className="glass rounded-xl p-3.5 border border-white/8">
                  <div className="text-[11px] text-white/40 mb-1">Venue</div>
                  <div className="text-[13px] font-medium text-white">{selectedEvent.venue}</div>
                </div>
                <div className="glass rounded-xl p-3.5 border border-white/8">
                  <div className="text-[11px] text-white/40 mb-1">Guest Count</div>
                  <div className="text-[13px] font-medium text-white">{selectedEvent.guests.toLocaleString()}</div>
                </div>
                <div className="glass rounded-xl p-3.5 border border-white/8">
                  <div className="text-[11px] text-white/40 mb-1">Event ID</div>
                  <div className="font-mono text-[13px] text-purple-300">{selectedEvent.id}</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Vendors */}
              <div className="glass rounded-2xl p-5 border border-white/10">
                <h3 className="font-600 text-[14px] text-white/60 mb-3">Vendor Allocation</h3>
                <div className="space-y-2.5">
                  {selectedEvent.vendors.map((v) => (
                    <div key={v} className="flex items-center gap-3 py-1">
                      <div className="w-2 h-2 rounded-full bg-green-400"/>
                      <span className="text-[13px] text-white/75 flex-1">{v}</span>
                      <span className="status-confirmed px-2 py-0.5 rounded-full text-[10px]">✓ Confirmed</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Workers */}
              <div className="glass rounded-2xl p-5 border border-white/10">
                <h3 className="font-600 text-[14px] text-white/60 mb-3">Worker Allocation</h3>
                <div className="space-y-2.5">
                  {Object.entries(selectedEvent.workers).map(([role, count]) => (
                    <div key={role} className="flex items-center justify-between">
                      <span className="text-[13px] text-white/75 capitalize">{role}</span>
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1">
                          {Array.from({ length: Math.min(count, 8) }).map((_, i) => (
                            <div key={i} className="w-4 h-4 rounded-full bg-purple-500/60"/>
                          ))}
                          {count > 8 && <span className="text-[11px] text-white/40">+{count - 8}</span>}
                        </div>
                        <span className="font-semibold text-white text-[13px]">{count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="glass rounded-2xl p-5 border border-amber-500/20">
              <h3 className="font-600 text-[14px] text-amber-400 mb-2">📝 Internal Notes</h3>
              <p className="text-white/65 text-[13px] leading-relaxed">{selectedEvent.notes}</p>
            </div>

            {/* Checklist */}
            <div className="glass rounded-2xl p-5 border border-white/10">
              <h3 className="font-display font-600 text-[15px] mb-4">Event Checklist</h3>
              <div className="space-y-3">
                {selectedEvent.checklist.map((item, i) => {
                  const key = `${selectedEvent.id}-${i}`;
                  const done = key in checklistState ? checklistState[key] : item.done;
                  return (
                    <button key={i} onClick={() => toggleCheck(key)}
                      className="w-full flex items-center gap-3 py-2 text-left group">
                      <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all shrink-0 ${done ? "border-purple-500 bg-purple-500" : "border-white/30 group-hover:border-purple-400"}`}>
                        {done && <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round"/></svg>}
                      </div>
                      <span className={`text-[13px] transition-all ${done ? "line-through text-white/35" : "text-white/75"}`}>{item.task}</span>
                    </button>
                  );
                })}
              </div>
              <div className="mt-4 h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full rounded-full progress-bar"
                  style={{ width: `${(selectedEvent.checklist.filter((c) => c.done).length / selectedEvent.checklist.length) * 100}%` }}/>
              </div>
              <p className="text-[11px] text-white/35 mt-2">
                {selectedEvent.checklist.filter((c) => c.done).length} / {selectedEvent.checklist.length} completed
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
