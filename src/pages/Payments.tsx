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
  { label:"Total Paid",     value:"₹8.35L", color:"#EF4444", icon:"💸" },
  { label:"Pending",        value:"₹3.15L", color:"#F59E0B", icon:"⏳" },
  { label:"Refunds",        value:"₹25K",   color:"#10B981", icon:"↩️"  },
  { label:"Budget Left",    value:"₹6.00L", color:"#6A38FF", icon:"💰" },
];

const paymentMethods = [
  { type:"UPI",  icon:"📱", last4:"", label:"Google Pay / PhonePe",    primary:true  },
  { type:"Card", icon:"💳", last4:"4242", label:"Visa •••• 4242",        primary:false },
  { type:"NEFT", icon:"🏦", last4:"",    label:"HDFC Bank Savings",      primary:false },
];

type Tab = "Transactions" | "Split Pay" | "Methods" | "Invoices";

export default function Payments() {
  const [activeTab, setActiveTab] = useState<Tab>("Transactions");
  const [splitAmt,  setSplitAmt]  = useState(500000);
  const [splitParts, setSplitParts] = useState(3);

  const tabs: Tab[] = ["Transactions","Split Pay","Methods","Invoices"];
  const perPart = Math.round(splitAmt / splitParts);

  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-[1440px] mx-auto">

        {/* Header */}
        <div className="flex flex-wrap items-center gap-5 mb-8">
          <div>
            <h1 className="font-display font-700 text-3xl">Payments <span className="grad-primary">&amp; Billing</span></h1>
            <p className="text-white/45 text-[13px] mt-0.5">Priya Sharma · Premium Account · Member since Jan 2023</p>
          </div>
          <button className="btn-primary ml-auto">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M8 1v14M1 8h14"/></svg>
            Make a Payment
          </button>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {summary.map(s => (
            <div key={s.label} className="glass rounded-2xl p-5 border border-white/9 hover-lift-sm">
              <div className="text-2xl mb-2">{s.icon}</div>
              <div className="font-display font-800 text-2xl mb-0.5" style={{ color:s.color }}>{s.value}</div>
              <div className="text-white/45 text-[12px]">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1.5 mb-7 overflow-x-auto pb-1">
          {tabs.map(t => (
            <button key={t} onClick={() => setActiveTab(t)}
              className={`px-5 py-2.5 rounded-xl text-[13px] font-medium whitespace-nowrap border transition-all shrink-0 ${
                activeTab === t ? "tab-active" : "glass border-white/8 text-white/55 hover:border-white/22 hover:text-white"
              }`}>
              {t}
            </button>
          ))}
        </div>

        {/* ── Transactions ── */}
        {activeTab === "Transactions" && (
          <div className="animate-fade-in glass rounded-2xl border border-white/9 overflow-hidden">
            <div className="px-6 py-4 border-b border-white/7 flex items-center justify-between">
              <h3 className="font-display font-600 text-[15px]">Transaction History</h3>
              <button className="text-[12px] text-purple-400 hover:text-purple-300 flex items-center gap-1">
                Download Statement
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M7 2v7M4 6l3 3 3-3M2 11h10"/></svg>
              </button>
            </div>
            <div className="divide-y divide-white/5">
              {transactions.map(tx => (
                <div key={tx.id} className="px-6 py-4 flex flex-wrap items-center gap-4 hover:bg-white/3 transition-colors">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0 ${tx.type === "credit" ? "bg-green-500/15" : tx.status === "pending" ? "bg-amber-500/15" : "bg-red-500/10"}`}>
                    {tx.type === "credit" ? "↩" : "↗"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-[14px] text-white truncate">{tx.desc}</div>
                    <div className="text-white/38 text-[11px] mt-0.5">{tx.id} · {tx.date} · via {tx.method}</div>
                  </div>
                  <div className={`font-display font-700 text-[16px] ${tx.type === "credit" ? "text-green-400" : tx.status === "pending" ? "text-amber-400" : "text-white"}`}>
                    {tx.type === "credit" ? "+" : "-"}₹{(tx.amount / 1000).toFixed(0)}K
                  </div>
                  <span className={`chip ${tx.status === "paid" ? "chip-confirmed" : tx.status === "refunded" ? "chip-complete" : "chip-contacted"}`}>
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
            <div className="glass rounded-2xl p-7 border border-white/12">
              <h3 className="font-display font-600 text-[18px] mb-1">Split Payment Planner</h3>
              <p className="text-white/45 text-[13px] mb-6">Divide your event cost across family members or installments.</p>

              <div className="mb-5">
                <label className="block text-[12px] text-white/45 mb-2 uppercase tracking-wider">Total Amount</label>
                <div className="font-display font-800 text-4xl grad-primary mb-3">
                  ₹{splitAmt >= 100000 ? `${(splitAmt/100000).toFixed(1)}L` : `${(splitAmt/1000).toFixed(0)}K`}
                </div>
                <input type="range" min={100000} max={5000000} step={50000} value={splitAmt}
                  onChange={e => setSplitAmt(Number(e.target.value))} className="w-full" />
              </div>

              <div className="mb-6">
                <label className="block text-[12px] text-white/45 mb-2 uppercase tracking-wider">Split between {splitParts} people</label>
                <div className="flex gap-2">
                  {[2,3,4,5,6].map(n => (
                    <button key={n} onClick={() => setSplitParts(n)}
                      className={`flex-1 py-2.5 rounded-xl text-[13px] font-semibold border transition-all ${
                        splitParts === n ? "border-purple-500 bg-purple-500/18 text-purple-300" : "glass border-white/10 text-white/55"
                      }`}>
                      {n}
                    </button>
                  ))}
                </div>
              </div>

              <div className="glass rounded-xl p-4 border border-white/8 mb-5">
                <div className="text-[12px] text-white/45 mb-1">Each person pays</div>
                <div className="font-display font-800 text-3xl grad-gold">
                  ₹{perPart >= 100000 ? `${(perPart/100000).toFixed(2)}L` : `${(perPart/1000).toFixed(1)}K`}
                </div>
              </div>

              <div className="space-y-3 mb-6">
                {Array.from({ length: splitParts }, (_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold text-white"
                      style={{ background:`linear-gradient(135deg, #6A38FF, #8B5CF6)` }}>
                      {i+1}
                    </div>
                    <input placeholder={`Person ${i+1} (name or email)`} className="input-glass flex-1 px-3 py-2.5 text-[13px]" />
                    <span className="text-[12px] font-semibold text-green-400 whitespace-nowrap">
                      ₹{(perPart/1000).toFixed(1)}K
                    </span>
                  </div>
                ))}
              </div>

              <button className="btn-primary w-full justify-center">
                Send Payment Requests
              </button>
            </div>
          </div>
        )}

        {/* ── Payment Methods ── */}
        {activeTab === "Methods" && (
          <div className="animate-fade-in space-y-4 max-w-lg">
            {paymentMethods.map(pm => (
              <div key={pm.type} className={`glass rounded-2xl p-5 border ${pm.primary ? "border-purple-500/40" : "border-white/9"} flex items-center gap-4`}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                  style={{ background:"rgba(106,56,255,0.15)" }}>{pm.icon}</div>
                <div className="flex-1">
                  <div className="font-display font-600 text-[15px] text-white">{pm.label}</div>
                  <div className="text-white/40 text-[12px]">{pm.type}</div>
                </div>
                {pm.primary && <span className="chip chip-confirmed">Primary</span>}
                <button className="text-[12px] text-purple-400 hover:text-purple-300">Edit</button>
              </div>
            ))}
            <button className="w-full py-4 rounded-2xl glass border-2 border-dashed border-white/15 text-white/45 hover:border-purple-500/40 hover:text-purple-400 transition-all text-[13px] font-medium">
              + Add Payment Method
            </button>
          </div>
        )}

        {/* ── Invoices ── */}
        {activeTab === "Invoices" && (
          <div className="animate-fade-in space-y-3">
            {["INV-2025-001","INV-2025-002","INV-2024-089"].map((inv, i) => (
              <div key={inv} className="glass rounded-2xl px-6 py-4 border border-white/9 flex flex-wrap items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-purple-500/15 flex items-center justify-center text-lg">📄</div>
                <div className="flex-1">
                  <div className="font-medium text-[14px] text-white">{inv}</div>
                  <div className="text-white/38 text-[12px]">{["Priya & Arjun Wedding","Sharma Reunion","Parents Anniversary"][i]}</div>
                </div>
                <span className="chip chip-confirmed">Paid</span>
                <span className="font-display font-700 text-[15px] text-white">₹{["18L","4L","6.5L"][i]}</span>
                <button className="text-[12px] text-purple-400 hover:text-purple-300 flex items-center gap-1">
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
