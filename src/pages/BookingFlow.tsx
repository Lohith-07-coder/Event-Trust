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
const COLORS = ["#B89B5E","#E8C98A","#10B981","#0EA5E9","#F59E0B","#8B5CF6","#EF4444","#D4AF37"];

/* ─── Step Indicator ────────────────────────────── */
function StepBar({ step, isLightMode = false }: { step: number; isLightMode?: boolean }) {
  return (
    <div className="mb-10">
      {/* Progress track */}
      <div className={`relative h-1.5 rounded-full mb-4 overflow-hidden ${isLightMode ? "bg-[#DED9CF]" : "bg-white/8"}`}>
        <div className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#E8C98A] to-[#B89B5E] transition-all duration-600"
          style={{ width:`${((step + 1) / STEPS.length) * 100}%` }} />
      </div>
      {/* Step labels */}
      <div className="flex justify-between text-[11px] font-bold overflow-x-auto gap-1">
        {STEPS.map((s, i) => (
          <span key={s} className={`whitespace-nowrap transition-colors ${
            i === step 
              ? (isLightMode ? "text-[#B89B5E] font-bold" : "text-[#E8C98A] font-semibold") 
              : i < step 
                ? "text-emerald-600" 
                : (isLightMode ? "text-[#6F6B66]" : "text-white/30")
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
    <div className="bg-[#111116] text-white rounded-xl px-3 py-2 text-[12px] border border-white/10 shadow-lg">
      <div className="font-semibold">{payload[0].name}</div>
      <div className="text-[#E8C98A] font-bold">₹{(payload[0].value / 1000).toFixed(0)}K</div>
    </div>
  );
}

/* ─── Main Component ─────────────────────────────── */
export default function BookingFlow({ isLightMode = false }: { isLightMode?: boolean }) {
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
      <div className={`min-h-screen pt-12 pb-20 px-6 flex items-center justify-center transition-colors duration-300 ${
        isLightMode ? "bg-[#F7F4EE] text-[#111116]" : "bg-[#0B0B14] text-[#F7F4EE]"
      }`}>
        <div className={`rounded-3xl p-12 border text-center max-w-md animate-scale-in ${
          isLightMode ? "bg-white border-[#DED9CF] shadow-lg text-[#111116]" : "bg-[#151522] border-white/10 text-white"
        }`}>
          <div className="w-20 h-20 rounded-3xl mx-auto flex items-center justify-center text-4xl mb-6 shadow-md"
            style={{ background:"linear-gradient(135deg, #E8C98A, #B89B5E)" }}>✅</div>
          <h2 className="font-serif font-bold text-3xl mb-3">Event Booked!</h2>
          <p className={`text-[14px] mb-2 font-medium ${isLightMode ? "text-[#6F6B66]" : "text-white/60"}`}>
            Your <strong className={isLightMode ? "text-[#111116]" : "text-white"}>{eventType}</strong> on <strong className={isLightMode ? "text-[#111116]" : "text-white"}>{date || "TBD"}</strong> is confirmed.
          </p>
          <p className={`text-[13px] mb-8 font-medium ${isLightMode ? "text-[#6F6B66]" : "text-white/40"}`}>
            Booking ID: <span className="font-mono font-bold text-[#B89B5E]">EVT-{Date.now().toString().slice(-6)}</span>
          </p>
          <div className="flex gap-3">
            <button onClick={() => { setConfirmed(false); setStep(0); setType(""); }}
              className={`flex-1 justify-center py-3 rounded-full font-bold border transition-all ${
                isLightMode ? "bg-[#F7F4EE] text-[#111116] border-[#DED9CF] hover:bg-[#EAE5DA]" : "btn-hero-outline"
              }`}>
              New Event
            </button>
            <button className="btn-gold-champagne flex-1 justify-center py-3 font-bold rounded-full">
              View Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen pt-10 pb-20 px-6 transition-colors duration-300 ${
      isLightMode ? "bg-[#F7F4EE] text-[#111116]" : "bg-[#0B0B14] text-[#F7F4EE]"
    }`}>
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <p className={`text-[11px] font-mono tracking-[0.25em] uppercase mb-2 font-bold ${
            isLightMode ? "text-[#6F6B66]" : "text-[#B89B5E]"
          }`}>Multi-step Wizard</p>
          <h1 className={`font-serif font-bold text-4xl md:text-5xl mb-2 ${isLightMode ? "text-[#111116]" : "text-white"}`}>
            Plan Your <span className="grad-champagne">Event</span>
          </h1>
          <p className={`text-[14px] font-medium ${isLightMode ? "text-[#6F6B66]" : "text-white/50"}`}>
            Complete all steps and your event will be confirmed instantly.
          </p>
        </div>

        <StepBar step={step} isLightMode={isLightMode} />

        <div className={`rounded-3xl p-8 border relative overflow-hidden ${
          isLightMode ? "bg-white border-[#DED9CF] shadow-sm text-[#111116]" : "bg-[#151522] border-white/10 text-white"
        }`}>
          {/* Step glow accent */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#E8C98A] to-[#B89B5E]" />

          {/* ── Step 0: Event Type ── */}
          {step === 0 && (
            <div className="animate-fade-in">
              <h2 className="font-serif font-bold text-2xl mb-1">What type of event are you planning?</h2>
              <p className={`text-[13px] mb-6 font-medium ${isLightMode ? "text-[#6F6B66]" : "text-white/40"}`}>
                This helps us tailor venue, vendor and budget recommendations.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {EVENT_TYPES.map(e => (
                  <button key={e.label} onClick={() => setType(e.label)}
                    className={`group rounded-2xl p-5 flex flex-col items-center gap-2.5 border transition-all hover:scale-105 ${
                      isLightMode
                        ? eventType === e.label
                          ? "border-[#B89B5E] bg-[#B89B5E]/10 shadow-sm text-[#111116] font-bold"
                          : "bg-white border-[#DED9CF] hover:border-[#B89B5E] text-[#111116]"
                        : eventType === e.label
                          ? "border-[#B89B5E] bg-[#B89B5E]/20 text-white"
                          : "bg-[#1C1C2B] border-white/10 hover:border-white/25 text-white"
                    }`}>
                    <span className="text-3xl group-hover:scale-110 transition-transform">{e.icon}</span>
                    <span className="text-[13px] font-bold">{e.label}</span>
                    <span className={`text-[10px] text-center leading-tight font-medium ${isLightMode ? "text-[#6F6B66]" : "text-white/40"}`}>{e.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── Step 1: Date & Time ── */}
          {step === 1 && (
            <div className="animate-fade-in space-y-6">
              <div>
                <h2 className="font-serif font-bold text-2xl mb-1">When is your event?</h2>
                <p className={`text-[13px] font-medium ${isLightMode ? "text-[#6F6B66]" : "text-white/40"}`}>
                  Book at least 14 days in advance for guaranteed availability.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className={`block text-[12px] mb-2 uppercase tracking-wider font-bold ${isLightMode ? "text-[#6F6B66]" : "text-white/45"}`}>Event Date *</label>
                  <input type="date" value={date} onChange={e => setDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    className={`w-full px-4 py-3.5 text-[15px] rounded-xl border transition-all ${
                      isLightMode ? "bg-[#F7F4EE] border-[#DED9CF] text-[#111116] focus:bg-white focus:border-[#B89B5E] outline-none" : "bg-[#1C1C2B] border-white/15 text-white"
                    }`} />
                </div>
                <div>
                  <label className={`block text-[12px] mb-2 uppercase tracking-wider font-bold ${isLightMode ? "text-[#6F6B66]" : "text-white/45"}`}>Start Time</label>
                  <input type="time" value={time} onChange={e => setTime(e.target.value)}
                    className={`w-full px-4 py-3.5 text-[15px] rounded-xl border transition-all ${
                      isLightMode ? "bg-[#F7F4EE] border-[#DED9CF] text-[#111116] focus:bg-white focus:border-[#B89B5E] outline-none" : "bg-[#1C1C2B] border-white/15 text-white"
                    }`} />
                </div>
              </div>
              {/* Popular time slots */}
              <div>
                <div className={`text-[12px] mb-3 font-semibold ${isLightMode ? "text-[#6F6B66]" : "text-white/35"}`}>Popular time slots</div>
                <div className="flex flex-wrap gap-2">
                  {["07:00","10:00","12:00","16:00","18:00","19:30","20:00"].map(t => (
                    <button key={t} onClick={() => setTime(t)}
                      className={`px-3.5 py-1.5 rounded-xl text-[12px] font-bold border transition-all ${
                        isLightMode
                          ? time === t ? "border-[#B89B5E] bg-[#B89B5E] text-[#111116] shadow-sm" : "bg-[#F7F4EE] border-[#DED9CF] text-[#111116] hover:bg-[#EAE5DA]"
                          : time === t ? "border-[#B89B5E] bg-[#B89B5E]/20 text-[#E8C98A]" : "bg-[#1C1C2B] border-white/10 text-white/60 hover:border-white/25"
                      }`}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div className={`rounded-2xl p-4 border ${
                isLightMode ? "bg-[#B89B5E]/10 border-[#B89B5E]/30 text-[#111116]" : "bg-[#1C1C2B] border-[#B89B5E]/30 text-[#E8C98A]"
              }`}>
                <p className="text-[13px] font-medium">💡 <strong>Pro tip:</strong> Weekday events can save up to 30% on venue costs vs. weekends.</p>
              </div>
            </div>
          )}

          {/* ── Step 2: Guest Count ── */}
          {step === 2 && (
            <div className="animate-fade-in space-y-7">
              <div>
                <h2 className="font-serif font-bold text-2xl mb-1">How many guests?</h2>
                <p className={`text-[13px] font-medium ${isLightMode ? "text-[#6F6B66]" : "text-white/40"}`}>Include family, friends, and all attendees.</p>
              </div>
              <div className="text-center py-6">
                <div className={`font-mono font-extrabold text-8xl mb-1 ${isLightMode ? "text-[#B89B5E]" : "grad-champagne"}`}>{guests}</div>
                <div className={`text-[15px] font-semibold ${isLightMode ? "text-[#6F6B66]" : "text-white/40"}`}>guests expected</div>
              </div>
              <input type="range" min={10} max={2000} step={10} value={guests}
                onChange={e => setGuests(Number(e.target.value))} className="w-full accent-[#B89B5E]" />
              <div className={`flex justify-between text-[11px] font-semibold mt-1 ${isLightMode ? "text-[#6F6B66]" : "text-white/30"}`}>
                <span>10</span><span>250</span><span>500</span><span>1000</span><span>2000+</span>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {[50,100,200,300,500,1000].map(g => (
                  <button key={g} onClick={() => setGuests(g)}
                    className={`py-2.5 rounded-xl text-[12px] font-bold border transition-all ${
                      isLightMode
                        ? guests === g ? "border-[#B89B5E] bg-[#B89B5E] text-[#111116] shadow-sm" : "bg-[#F7F4EE] border-[#DED9CF] text-[#111116] hover:bg-[#EAE5DA]"
                        : guests === g ? "border-[#B89B5E] bg-[#B89B5E]/20 text-[#E8C98A]" : "bg-[#1C1C2B] border-white/10 text-white/60 hover:border-white/25"
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
                <h2 className="font-serif font-bold text-2xl mb-1">What is your total budget?</h2>
                <p className={`text-[13px] font-medium ${isLightMode ? "text-[#6F6B66]" : "text-white/40"}`}>Our AI will allocate this intelligently across all selected services.</p>
              </div>
              <div className="text-center py-4">
                <div className={`font-mono font-extrabold text-7xl mb-1 ${isLightMode ? "text-[#B89B5E]" : "grad-champagne"}`}>
                  {budget >= 100000 ? `₹${(budget / 100000).toFixed(1)}L` : `₹${(budget / 1000).toFixed(0)}K`}
                </div>
                <div className={`text-[15px] font-semibold ${isLightMode ? "text-[#6F6B66]" : "text-white/40"}`}>total event budget</div>
              </div>
              <input type="range" min={50000} max={5000000} step={25000} value={budget}
                onChange={e => setBudget(Number(e.target.value))} className="w-full accent-[#B89B5E]" />
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {[100000,300000,500000,1000000,2000000,5000000].map(b => (
                  <button key={b} onClick={() => setBudget(b)}
                    className={`py-2.5 rounded-xl text-[11px] font-bold border transition-all ${
                      isLightMode
                        ? budget === b ? "border-[#B89B5E] bg-[#B89B5E] text-[#111116] shadow-sm" : "bg-[#F7F4EE] border-[#DED9CF] text-[#111116] hover:bg-[#EAE5DA]"
                        : budget === b ? "border-[#B89B5E] bg-[#B89B5E]/20 text-[#E8C98A]" : "bg-[#1C1C2B] border-white/10 text-white/60 hover:border-white/25"
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
              <h2 className="font-serif font-bold text-2xl mb-1">Which services do you need?</h2>
              <p className={`text-[13px] mb-6 font-medium ${isLightMode ? "text-[#6F6B66]" : "text-white/40"}`}>Select all that apply — we&apos;ll match you with verified providers for each.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SERVICES.map((s, i) => {
                  const on = services.includes(s.id);
                  return (
                    <button key={s.id} onClick={() => toggleService(s.id)}
                      className={`flex items-center gap-4 p-4 rounded-2xl border transition-all text-left ${
                        isLightMode
                          ? on ? "border-[#B89B5E] bg-[#B89B5E]/10 shadow-sm text-[#111116]" : "bg-white border-[#DED9CF] hover:border-[#B89B5E] text-[#111116]"
                          : on ? "border-[#B89B5E] bg-[#B89B5E]/15 text-white" : "bg-[#1C1C2B] border-white/10 hover:border-white/22 text-white"
                      }`}>
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0"
                        style={{ background: isLightMode ? (on ? "#B89B5E" : "#F7F4EE") : (on ? `${COLORS[i]}25` : "rgba(255,255,255,0.07)") }}>
                        {s.icon}
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-[14px]">{s.label}</div>
                        <div className={`text-[11px] font-medium ${isLightMode ? "text-[#6F6B66]" : "text-white/40"}`}>{s.desc}</div>
                      </div>
                      <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all ${
                        on 
                          ? "border-[#B89B5E] bg-[#B89B5E]" 
                          : (isLightMode ? "border-[#DED9CF]" : "border-white/25")
                      }`}>
                        {on && <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2 2 4-4" stroke="#111116" strokeWidth="2" strokeLinecap="round"/></svg>}
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
                <h2 className="font-serif font-bold text-2xl mb-1">How would you like to manage your event?</h2>
                <p className={`text-[13px] font-medium ${isLightMode ? "text-[#6F6B66]" : "text-white/40"}`}>Choose the level of support that works for you.</p>
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
                  badgeColor:"#B89B5E",
                },
              ].map(opt => (
                <button key={opt.id} onClick={() => setBookType(opt.id)}
                  className={`w-full flex items-start gap-4 p-6 rounded-2xl border text-left transition-all ${
                    isLightMode
                      ? bookType === opt.id ? "border-[#B89B5E] bg-[#B89B5E]/10 shadow-sm text-[#111116]" : "bg-white border-[#DED9CF] hover:border-[#B89B5E] text-[#111116]"
                      : bookType === opt.id ? "border-[#B89B5E] bg-[#B89B5E]/15 text-white" : "bg-[#1C1C2B] border-white/10 hover:border-white/22 text-white"
                  }`}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
                    style={{ background: isLightMode ? "#F7F4EE" : "rgba(184,155,94,0.18)" }}>{opt.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2.5 mb-1.5">
                      <span className="font-bold text-[16px]">{opt.title}</span>
                      <span className="chip text-[10px] font-bold"
                        style={{ background:`${opt.badgeColor}22`, color:opt.badgeColor, borderColor:`${opt.badgeColor}50` }}>
                        {opt.badge}
                      </span>
                    </div>
                    <p className={`text-[13px] leading-relaxed font-medium ${isLightMode ? "text-[#6F6B66]" : "text-white/60"}`}>{opt.desc}</p>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 mt-0.5 flex items-center justify-center shrink-0 ${
                    bookType === opt.id 
                      ? "border-[#B89B5E] bg-[#B89B5E]" 
                      : (isLightMode ? "border-[#DED9CF]" : "border-white/25")
                  }`}>
                    {bookType === opt.id && <div className="w-2 h-2 rounded-full bg-[#111116]" />}
                  </div>
                </button>
              ))}

              {bookType === "managed" && (
                <div className={`rounded-2xl p-5 border animate-slide-down space-y-2.5 ${
                  isLightMode ? "bg-[#B89B5E]/10 border-[#B89B5E]/30 text-[#111116]" : "bg-[#1C1C2B] border-[#B89B5E]/30 text-white"
                }`}>
                  {[
                    { l:"Total Budget",             v:`₹${(budget/100000).toFixed(2)}L`,           c: isLightMode ? "text-[#111116]" : "text-white"  },
                    { l:`Management Fee (${(MGMT_FEE*100).toFixed(0)}%)`, v:`−₹${(budget*MGMT_FEE/100000).toFixed(2)}L`, c:"text-[#B89B5E] font-bold" },
                  ].map(r => (
                    <div key={r.l} className="flex justify-between text-[13px]">
                      <span className={isLightMode ? "text-[#6F6B66]" : "text-white/55"}>{r.l}</span>
                      <span className={`font-semibold ${r.c}`}>{r.v}</span>
                    </div>
                  ))}
                  <div className={`h-px ${isLightMode ? "bg-[#DED9CF]" : "bg-white/10"}`} />
                  <div className="flex justify-between">
                    <span className="text-[14px] font-bold">Available for Services</span>
                    <span className="font-extrabold text-[16px] text-[#B89B5E]">₹{(netBudget/100000).toFixed(2)}L</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── Step 6: Confirmation ── */}
          {step === 6 && (
            <div className="animate-fade-in space-y-6">
              <div>
                <h2 className="font-serif font-bold text-2xl mb-1">Review & Confirm</h2>
                <p className={`text-[13px] font-medium ${isLightMode ? "text-[#6F6B66]" : "text-white/40"}`}>Everything looks good? Confirm to book your event.</p>
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
                  <div key={item.label} className={`rounded-2xl p-4 border ${
                    isLightMode ? "bg-[#F7F4EE] border-[#DED9CF]" : "bg-[#1C1C2B] border-white/10"
                  }`}>
                    <div className={`text-[10px] uppercase tracking-wider mb-1 font-bold ${isLightMode ? "text-[#6F6B66]" : "text-white/35"}`}>{item.label}</div>
                    <div className="font-bold text-[15px]">{item.value}</div>
                  </div>
                ))}
              </div>

              {/* Budget pie chart */}
              <div className={`rounded-2xl p-6 border ${
                isLightMode ? "bg-white border-[#DED9CF] shadow-sm" : "bg-[#1C1C2B] border-white/10"
              }`}>
                <div className={`text-[12px] uppercase tracking-wider mb-5 font-bold ${isLightMode ? "text-[#6F6B66]" : "text-white/45"}`}>Budget Allocation</div>
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
                        <span className={`text-[13px] font-medium flex-1 ${isLightMode ? "text-[#111116]" : "text-white/65"}`}>{item.name}</span>
                        <span className="text-[13px] font-bold">₹{(item.value/1000).toFixed(0)}K</span>
                        <div className={`w-16 h-1.5 rounded-full overflow-hidden ${isLightMode ? "bg-[#F7F4EE]" : "bg-white/8"}`}>
                          <div className="h-full rounded-full" style={{ width:`${(item.value/netBudget)*100}%`, background:COLORS[i % COLORS.length] }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <button onClick={() => setConfirmed(true)} className="btn-gold-champagne w-full justify-center py-4 text-[15px] font-bold rounded-full">
                Confirm & Book Event →
              </button>
            </div>
          )}

          {/* ── Navigation ── */}
          <div className={`flex justify-between items-center mt-8 pt-6 border-t ${isLightMode ? "border-[#DED9CF]" : "border-white/10"}`}>
            <button onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0}
              className={`py-2.5 px-5 rounded-full font-bold text-[13px] disabled:opacity-25 disabled:cursor-not-allowed transition-all ${
                isLightMode ? "bg-[#F7F4EE] text-[#111116] border border-[#DED9CF] hover:bg-[#EAE5DA]" : "btn-hero-outline"
              }`}>
              ← Back
            </button>
            <span className={`text-[12px] font-mono font-bold ${isLightMode ? "text-[#6F6B66]" : "text-white/30"}`}>{step + 1} / {STEPS.length}</span>
            {step < 6 && (
              <button onClick={() => setStep(s => s + 1)} disabled={!canAdvance}
                className="btn-gold-champagne py-2.5 px-6 rounded-full font-bold text-[13px] disabled:opacity-40 disabled:cursor-not-allowed transition-all">
                Continue →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
