import { useState } from "react";

const workerTypes = [
  { id: "servers", label: "Servers", icon: "🍽️", desc: "Professional food & beverage service staff", rate: 1200, minQty: 2 },
  { id: "security", label: "Security", icon: "🛡️", desc: "Trained security personnel & bouncers", rate: 1800, minQty: 1 },
  { id: "cleaners", label: "Cleaners", icon: "🧹", desc: "Pre & post event cleaning crew", rate: 800, minQty: 2 },
  { id: "kitchen", label: "Kitchen Staff", icon: "👨‍🍳", desc: "Cooks, helpers & kitchen managers", rate: 1500, minQty: 2 },
  { id: "setup", label: "Setup Crew", icon: "🔧", desc: "Stage, furniture & decor setup team", rate: 1000, minQty: 3 },
  { id: "coordinator", label: "Event Coordinator", icon: "📋", desc: "On-ground event coordination & management", rate: 3000, minQty: 1 },
  { id: "photography_assist", label: "Photography Assistant", icon: "📷", desc: "Camera assistants & lighting crew", rate: 1400, minQty: 1 },
  { id: "valet", label: "Valet Parking", icon: "🚗", desc: "Professional valet & parking management", rate: 900, minQty: 2 },
];

export default function Workers({ isLightMode = false }: { isLightMode?: boolean }) {
  const [selections, setSelections] = useState<Record<string, number>>({});
  const [date, setDate] = useState("");
  const [duration, setDuration] = useState(8);
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const setQty = (id: string, qty: number) => {
    setSelections((prev) => {
      if (qty === 0) {
        const n = { ...prev };
        delete n[id];
        return n;
      }
      return { ...prev, [id]: qty };
    });
  };

  const totalWorkers = Object.values(selections).reduce((a, b) => a + b, 0);
  const totalCost = workerTypes
    .filter((w) => selections[w.id])
    .reduce((sum, w) => sum + w.rate * selections[w.id] * duration, 0);

  return (
    <div className={`min-h-screen pt-10 pb-20 px-6 transition-colors duration-300 ${
      isLightMode ? "bg-[#F7F4EE] text-[#111116]" : "bg-[#0B0B14] text-[#F7F4EE]"
    }`}>
      <div className="max-w-[1440px] mx-auto">
        <div className="mb-10">
          <p className={`text-[11px] font-mono tracking-[0.25em] uppercase mb-2 font-bold ${
            isLightMode ? "text-[#6F6B66]" : "text-[#B89B5E]"
          }`}>Verified Staff & Crew</p>
          <h1 className={`font-serif font-bold text-3xl md:text-5xl mb-2 ${isLightMode ? "text-[#111116]" : "text-white"}`}>
            Skilled <span className="grad-champagne">Workers</span>
          </h1>
          <p className={`text-[14px] font-medium ${isLightMode ? "text-[#6F6B66]" : "text-white/50"}`}>
            All workers are background-verified and trained professionals
          </p>
        </div>

        {submitted ? (
          <div className={`rounded-3xl p-12 border text-center max-w-lg mx-auto animate-fade-in ${
            isLightMode ? "bg-white border-[#DED9CF] shadow-lg text-[#111116]" : "bg-[#151522] border-white/10 text-white"
          }`}>
            <div className="text-6xl mb-4">✅</div>
            <h2 className="font-serif font-bold text-2xl mb-2">Workers Requested!</h2>
            <p className={`text-[14px] mb-6 font-medium ${isLightMode ? "text-[#6F6B66]" : "text-white/55"}`}>
              Your booking for {totalWorkers} workers is confirmed. A manager will contact you within 2 hours.
            </p>
            <button onClick={() => { setSubmitted(false); setSelections({}); }}
              className="btn-gold-champagne px-8 py-3.5 rounded-full font-bold justify-center">
              Book More Workers
            </button>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Worker cards */}
            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {workerTypes.map((w) => {
                  const qty = selections[w.id] || 0;
                  return (
                    <div key={w.id} className={`rounded-3xl p-6 border transition-all ${
                      isLightMode
                        ? qty > 0 ? "bg-white border-[#B89B5E] shadow-sm" : "bg-white border-[#DED9CF] shadow-sm"
                        : qty > 0 ? "bg-[#151522] border-[#B89B5E]/50" : "bg-[#151522] border-white/10"
                    }`}>
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
                            style={{ background: isLightMode ? (qty > 0 ? "#B89B5E" : "#F7F4EE") : (qty > 0 ? "linear-gradient(135deg, #E8C98A, #B89B5E)" : "rgba(255,255,255,0.08)") }}>
                            {w.icon}
                          </div>
                          <div>
                            <h3 className="font-serif font-bold text-lg">{w.label}</h3>
                            <p className="font-mono text-xs font-semibold text-[#B89B5E]">₹{w.rate}/hr</p>
                          </div>
                        </div>
                      </div>
                      <p className={`text-[12.5px] leading-relaxed mb-5 font-medium ${isLightMode ? "text-[#6F6B66]" : "text-white/50"}`}>{w.desc}</p>
                      <div className="flex items-center justify-between">
                        <span className={`text-[12px] font-semibold ${isLightMode ? "text-[#6F6B66]" : "text-white/40"}`}>Select quantity:</span>
                        <div className="flex items-center gap-3">
                          <button onClick={() => setQty(w.id, Math.max(0, qty - 1))}
                            className={`w-8 h-8 rounded-full border flex items-center justify-center font-bold text-base transition-all ${
                              isLightMode ? "border-[#DED9CF] text-[#111116] hover:bg-[#EAE5DA]" : "border-white/20 text-white hover:bg-white/10"
                            }`}>
                            −
                          </button>
                          <span className="font-mono font-bold text-base w-6 text-center">{qty}</span>
                          <button onClick={() => setQty(w.id, qty + 1)}
                            className="btn-gold-champagne !w-8 !h-8 !p-0 rounded-full font-bold text-base justify-center">
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Sidebar Summary */}
            <div className="lg:w-96 shrink-0">
              <div className={`rounded-3xl p-6 border sticky top-24 ${
                isLightMode ? "bg-white border-[#DED9CF] shadow-sm text-[#111116]" : "bg-[#151522] border-white/10 text-white"
              }`}>
                <h3 className="font-serif font-bold text-xl mb-5">Booking Summary</h3>

                {/* Date Picker */}
                <div className="mb-5">
                  <label className={`block text-[11px] font-bold uppercase tracking-wider mb-2 ${isLightMode ? "text-[#6F6B66]" : "text-white/50"}`}>Event Date *</label>
                  <input type="date" value={date} onChange={(e) => setDate(e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border text-[13px] font-medium ${
                      isLightMode ? "bg-[#F7F4EE] border-[#DED9CF] text-[#111116] focus:bg-white focus:border-[#B89B5E] outline-none" : "bg-[#1C1C2B] border-white/15 text-white"
                    }`}/>
                </div>

                {/* Duration Slider */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className={`text-[11px] font-bold uppercase tracking-wider ${isLightMode ? "text-[#6F6B66]" : "text-white/50"}`}>Shift Duration</label>
                    <span className="font-mono text-sm font-bold text-[#B89B5E]">{duration} hours</span>
                  </div>
                  <input type="range" min={4} max={16} step={1} value={duration} onChange={(e) => setDuration(Number(e.target.value))}
                    className="w-full accent-[#B89B5E]"/>
                </div>

                {/* Worker List Breakdown */}
                <div className="space-y-3 mb-6 border-t border-b py-4" style={{ borderColor: isLightMode ? "#DED9CF" : "rgba(255,255,255,0.1)" }}>
                  {Object.entries(selections).length === 0 ? (
                    <p className={`text-xs italic text-center py-4 ${isLightMode ? "text-[#6F6B66]" : "text-white/40"}`}>No workers selected yet</p>
                  ) : (
                    Object.entries(selections).map(([id, qty]) => {
                      const w = workerTypes.find((x) => x.id === id)!;
                      return (
                        <div key={id} className="flex justify-between text-[13px] font-medium">
                          <span>{w.icon} {w.label} × {qty}</span>
                          <span className="font-mono font-bold text-[#B89B5E]">₹{(w.rate * qty * duration).toLocaleString()}</span>
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Total Cost */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className={`text-[11px] uppercase tracking-wider font-bold ${isLightMode ? "text-[#6F6B66]" : "text-white/40"}`}>Total Cost</div>
                    <div className="text-[11px] text-[#6F6B66]">{totalWorkers} staff for {duration} hrs</div>
                  </div>
                  <div className="font-mono text-2xl font-extrabold text-[#B89B5E]">₹{totalCost.toLocaleString()}</div>
                </div>

                {/* Additional Notes */}
                <div className="mb-6">
                  <textarea placeholder="Special instructions (dress code, shift timing)..." value={notes} onChange={(e) => setNotes(e.target.value)}
                    rows={3} className={`w-full p-3 rounded-xl border text-[13px] font-medium resize-none ${
                      isLightMode ? "bg-[#F7F4EE] border-[#DED9CF] text-[#111116] focus:bg-white focus:border-[#B89B5E] outline-none" : "bg-[#1C1C2B] border-white/15 text-white"
                    }`}/>
                </div>

                <button disabled={totalWorkers === 0 || !date} onClick={() => setSubmitted(true)}
                  className="btn-gold-champagne w-full py-4 rounded-full font-bold text-[14px] justify-center disabled:opacity-40 disabled:cursor-not-allowed">
                  Confirm Worker Booking →
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
