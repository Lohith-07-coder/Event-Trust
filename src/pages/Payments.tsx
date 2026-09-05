import { useState } from "react";

const transactions = [
  { id:"TXN-8821", date:"Sep 01, 2025", desc:"Venue Deposit — The Grand Pavilion",   amount: 540000, type:"debit",  status:"paid",    method:"UPI"   },
  { id:"TXN-8819", date:"Aug 28, 2025", desc:"Catering Advance — Spice & Aroma",     amount: 180000, type:"debit",  status:"paid",    method:"NEFT"  },
  { id:"TXN-8810", date:"Aug 22, 2025", desc:"Photography Deposit — Frames & Moments",amount: 35000, type:"debit",  status:"paid",    method:"Card"  },
  { id:"TXN-8802", date:"Aug 15, 2025", desc:"Platform Booking Fee",                 amount:  5000,  type:"debit",  status:"paid",    method:"UPI"   },
  { id:"TXN-8798", date:"Aug 10, 2025", desc:"Refund — DJ Cancelled",                amount: 25000,  type:"credit", status:"refunded",method:"NEFT"  },
  { id:"TXN-8792", date:"Aug 05, 2025", desc:"Décor Advance — Bliss Decor Studio",   amount: 80000,  type:"debit",  status:"pending", method:"Card"  },
];

const summary = [
  { label:"Total Paid",     value:"₹8.35L", color:"#B89B5E", icon:"💸" },
  { label:"Pending",        value:"₹3.15L", color:"#F59E0B", icon:"⏳" },
  { label:"Refunds",        value:"₹25K",   color:"#10B981", icon:"↩️"  },
  { label:"Budget Left",    value:"₹6.00L", color:"#B89B5E", icon:"💰" },
];

const paymentMethods = [
  { type:"UPI",  icon:"📱", last4:"", label:"Google Pay / PhonePe",    primary:true  },
  { type:"Card", icon:"💳", last4:"4242", label:"Visa •••• 4242",        primary:false },
  { type:"NEFT", icon:"🏦", last4:"",    label:"HDFC Bank Savings",      primary:false },
];

type Tab = "Transactions" | "Split Pay" | "Methods" | "Invoices";

export default function Payments({ isLightMode = false }: { isLightMode?: boolean }) {
  const [activeTab, setActiveTab] = useState<Tab>("Transactions");
  const [splitAmt,  setSplitAmt]  = useState(500000);
  const [splitParts, setSplitParts] = useState(3);

  const tabs: Tab[] = ["Transactions","Split Pay","Methods","Invoices"];
  const perPart = Math.round(splitAmt / splitParts);

  return (
    <div className={`min-h-screen pt-10 pb-20 px-6 transition-colors duration-300 ${
      isLightMode ? "bg-[#F7F4EE] text-[#111116]" : "bg-[#0B0B14] text-[#F7F4EE]"
    }`}>
      <div className="max-w-[1440px] mx-auto">

        {/* Header */}
        <div className="flex flex-wrap items-center gap-5 mb-8">
          <div>
            <p className={`text-[11px] font-mono tracking-[0.25em] uppercase mb-1 font-bold ${
              isLightMode ? "text-[#6F6B66]" : "text-[#B89B5E]"
            }`}>Financial Dashboard</p>
            <h1 className={`font-serif font-bold text-3xl md:text-5xl ${isLightMode ? "text-[#111116]" : "text-white"}`}>
              Payments <span className="grad-champagne">&amp; Billing</span>
            </h1>
            <p className={`text-[13px] mt-0.5 font-medium ${isLightMode ? "text-[#6F6B66]" : "text-white/45"}`}>Priya Sharma · Premium Account · Member since Jan 2023</p>
          </div>
          <button className="btn-gold-champagne ml-auto px-6 py-3 font-bold rounded-full flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M8 1v14M1 8h14"/></svg>
            Make a Payment
          </button>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {summary.map(s => (
            <div key={s.label} className={`rounded-2xl p-5 border ${
              isLightMode ? "bg-white border-[#DED9CF] shadow-sm text-[#111116]" : "bg-[#151522] border-white/10 text-white"
            }`}>
              <div className="text-2xl mb-2">{s.icon}</div>
              <div className="font-mono font-extrabold text-2xl mb-0.5 text-[#B89B5E]">{s.value}</div>
              <div className={`text-[12px] font-semibold ${isLightMode ? "text-[#6F6B66]" : "text-white/45"}`}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-7 overflow-x-auto pb-1">
          {tabs.map(t => {
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
                      : "border-white/10 text-white/60 hover:border-white/22 hover:text-white bg-[#151522]"
                }`}>
                {t}
              </button>
            );
          })}
        </div>

        {/* ── Transactions ── */}
        {activeTab === "Transactions" && (
          <div className={`animate-fade-in rounded-3xl border overflow-hidden ${
            isLightMode ? "bg-white border-[#DED9CF] shadow-sm text-[#111116]" : "bg-[#151522] border-white/10 text-white"
          }`}>
            <div className={`px-6 py-4 border-b flex items-center justify-between ${isLightMode ? "border-[#DED9CF]" : "border-white/10"}`}>
              <h3 className="font-serif font-bold text-lg">Transaction History</h3>
              <button className="text-[12px] font-bold flex items-center gap-1 text-[#B89B5E] hover:underline">
                Download Statement
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M7 2v7M4 6l3 3 3-3M2 11h10"/></svg>
              </button>
            </div>
            <div className={`divide-y ${isLightMode ? "divide-[#DED9CF]" : "divide-white/5"}`}>
              {transactions.map(tx => (
                <div key={tx.id} className={`px-6 py-4 flex flex-wrap items-center gap-4 transition-colors ${
                  isLightMode ? "hover:bg-[#F7F4EE]" : "hover:bg-white/5"
                }`}>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0 ${
                    tx.type === "credit" ? "bg-emerald-500/15 text-emerald-600" : tx.status === "pending" ? "bg-amber-500/15 text-amber-600" : "bg-rose-500/10 text-rose-600"
                  }`}>
                    {tx.type === "credit" ? "↩" : "↗"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-[14px] truncate">{tx.desc}</div>
                    <div className={`text-[11px] font-medium mt-0.5 ${isLightMode ? "text-[#6F6B66]" : "text-white/40"}`}>{tx.id} · {tx.date} · via {tx.method}</div>
                  </div>
                  <div className={`font-mono font-extrabold text-[16px] ${tx.type === "credit" ? "text-emerald-600" : tx.status === "pending" ? "text-amber-600" : (isLightMode ? "text-[#111116]" : "text-white")}`}>
                    {tx.type === "credit" ? "+" : "-"}₹{(tx.amount / 1000).toFixed(0)}K
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[11px] font-bold ${
                    tx.status === "paid"
                      ? "bg-emerald-500/10 text-emerald-700 border border-emerald-500/30"
                      : tx.status === "refunded"
                        ? "bg-sky-500/10 text-sky-700 border border-sky-500/30"
                        : "bg-amber-500/10 text-amber-700 border border-amber-500/30"
                  }`}>
                    {tx.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Split Pay ── */}
        {activeTab === "Split Pay" && (
          <div className="animate-fade-in space-y-6 max-w-lg">
            <div className={`rounded-3xl p-7 border ${
              isLightMode ? "bg-white border-[#DED9CF] shadow-sm text-[#111116]" : "bg-[#151522] border-white/10 text-white"
            }`}>
              <h3 className="font-serif font-bold text-xl mb-1">Split Payment Planner</h3>
              <p className={`text-[13px] mb-6 font-medium ${isLightMode ? "text-[#6F6B66]" : "text-white/45"}`}>Divide your event cost across family members or installments.</p>

              <div className="mb-5">
                <label className={`block text-[12px] mb-2 uppercase tracking-wider font-bold ${isLightMode ? "text-[#6F6B66]" : "text-white/45"}`}>Total Amount</label>
                <div className="font-mono font-extrabold text-4xl mb-3 text-[#B89B5E]">
                  ₹{splitAmt >= 100000 ? `${(splitAmt/100000).toFixed(1)}L` : `${(splitAmt/1000).toFixed(0)}K`}
                </div>
                <input type="range" min={100000} max={5000000} step={50000} value={splitAmt}
                  onChange={e => setSplitAmt(Number(e.target.value))} className="w-full accent-[#B89B5E]" />
              </div>

              <div className="mb-6">
                <label className={`block text-[12px] mb-2 uppercase tracking-wider font-bold ${isLightMode ? "text-[#6F6B66]" : "text-white/45"}`}>Split between {splitParts} people</label>
                <div className="flex gap-2">
                  {[2,3,4,5,6].map(n => (
                    <button key={n} onClick={() => setSplitParts(n)}
                      className={`flex-1 py-2.5 rounded-xl text-[13px] font-bold border transition-all ${
                        isLightMode
                          ? splitParts === n ? "btn-gold-champagne !px-3 !py-2.5 text-[#111116] shadow-sm" : "bg-[#F7F4EE] border-[#DED9CF] text-[#111116] hover:bg-[#EAE5DA]"
                          : splitParts === n ? "border-[#B89B5E] bg-[#B89B5E]/20 text-[#E8C98A]" : "bg-[#1C1C2B] border-white/10 text-white/55"
                      }`}>
                      {n}
                    </button>
                  ))}
                </div>
              </div>

              <div className={`rounded-xl p-4 border mb-5 ${
                isLightMode ? "bg-[#F7F4EE] border-[#DED9CF] text-[#111116]" : "bg-[#1C1C2B] border-white/10"
              }`}>
                <div className={`text-[12px] font-semibold mb-1 ${isLightMode ? "text-[#6F6B66]" : "text-white/45"}`}>Each person pays</div>
                <div className="font-mono font-extrabold text-3xl text-[#B89B5E]">
                  ₹{perPart >= 100000 ? `${(perPart/100000).toFixed(2)}L` : `${(perPart/1000).toFixed(1)}K`}
                </div>
              </div>

              <div className="space-y-3 mb-6">
                {Array.from({ length: splitParts }, (_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold text-[#111116] shadow-sm"
                      style={{ background:`linear-gradient(135deg, #E8C98A, #B89B5E)` }}>
                      {i+1}
                    </div>
                    <input placeholder={`Person ${i+1} (name or email)`} className={`flex-1 px-3 py-2.5 text-[13px] rounded-xl border transition-all ${
                      isLightMode ? "bg-[#F7F4EE] border-[#DED9CF] text-[#111116] focus:bg-white focus:border-[#B89B5E] outline-none" : "bg-[#1C1C2B] border-white/15 text-white"
                    }`} />
                    <span className="font-mono text-[12px] font-extrabold text-[#B89B5E] whitespace-nowrap">
                      ₹{(perPart/1000).toFixed(1)}K
                    </span>
                  </div>
                ))}
              </div>

              <button className="btn-gold-champagne w-full justify-center py-3.5 text-[15px] font-bold rounded-full">
                Send Payment Requests →
              </button>
            </div>
          </div>
        )}

        {/* ── Payment Methods ── */}
        {activeTab === "Methods" && (
          <div className="animate-fade-in space-y-4 max-w-lg">
            {paymentMethods.map(pm => (
              <div key={pm.type} className={`rounded-2xl p-5 border flex items-center gap-4 ${
                isLightMode
                  ? pm.primary ? "bg-white border-[#B89B5E] shadow-sm text-[#111116]" : "bg-white border-[#DED9CF] shadow-sm text-[#111116]"
                  : pm.primary ? "bg-[#151522] border-[#B89B5E]/40 text-white" : "bg-[#151522] border-white/10 text-white"
              }`}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                  style={{ background: isLightMode ? "#F7F4EE" : "rgba(184,155,94,0.15)" }}>{pm.icon}</div>
                <div className="flex-1">
                  <div className="font-bold text-[15px]">{pm.label}</div>
                  <div className={`text-[12px] font-medium ${isLightMode ? "text-[#6F6B66]" : "text-white/40"}`}>{pm.type}</div>
                </div>
                {pm.primary && <span className="bg-emerald-500/10 text-emerald-700 border border-emerald-500/30 px-3 py-1 rounded-full text-[11px] font-bold">Primary</span>}
                <button className="text-[12px] font-bold text-[#B89B5E] hover:underline">Edit</button>
              </div>
            ))}
            <button className={`w-full py-4 rounded-full border-2 border-dashed transition-all text-[13px] font-bold ${
              isLightMode ? "bg-[#F7F4EE] border-[#DED9CF] text-[#111116] hover:border-[#B89B5E]" : "bg-white/5 border-white/15 text-white/45 hover:border-[#B89B5E]"
            }`}>
              + Add Payment Method
            </button>
          </div>
        )}

        {/* ── Invoices ── */}
        {activeTab === "Invoices" && (
          <div className="animate-fade-in space-y-3">
            {["INV-2025-001","INV-2025-002","INV-2024-089"].map((inv, i) => (
              <div key={inv} className={`rounded-2xl px-6 py-4 border flex flex-wrap items-center gap-4 ${
                isLightMode ? "bg-white border-[#DED9CF] shadow-sm text-[#111116]" : "bg-[#151522] border-white/10 text-white"
              }`}>
                <div className="w-10 h-10 rounded-xl bg-[#B89B5E]/10 text-[#B89B5E] flex items-center justify-center text-lg font-bold">📄</div>
                <div className="flex-1">
                  <div className="font-bold text-[14px]">{inv}</div>
                  <div className={`text-[12px] font-medium ${isLightMode ? "text-[#6F6B66]" : "text-white/40"}`}>{["Priya & Arjun Wedding","Sharma Reunion","Parents Anniversary"][i]}</div>
                </div>
                <span className="bg-emerald-500/10 text-emerald-700 border border-emerald-500/30 px-3 py-1 rounded-full text-[11px] font-bold">Paid</span>
                <span className="font-mono font-extrabold text-[15px] text-[#B89B5E]">₹{["18L","4L","6.5L"][i]}</span>
                <button className="text-[12px] font-bold flex items-center gap-1 text-[#B89B5E] hover:underline">
                  Download
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 2v6M3 5l3 3 3-3M1 9h10"/></svg>
                </button>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
