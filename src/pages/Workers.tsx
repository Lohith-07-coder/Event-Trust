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

export default function Workers() {
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
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-[1440px] mx-auto">
        <div className="mb-10">
          <h1 className="font-display font-700 text-3xl md:text-4xl mb-2">
            Skilled <span className="grad-primary">Workers</span>
          </h1>
          <p className="text-white/50 text-[14px]">All workers are background-verified and trained professionals</p>
        </div>

        {submitted ? (
          <div className="glass rounded-3xl p-12 border border-green-500/30 text-center max-w-lg mx-auto animate-fade-in">
            <div className="text-6xl mb-4">✅</div>
            <h2 className="font-display font-700 text-2xl text-white mb-2">Workers Requested!</h2>
            <p className="text-white/55 text-[14px] mb-6">Your booking for {totalWorkers} workers is confirmed. A manager will contact you within 2 hours.</p>
            <button onClick={() => { setSubmitted(false); setSelections({}); }}
              className="px-8 py-3.5 rounded-2xl font-semibold text-white"
              style={{ background: "linear-gradient(135deg, #6A38FF, #8B5CF6)" }}>
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
                    <div key={w.id} className={`glass rounded-3xl p-6 border transition-all ${qty > 0 ? "border-purple-500/40" : "border-white/10"}`}>
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
                            style={{ background: qty > 0 ? "linear-gradient(135deg, #6A38FF, #8B5CF6)" : "rgba(255,255,255,0.08)" }}>
                            {w.icon}
                          </div>
                          <div>
                            <h3 className="font-display font-600 text-[15px] text-white">{w.label}</h3>
                            <div className="text-white/50 text-[11px]">₹{w.rate.toLocaleString()}/person/shift</div>
                          </div>
                        </div>
                        {qty > 0 && (
                          <span className="status-progress px-2.5 py-1 rounded-full text-[11px]">
                            {qty} added
                          </span>
                        )}
                      </div>
                      <p className="text-white/55 text-[13px] mb-4">{w.desc}</p>

                      {/* Quantity selector */}
                      <div className="flex items-center gap-3">
                        <button onClick={() => setQty(w.id, Math.max(0, qty - 1))}
                          className="w-9 h-9 rounded-xl glass border border-white/15 text-white/70 hover:border-white/40 hover:text-white transition-all flex items-center justify-center">
                          −
                        </button>
                        <span className="w-10 text-center font-display font-600 text-[18px] text-white">{qty}</span>
                        <button onClick={() => setQty(w.id, qty + 1)}
                          className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-medium transition-all"
                          style={{ background: "linear-gradient(135deg, #6A38FF, #8B5CF6)" }}>
                          +
                        </button>
                        {qty === 0 && (
                          <button onClick={() => setQty(w.id, w.minQty)}
                            className="ml-auto text-[12px] text-purple-400 hover:text-purple-300 transition-colors">
                            + Add {w.minQty}
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Booking summary sidebar */}
            <div className="lg:w-80 shrink-0 space-y-5">
              <div className="glass rounded-2xl p-6 border border-white/12 sticky top-24">
                <h3 className="font-display font-600 text-[16px] mb-5">Booking Summary</h3>

                {/* Date */}
                <div className="mb-4">
                  <label className="block text-[12px] text-white/50 mb-2 uppercase tracking-wider">Event Date</label>
                  <input type="date" value={date} onChange={(e) => setDate(e.target.value)}
                    className="input-glass w-full px-4 py-3 text-[14px]"
                    min={new Date().toISOString().split("T")[0]}/>
                </div>

                {/* Duration */}
                <div className="mb-5">
                  <label className="block text-[12px] text-white/50 mb-2 uppercase tracking-wider">Duration: {duration} hours</label>
                  <input type="range" min={4} max={16} step={1} value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))} className="w-full"/>
                  <div className="flex justify-between text-[11px] text-white/35 mt-1">
                    <span>4h</span><span>16h</span>
                  </div>
                </div>

                {/* Selected workers */}
                {Object.keys(selections).length > 0 ? (
                  <div className="space-y-2 mb-5">
                    {workerTypes.filter((w) => selections[w.id]).map((w) => (
                      <div key={w.id} className="flex items-center justify-between text-[13px]">
                        <span className="text-white/65">{w.icon} {selections[w.id]}× {w.label}</span>
                        <span className="text-white font-medium">₹{(w.rate * selections[w.id] * duration / 1000).toFixed(1)}K</span>
                      </div>
                    ))}
                    <div className="h-px bg-white/10 my-3"/>
                    <div className="flex justify-between">
                      <span className="text-[13px] text-white/60">Total Workers</span>
                      <span className="font-semibold text-white">{totalWorkers}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[13px] text-white/60">Total Cost</span>
                      <span className="font-display font-700 text-[17px] grad-primary">
                        ₹{totalCost >= 100000 ? `${(totalCost / 100000).toFixed(1)}L` : `${(totalCost / 1000).toFixed(1)}K`}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6 text-white/35 text-[13px] mb-4">
                    No workers selected yet. Add workers from the grid.
                  </div>
                )}

                {/* Special requirements */}
                <div className="mb-5">
                  <label className="block text-[12px] text-white/50 mb-2 uppercase tracking-wider">Special Requirements</label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                    placeholder="Uniform color, language preference, certifications..."
                    className="input-glass w-full px-4 py-3 text-[13px] resize-none"
                  />
                </div>

                <button
                  disabled={Object.keys(selections).length === 0 || !date}
                  onClick={() => setSubmitted(true)}
                  className="w-full py-4 rounded-2xl font-semibold text-white text-[15px] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  style={{ background: "linear-gradient(135deg, #6A38FF, #8B5CF6)" }}>
                  {Object.keys(selections).length === 0 ? "Select Workers First" : `Confirm ${totalWorkers} Workers`}
                </button>

                <p className="text-[11px] text-white/35 text-center mt-3">
                  Background verified · Free cancellation up to 72h before
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
