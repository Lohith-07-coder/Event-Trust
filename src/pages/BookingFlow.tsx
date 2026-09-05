import { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

/* ─── Constants ─────────────────────────────────── */
const EVENT_TYPES = [
  { icon:"💍", label:"Wedding",       desc:"The most important day of your life"   },
  { icon:"🎂", label:"Birthday",      desc:"Milestone celebrations done right"     },
  { icon:"🏢", label:"Corporate",     desc:"Professional events & conferences"     },
  { icon:"🎓", label:"Graduation",    desc:"Celebrate academic achievements"       },
  { icon:"🎵", label:"Concert",       desc:"Live music & entertainment shows"      },
  { icon:"🍽️", label:"Private Dinner",desc:"Intimate fine dining experiences"     },
  { icon:"🎉", label:"Festival",      desc:"Cultural & community celebrations"     },
  { icon:"🏆", label:"Award Night",   desc:"Galas, felicitations & ceremonies"     },
];

const SERVICES = [
  { id:"venue",       label:"Venue",          icon:"🏛️", pct:30, desc:"Hall, garden, rooftop"    },
  { id:"catering",    label:"Catering",       icon:"🍽️", pct:25, desc:"Food & beverages"         },
  { id:"decor",       label:"Decoration",     icon:"🌸", pct:15, desc:"Floral, lighting, theme"  },
  { id:"photography", label:"Photography",    icon:"📸", pct:10, desc:"Photo & videography"      },
  { id:"music",       label:"DJ & Music",     icon:"🎵", pct:8,  desc:"Sound & entertainment"   },
  { id:"workers",     label:"Staff",          icon:"👷", pct:6,  desc:"Servers, security, crew" },
  { id:"makeup",      label:"Makeup",         icon:"💄", pct:4,  desc:"Bridal & event styling"  },
  { id:"transport",   label:"Transport",      icon:"🚗", pct:2,  desc:"Shuttle & valet"         },
];

const STEPS  = ["Event Type","Date & Time","Guest Count","Budget","Services","Booking Type","Confirm"];
const COLORS = ["#6A38FF","#8B5CF6","#0EA5E9","#10B981","#F59E0B","#EF4444","#EC4899","#D4AF37"];

/* ─── Step Indicator ────────────────────────────── */
function StepBar({ step }: { step: number }) {
  return (
    <div className="mb-10">
      {/* Progress track */}
      <div className="relative h-1 bg-white/8 rounded-full mb-4 overflow-hidden">
        <div className="absolute inset-y-0 left-0 rounded-full progress-bar transition-all duration-600"
          style={{ width:`${((step + 1) / STEPS.length) * 100}%` }} />
      </div>
      {/* Step labels */}
      <div className="flex justify-between text-[11px] text-white/30 overflow-x-auto gap-1">
        {STEPS.map((s, i) => (
          <span key={s} className={`whitespace-nowrap transition-colors ${
            i === step ? "text-purple-400 font-semibold" : i < step ? "text-green-400" : ""
          }`}>
            {i < step ? "✓ " : ""}{s}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── Custom Tooltip ────────────────────────────── */
function ChartTooltip({ active, payload }: { active?: boolean; payload?: Array<{ name: string; value: number }> }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-strong rounded-xl px-3 py-2 text-[12px] border border-white/15">
      <div className="font-semibold text-white">{payload[0].name}</div>
      <div className="text-purple-300">₹{(payload[0].value / 1000).toFixed(0)}K</div>
    </div>
  );
}

/* ─── Main ──────────────────────────────────────── */
export default function BookingFlow() {
  const [step,     setStep]     = useState(0);
  const [eventType, setType]    = useState("");
  const [date,      setDate]    = useState("");
  const [time,      setTime]    = useState("18:00");
  const [guests,    setGuests]  = useState(150);
  const [budget,    setBudget]  = useState(500000);
  const [services,  setServices] = useState<string[]>(["venue","catering","decor","photography"]);
  const [bookType,  setBookType] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const MGMT_FEE = 0.08;

  const toggleService = (id: string) =>
    setServices(p => p.includes(id) ? p.filter(s => s !== id) : [...p, id]);

  const netBudget  = bookType === "managed" ? budget * (1 - MGMT_FEE) : budget;
  const totalPct   = SERVICES.filter(s => services.includes(s.id)).reduce((a, s) => a + s.pct, 0);
  const chartData  = SERVICES
    .filter(s => services.includes(s.id))
    .map(s => ({ name: s.label, value: Math.round((s.pct / totalPct) * netBudget) }));

  const canAdvance = !(step === 0 && !eventType) && !(step === 5 && !bookType);

  if (confirmed) {
    return (
      <div className="min-h-screen pt-24 pb-20 px-6 flex items-center justify-center">
        <div className="glass rounded-3xl p-12 border border-green-500/30 text-center max-w-md animate-scale-in">
          <div className="w-20 h-20 rounded-3xl mx-auto flex items-center justify-center text-4xl mb-6 glow-green"
            style={{ background:"linear-gradient(135deg,#10B981,#059669)" }}>✅</div>
          <h2 className="font-display font-700 text-2xl text-white mb-3">Event Booked!</h2>
          <p className="text-white/55 text-[14px] mb-2">
            Your <strong className="text-white">{eventType}</strong> on <strong className="text-white">{date || "TBD"}</strong> is confirmed.
          </p>
          <p className="text-white/40 text-[13px] mb-8">Booking ID: <span className="font-mono text-purple-300">EVT-{Date.now().toString().slice(-6)}</span></p>
          <div className="flex gap-3">
            <button onClick={() => { setConfirmed(false); setStep(0); setType(""); }}
              className="btn-ghost flex-1 justify-center !py-3">
              New Event
            </button>
            <button className="btn-primary flex-1 justify-center !py-3">
              View Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-[12px] text-purple-400 font-semibold tracking-[0.25em] uppercase mb-2">Multi-step Wizard</p>
          <h1 className="font-display font-700 text-4xl mb-2">
            Plan Your <span className="grad-primary">Event</span>
          </h1>
          <p className="text-white/45 text-[14px]">Complete all steps and your event will be confirmed instantly.</p>
        </div>

        <StepBar step={step} />

        <div className="glass rounded-3xl p-8 border border-white/12 card-shine relative overflow-hidden">
          {/* Step glow accent */}
          <div className="absolute top-0 left-0 right-0 h-0.5 neon-line" />

          {/* ── Step 0: Event Type ── */}
          {step === 0 && (
            <div className="animate-fade-in">
              <h2 className="font-display font-600 text-xl mb-1">What type of event are you planning?</h2>
              <p className="text-white/40 text-[13px] mb-6">This helps us tailor venue, vendor and budget recommendations.</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {EVENT_TYPES.map(e => (
                  <button key={e.label} onClick={() => setType(e.label)}
                    className={`group glass rounded-2xl p-5 flex flex-col items-center gap-2.5 border transition-all hover:scale-105 ${
                      eventType === e.label
                        ? "border-purple-500 bg-purple-500/15 glow-primary-sm"
                        : "border-white/9 hover:border-white/22"
                    }`}>
                    <span className="text-3xl group-hover:scale-110 transition-transform">{e.icon}</span>
                    <span className="text-[13px] font-semibold text-white">{e.label}</span>
                    <span className="text-[10px] text-white/38 text-center leading-tight">{e.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── Step 1: Date & Time ── */}
          {step === 1 && (
            <div className="animate-fade-in space-y-6">
              <div>
                <h2 className="font-display font-600 text-xl mb-1">When is your event?</h2>
                <p className="text-white/40 text-[13px]">Book at least 14 days in advance for guaranteed availability.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[12px] text-white/45 mb-2 uppercase tracking-wider">Event Date *</label>
                  <input type="date" value={date} onChange={e => setDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    className="input-glass w-full px-4 py-3.5 text-[15px]" />
                </div>
                <div>
                  <label className="block text-[12px] text-white/45 mb-2 uppercase tracking-wider">Start Time</label>
                  <input type="time" value={time} onChange={e => setTime(e.target.value)}
                    className="input-glass w-full px-4 py-3.5 text-[15px]" />
                </div>
              </div>
              {/* Popular time slots */}
              <div>
                <div className="text-[12px] text-white/35 mb-3">Popular time slots</div>
                <div className="flex flex-wrap gap-2">
                  {["07:00","10:00","12:00","16:00","18:00","19:30","20:00"].map(t => (
                    <button key={t} onClick={() => setTime(t)}
                      className={`px-3 py-1.5 rounded-xl text-[12px] font-medium border transition-all ${
                        time === t ? "border-purple-500 bg-purple-500/18 text-purple-300" : "glass border-white/10 text-white/55 hover:border-white/25"
                      }`}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div className="glass rounded-2xl p-4 border border-amber-500/22">
                <p className="text-[13px] text-amber-400/90">💡 <strong>Pro tip:</strong> Weekday events can save up to 30% on venue costs vs. weekends.</p>
              </div>
            </div>
          )}

          {/* ── Step 2: Guest Count ── */}
          {step === 2 && (
            <div className="animate-fade-in space-y-7">
              <div>
                <h2 className="font-display font-600 text-xl mb-1">How many guests?</h2>
                <p className="text-white/40 text-[13px]">Include family, friends, and all attendees.</p>
              </div>
              <div className="text-center py-6">
                <div className="font-display font-800 text-8xl grad-primary mb-1">{guests}</div>
                <div className="text-white/40 text-[15px]">guests expected</div>
              </div>
              <input type="range" min={10} max={2000} step={10} value={guests}
                onChange={e => setGuests(Number(e.target.value))} className="w-full" />
              <div className="flex justify-between text-[11px] text-white/30 mt-1">
                <span>10</span><span>250</span><span>500</span><span>1000</span><span>2000+</span>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {[50,100,200,300,500,1000].map(g => (
                  <button key={g} onClick={() => setGuests(g)}
                    className={`py-2.5 rounded-xl text-[12px] font-semibold border transition-all ${
                      guests === g ? "border-purple-500 bg-purple-500/18 text-purple-300" : "glass border-white/10 text-white/55 hover:border-white/25"
                    }`}>
                    {g}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── Step 3: Budget ── */}
          {step === 3 && (
            <div className="animate-fade-in space-y-7">
              <div>
                <h2 className="font-display font-600 text-xl mb-1">What is your total budget?</h2>
                <p className="text-white/40 text-[13px]">Our AI will allocate this intelligently across all selected services.</p>
              </div>
              <div className="text-center py-4">
                <div className="font-display font-800 text-7xl grad-gold mb-1">
                  {budget >= 100000 ? `₹${(budget / 100000).toFixed(1)}L` : `₹${(budget / 1000).toFixed(0)}K`}
                </div>
                <div className="text-white/40 text-[15px]">total event budget</div>
              </div>
              <input type="range" min={50000} max={5000000} step={25000} value={budget}
                onChange={e => setBudget(Number(e.target.value))} className="w-full" />
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {[100000,300000,500000,1000000,2000000,5000000].map(b => (
                  <button key={b} onClick={() => setBudget(b)}
                    className={`py-2.5 rounded-xl text-[11px] font-semibold border transition-all ${
                      budget === b ? "border-amber-500/70 bg-amber-500/12 text-amber-400" : "glass border-white/10 text-white/55 hover:border-white/25"
                    }`}>
                    {b >= 100000 ? `₹${(b/100000).toFixed(0)}L` : `₹${(b/1000).toFixed(0)}K`}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── Step 4: Services ── */}
          {step === 4 && (
            <div className="animate-fade-in">
              <h2 className="font-display font-600 text-xl mb-1">Which services do you need?</h2>
              <p className="text-white/40 text-[13px] mb-6">Select all that apply — we&apos;ll match you with verified providers for each.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SERVICES.map((s, i) => {
                  const on = services.includes(s.id);
                  return (
                    <button key={s.id} onClick={() => toggleService(s.id)}
                      className={`flex items-center gap-4 p-4 rounded-2xl border transition-all text-left ${
                        on ? "border-purple-500 bg-purple-500/12" : "glass border-white/9 hover:border-white/22"
                      }`}>
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0"
                        style={{ background: on ? `${COLORS[i]}25` : "rgba(255,255,255,0.07)" }}>
                        {s.icon}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-[14px] text-white">{s.label}</div>
                        <div className="text-[11px] text-white/40">{s.desc}</div>
                      </div>
                      <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all ${
                        on ? "border-purple-500 bg-purple-500" : "border-white/25"
                      }`}>
                        {on && <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round"/></svg>}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── Step 5: Booking Type ── */}
          {step === 5 && (
            <div className="animate-fade-in space-y-5">
              <div>
                <h2 className="font-display font-600 text-xl mb-1">How would you like to manage your event?</h2>
                <p className="text-white/40 text-[13px]">Choose the level of support that works for you.</p>
              </div>
              {[
                {
                  id:"self",
                  title:"Services Only",
                  desc:"We book verified venues, vendors & workers. You coordinate directly.",
                  icon:"⚡",
                  badge:"DIY",
                  badgeColor:"#10B981",
                },
                {
                  id:"managed",
                  title:"Managed by EVENTTRUST",
                  desc:`A dedicated senior manager runs everything. ${(MGMT_FEE * 100).toFixed(0)}% management fee deducted first.`,
                  icon:"👑",
                  badge:"Premium",
                  badgeColor:"#D4AF37",
                },
              ].map(opt => (
                <button key={opt.id} onClick={() => setBookType(opt.id)}
                  className={`w-full flex items-start gap-4 p-6 rounded-2xl border text-left transition-all ${
                    bookType === opt.id ? "border-purple-500 bg-purple-500/12" : "glass border-white/9 hover:border-white/22"
                  }`}>
                  <div className="w-13 h-12 w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
                    style={{ background:"rgba(106,56,255,0.18)" }}>{opt.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2.5 mb-1.5">
                      <span className="font-display font-600 text-[16px] text-white">{opt.title}</span>
                      <span className="chip text-[10px] font-bold"
                        style={{ background:`${opt.badgeColor}22`, color:opt.badgeColor, borderColor:`${opt.badgeColor}50` }}>
                        {opt.badge}
                      </span>
                    </div>
                    <p className="text-white/52 text-[13px] leading-relaxed">{opt.desc}</p>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 mt-0.5 flex items-center justify-center shrink-0 ${
                    bookType === opt.id ? "border-purple-500 bg-purple-500" : "border-white/25"
                  }`}>
                    {bookType === opt.id && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                </button>
              ))}

              {bookType === "managed" && (
                <div className="glass rounded-2xl p-5 border border-amber-500/22 animate-slide-down space-y-2.5">
                  {[
                    { l:"Total Budget",             v:`₹${(budget/100000).toFixed(2)}L`,           c:"text-white"  },
                    { l:`Management Fee (${(MGMT_FEE*100).toFixed(0)}%)`, v:`−₹${(budget*MGMT_FEE/100000).toFixed(2)}L`, c:"text-amber-400" },
                  ].map(r => (
                    <div key={r.l} className="flex justify-between text-[13px]">
                      <span className="text-white/55">{r.l}</span>
                      <span className={`font-semibold ${r.c}`}>{r.v}</span>
                    </div>
                  ))}
                  <div className="h-px bg-white/10" />
                  <div className="flex justify-between">
                    <span className="text-[14px] font-semibold text-white">Available for Services</span>
                    <span className="font-display font-800 text-[16px] grad-primary">₹{(netBudget/100000).toFixed(2)}L</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── Step 6: Confirmation ── */}
          {step === 6 && (
            <div className="animate-fade-in space-y-6">
              <div>
                <h2 className="font-display font-600 text-xl mb-1">Review & Confirm</h2>
                <p className="text-white/40 text-[13px]">Everything looks good? Confirm to book your event.</p>
              </div>

              {/* Summary grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  { label:"Event Type",   value: eventType },
                  { label:"Date",         value: date || "TBD" },
                  { label:"Time",         value: time },
                  { label:"Guests",       value: guests.toLocaleString() },
                  { label:"Budget",       value: `₹${(budget/100000).toFixed(1)}L` },
                  { label:"Management",   value: bookType === "managed" ? "Full Service" : "DIY" },
                ].map(item => (
                  <div key={item.label} className="glass rounded-2xl p-4 border border-white/8">
                    <div className="text-[10px] text-white/35 uppercase tracking-wider mb-1">{item.label}</div>
                    <div className="font-display font-600 text-[15px] text-white">{item.value}</div>
                  </div>
                ))}
              </div>

              {/* Budget pie chart */}
              <div className="glass rounded-2xl p-6 border border-white/10">
                <div className="text-[12px] text-white/45 uppercase tracking-wider mb-5">Budget Allocation</div>
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <div style={{ width: 200, height: 200, minWidth: 200 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={chartData} cx="50%" cy="50%" innerRadius={58} outerRadius={88} paddingAngle={3} dataKey="value">
                          {chartData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                        </Pie>
                        <Tooltip content={<ChartTooltip />} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex-1 space-y-2.5">
                    {chartData.map((item, i) => (
                      <div key={item.name} className="flex items-center gap-3">
                        <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background:COLORS[i % COLORS.length] }} />
                        <span className="text-[13px] text-white/65 flex-1">{item.name}</span>
                        <span className="text-[13px] font-semibold text-white">₹{(item.value/1000).toFixed(0)}K</span>
                        <div className="w-16 h-1.5 bg-white/8 rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{ width:`${(item.value/netBudget)*100}%`, background:COLORS[i % COLORS.length] }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <button onClick={() => setConfirmed(true)} className="btn-primary w-full justify-center !py-4 !text-[15px]">
                Confirm & Book Event →
              </button>
            </div>
          )}

          {/* ── Navigation ── */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-white/7">
            <button onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0}
              className="btn-ghost !py-2.5 disabled:opacity-25 disabled:cursor-not-allowed">
              ← Back
            </button>
            <span className="text-[12px] text-white/25 font-mono">{step + 1} / {STEPS.length}</span>
            {step < 6 && (
              <button onClick={() => setStep(s => s + 1)} disabled={!canAdvance}
                className="btn-primary !py-2.5 disabled:opacity-40 disabled:cursor-not-allowed">
                Continue →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
