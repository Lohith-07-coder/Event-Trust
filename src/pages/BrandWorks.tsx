import { useState } from "react";

const products = [
  { id: "bottle", label: "Branded Bottle", icon: "🍶", basePrice: 85, desc: "500ml premium glass bottle with UV print logo" },
  { id: "cup", label: "Logo Cup", icon: "☕", basePrice: 45, desc: "16oz double-wall cup with full-colour wrap" },
  { id: "bag", label: "Gift Bag", icon: "👜", basePrice: 120, desc: "Kraft paper bag with silk ribbon & foil stamp" },
  { id: "plate", label: "Custom Plate", icon: "🍽️", basePrice: 180, desc: "Ceramic plate with event date & logo engraving" },
  { id: "tissue", label: "Tissue Pack", icon: "🧻", basePrice: 18, desc: "3-ply tissue pack with custom band wrapper" },
  { id: "box", label: "Gift Box", icon: "📦", basePrice: 220, desc: "Rigid gift box with magnetic closure & insert" },
];

const colorOptions = ["#B89B5E", "#E8C98A", "#111116", "#EC4899", "#10B981", "#0EA5E9", "#EF4444", "#F59E0B"];

export default function BrandWorks({ isLightMode = false }: { isLightMode?: boolean }) {
  const [selected, setSelected] = useState(products[0]);
  const [qty, setQty] = useState(100);
  const [color, setColor] = useState(colorOptions[0]);
  const [logoText, setLogoText] = useState("ABC Events");
  const [tagline, setTagline] = useState("Creating Memories");
  const [finish, setFinish] = useState("Matte");

  const unitPrice = selected.basePrice * (qty >= 500 ? 0.75 : qty >= 200 ? 0.85 : qty >= 100 ? 0.92 : 1);
  const totalPrice = Math.round(unitPrice * qty);
  const discount = qty >= 500 ? "25% bulk discount" : qty >= 200 ? "15% bulk discount" : qty >= 100 ? "8% bulk discount" : "";

  return (
    <div className={`min-h-screen pt-10 pb-20 px-6 transition-colors duration-300 ${
      isLightMode ? "bg-[#F7F4EE] text-[#111116]" : "bg-[#0B0B14] text-[#F7F4EE]"
    }`}>
      <div className="max-w-[1440px] mx-auto">
        <div className="mb-10">
          <p className={`text-[11px] font-mono tracking-[0.25em] uppercase mb-2 font-bold ${
            isLightMode ? "text-[#6F6B66]" : "text-[#B89B5E]"
          }`}>Custom Merchandise</p>
          <h1 className={`font-serif font-bold text-3xl md:text-5xl mb-2 ${isLightMode ? "text-[#111116]" : "text-white"}`}>
            Brand<span className="grad-champagne">Works</span>
          </h1>
          <p className={`text-[14px] font-medium ${isLightMode ? "text-[#6F6B66]" : "text-white/50"}`}>
            Custom-branded event merchandise with your logo — premium quality, fast delivery
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Product selector */}
          <div className="lg:w-64 shrink-0 space-y-2">
            {products.map((p) => {
              const isActive = selected.id === p.id;
              return (
                <button key={p.id} onClick={() => setSelected(p)}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl border transition-all text-left ${
                    isLightMode
                      ? isActive
                        ? "border-[#B89B5E] bg-white shadow-sm text-[#111116] font-bold"
                        : "bg-white/60 border-[#DED9CF] hover:border-[#B89B5E] text-[#111116]"
                      : isActive
                        ? "border-[#B89B5E] bg-[#151522] text-white font-bold"
                        : "glass border-white/8 hover:border-white/20 text-white/70"
                  }`}>
                  <span className="text-2xl">{p.icon}</span>
                  <div className="flex-1">
                    <div className="text-[14px] font-semibold">{p.label}</div>
                    <div className={`text-[11px] font-mono ${isLightMode ? "text-[#B89B5E]" : "text-[#E8C98A]"}`}>₹{p.basePrice}/unit</div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Center: Interactive Live Preview */}
          <div className="flex-1 space-y-6">
            <div className={`rounded-3xl p-8 border text-center flex flex-col items-center justify-center min-h-[380px] relative overflow-hidden ${
              isLightMode ? "bg-white border-[#DED9CF] shadow-sm text-[#111116]" : "bg-[#151522] border-white/10 text-white"
            }`}>
              {/* Product preview icon & mock canvas */}
              <div className="w-40 h-40 rounded-3xl mx-auto flex flex-col items-center justify-center relative shadow-xl transition-transform hover:scale-105 duration-300"
                style={{ background: color }}>
                <span className="text-6xl mb-2 filter drop-shadow-md">{selected.icon}</span>
                <div className="font-serif font-bold text-sm text-white px-2 tracking-wide text-center drop-shadow-md">{logoText}</div>
                {tagline && <div className="text-[9px] font-mono text-white/80 font-medium">{tagline}</div>}
              </div>

              <div className="mt-6">
                <span className="bg-emerald-500/10 text-emerald-700 border border-emerald-500/30 px-3 py-1 rounded-full text-[11px] font-bold">
                  Finish: {finish} · Custom Engraved
                </span>
              </div>
            </div>

            {/* Config controls */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Custom text & tagline */}
              <div className={`rounded-3xl p-6 border ${
                isLightMode ? "bg-white border-[#DED9CF] shadow-sm text-[#111116]" : "bg-[#151522] border-white/10 text-white"
              }`}>
                <h4 className={`text-[12px] uppercase tracking-wider font-bold mb-4 ${isLightMode ? "text-[#6F6B66]" : "text-white/60"}`}>Custom Branding Text</h4>
                <div className="space-y-4">
                  <div>
                    <label className={`block text-[11px] mb-1 font-semibold ${isLightMode ? "text-[#6F6B66]" : "text-white/45"}`}>Brand Name / Logo Text</label>
                    <input value={logoText} onChange={(e) => setLogoText(e.target.value)}
                      className={`w-full px-3.5 py-2.5 text-[13px] rounded-xl border ${
                        isLightMode ? "bg-[#F7F4EE] border-[#DED9CF] text-[#111116] focus:bg-white focus:border-[#B89B5E] outline-none" : "bg-[#1C1C2B] border-white/15 text-white"
                      }`}/>
                  </div>
                  <div>
                    <label className={`block text-[11px] mb-1 font-semibold ${isLightMode ? "text-[#6F6B66]" : "text-white/45"}`}>Event Tagline / Date</label>
                    <input value={tagline} onChange={(e) => setTagline(e.target.value)}
                      className={`w-full px-3.5 py-2.5 text-[13px] rounded-xl border ${
                        isLightMode ? "bg-[#F7F4EE] border-[#DED9CF] text-[#111116] focus:bg-white focus:border-[#B89B5E] outline-none" : "bg-[#1C1C2B] border-white/15 text-white"
                      }`}/>
                  </div>
                </div>
              </div>

              {/* Color & finish pickers */}
              <div className={`rounded-3xl p-6 border ${
                isLightMode ? "bg-white border-[#DED9CF] shadow-sm text-[#111116]" : "bg-[#151522] border-white/10 text-white"
              }`}>
                <h4 className={`text-[12px] uppercase tracking-wider font-bold mb-3 ${isLightMode ? "text-[#6F6B66]" : "text-white/60"}`}>Merchandise Color</h4>
                <div className="flex flex-wrap gap-2.5 mb-5">
                  {colorOptions.map((c) => (
                    <button key={c} onClick={() => setColor(c)}
                      className={`w-8 h-8 rounded-full shadow-md transition-transform hover:scale-110 ${color === c ? "ring-2 ring-offset-2 ring-[#B89B5E]" : ""}`}
                      style={{ background: c }}/>
                  ))}
                </div>

                <h4 className={`text-[12px] uppercase tracking-wider font-bold mb-2 ${isLightMode ? "text-[#6F6B66]" : "text-white/60"}`}>Print Finish</h4>
                <div className="flex gap-2">
                  {["Matte", "Gloss", "Metallic Foil"].map((f) => (
                    <button key={f} onClick={() => setFinish(f)}
                      className={`px-4 py-2.5 rounded-xl text-[13px] font-bold border transition-all ${
                        isLightMode
                          ? finish === f ? "btn-gold-champagne !px-4 !py-2.5 text-[#111116] shadow-sm" : "bg-[#F7F4EE] border-[#DED9CF] text-[#111116] hover:bg-[#EAE5DA]"
                          : finish === f ? "border-[#B89B5E] bg-[#B89B5E]/20 text-[#E8C98A]" : "border-white/12 text-white/55 bg-[#1C1C2B]"
                      }`}>
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className={`rounded-3xl p-6 border md:col-span-2 ${
                isLightMode ? "bg-white border-[#DED9CF] shadow-sm text-[#111116]" : "bg-[#151522] border-white/10 text-white"
              }`}>
                <h4 className={`text-[12px] uppercase tracking-wider font-bold mb-3 ${isLightMode ? "text-[#6F6B66]" : "text-white/60"}`}>Quantity: {qty} units {discount && <span className="text-[#B89B5E] font-bold">({discount})</span>}</h4>
                <input type="range" min={25} max={2000} step={25} value={qty}
                  onChange={(e) => setQty(Number(e.target.value))} className="w-full accent-[#B89B5E]"/>
                <div className={`flex justify-between text-[11px] font-semibold mt-2 ${isLightMode ? "text-[#6F6B66]" : "text-white/35"}`}>
                  <span>25</span>
                  {[100, 200, 500, 1000].map((q) => (
                    <button key={q} onClick={() => setQty(q)} className="hover:text-[#B89B5E] transition-colors font-bold">{q}</button>
                  ))}
                  <span>2000</span>
                </div>

                {/* Bulk tiers */}
                <div className="grid grid-cols-3 gap-2 mt-4">
                  {[
                    { qty: 100, label: "100+", discount: "8% off" },
                    { qty: 200, label: "200+", discount: "15% off" },
                    { qty: 500, label: "500+", discount: "25% off" },
                  ].map((t) => (
                    <button key={t.qty} onClick={() => setQty(t.qty)}
                      className={`py-2 rounded-xl text-[11px] text-center border font-bold transition-all ${
                        qty >= t.qty 
                          ? "bg-emerald-500/10 text-emerald-700 border-emerald-500/30" 
                          : (isLightMode ? "bg-[#F7F4EE] border-[#DED9CF] text-[#6F6B66] hover:bg-[#EAE5DA]" : "border-white/10 text-white/45 bg-[#1C1C2B]")
                      }`}>
                      <div>{t.label}</div>
                      <div>{t.discount}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="flex gap-3 md:col-span-2">
                <button className="btn-gold-champagne flex-1 py-4 font-bold text-[15px] rounded-full justify-center">
                  Place Order — ₹{totalPrice.toLocaleString()}
                </button>
                <button className={`px-6 py-4 rounded-full font-bold transition-all border ${
                  isLightMode ? "bg-[#F7F4EE] border-[#DED9CF] text-[#111116] hover:bg-[#EAE5DA]" : "btn-hero-outline"
                }`}>
                  Get Quote
                </button>
              </div>
              <p className={`text-[11px] text-center font-medium md:col-span-2 ${isLightMode ? "text-[#6F6B66]" : "text-white/30"}`}>
                Free design proof within 24h · 7-day delivery · 100% quality guarantee
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
