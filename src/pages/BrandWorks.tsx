import { useState } from "react";

const products = [
  { id: "bottle", label: "Branded Bottle", icon: "🍶", basePrice: 85, desc: "500ml premium glass bottle with UV print logo" },
  { id: "cup", label: "Logo Cup", icon: "☕", basePrice: 45, desc: "16oz double-wall cup with full-colour wrap" },
  { id: "bag", label: "Gift Bag", icon: "👜", basePrice: 120, desc: "Kraft paper bag with silk ribbon & foil stamp" },
  { id: "plate", label: "Custom Plate", icon: "🍽️", basePrice: 180, desc: "Ceramic plate with event date & logo engraving" },
  { id: "tissue", label: "Tissue Pack", icon: "🧻", basePrice: 18, desc: "3-ply tissue pack with custom band wrapper" },
  { id: "box", label: "Gift Box", icon: "📦", basePrice: 220, desc: "Rigid gift box with magnetic closure & insert" },
];

const colorOptions = ["#6A38FF", "#8B5CF6", "#D4AF37", "#EC4899", "#10B981", "#0EA5E9", "#EF4444", "#F59E0B"];

export default function BrandWorks() {
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
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-[1440px] mx-auto">
        <div className="mb-10">
          <h1 className="font-display font-700 text-3xl md:text-4xl mb-2">
            Brand<span className="grad-gold">Works</span>
          </h1>
          <p className="text-white/50 text-[14px]">Custom-branded event merchandise with your logo — premium quality, fast delivery</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Product selector */}
          <div className="lg:w-64 shrink-0 space-y-2">
            {products.map((p) => (
              <button key={p.id} onClick={() => setSelected(p)}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl border transition-all text-left ${
                  selected.id === p.id ? "border-amber-500/50 bg-amber-500/10" : "glass border-white/10 hover:border-white/25"
                }`}>
                <span className="text-2xl">{p.icon}</span>
                <div>
                  <div className="font-medium text-[14px] text-white">{p.label}</div>
                  <div className="text-[12px] text-white/40">from ₹{p.basePrice}/unit</div>
                </div>
              </button>
            ))}
          </div>

          {/* Preview + configurator */}
          <div className="flex-1 flex flex-col lg:flex-row gap-6">
            {/* Live preview */}
            <div className="lg:w-72 shrink-0">
              <div className="glass rounded-3xl p-8 border border-white/12 text-center sticky top-24">
                <div className="text-[12px] text-white/40 uppercase tracking-wider mb-4">Live Preview</div>

                {/* Product visual */}
                <div className="relative mx-auto mb-6" style={{ width: 160, height: 200 }}>
                  {/* Base shape */}
                  {selected.id === "bottle" && (
                    <div className="w-full h-full flex flex-col items-center">
                      <div className="w-8 h-6 rounded-t-lg" style={{ background: color, opacity: 0.8 }}/>
                      <div className="w-24 flex-1 rounded-2xl relative overflow-hidden shadow-2xl"
                        style={{ background: `linear-gradient(135deg, ${color}CC, ${color}66)` }}>
                        <div className="absolute inset-2 rounded-xl bg-white/5 backdrop-blur-sm flex flex-col items-center justify-center gap-1 p-3">
                          <div className="font-display font-800 text-[11px] text-white text-center">{logoText}</div>
                          <div className="w-12 h-px bg-white/40"/>
                          <div className="text-[9px] text-white/70 text-center">{tagline}</div>
                        </div>
                        <div className="absolute left-0 top-1/4 w-full h-1/3 bg-white/10"/>
                      </div>
                    </div>
                  )}

                  {selected.id === "cup" && (
                    <div className="w-28 h-40 mx-auto relative rounded-b-2xl rounded-t-lg overflow-hidden shadow-2xl"
                      style={{ background: `linear-gradient(135deg, ${color}CC, ${color}66)` }}>
                      <div className="absolute inset-2 flex flex-col items-center justify-center gap-1">
                        <div className="font-display font-800 text-[11px] text-white">{logoText}</div>
                        <div className="w-12 h-px bg-white/40"/>
                        <div className="text-[9px] text-white/70 text-center">{tagline}</div>
                      </div>
                      <div className="absolute left-0 top-0 w-full h-6 rounded-lg" style={{ background: `${color}AA` }}/>
                    </div>
                  )}

                  {(selected.id === "bag" || selected.id === "box") && (
                    <div className="w-36 h-44 mx-auto relative rounded-2xl overflow-hidden shadow-2xl"
                      style={{ background: `linear-gradient(135deg, ${color}CC, ${color}44)`, border: `2px solid ${color}` }}>
                      <div className="absolute inset-3 flex flex-col items-center justify-center gap-2">
                        <div className="text-4xl">{selected.icon}</div>
                        <div className="font-display font-800 text-[12px] text-white text-center">{logoText}</div>
                        <div className="text-[9px] text-white/70 text-center">{tagline}</div>
                      </div>
                      {/* Ribbon */}
                      <div className="absolute top-0 left-0 right-0 h-1.5" style={{ background: "#D4AF37" }}/>
                    </div>
                  )}

                  {(selected.id === "plate" || selected.id === "tissue") && (
                    <div className="w-40 h-40 mx-auto relative rounded-full overflow-hidden shadow-2xl flex items-center justify-center"
                      style={{ background: `linear-gradient(135deg, ${color}30, ${color}10)`, border: `3px solid ${color}80` }}>
                      <div className="absolute inset-4 rounded-full border" style={{ borderColor: `${color}60` }}/>
                      <div className="text-center z-10">
                        <div className="text-3xl mb-1">{selected.icon}</div>
                        <div className="font-display font-800 text-[11px] text-white">{logoText}</div>
                        <div className="text-[9px] text-white/60">{tagline}</div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="text-[13px] text-white/60 font-medium">{selected.label}</div>
                <div className="text-[11px] text-white/35 mt-1">{finish} Finish · {qty} units</div>

                {/* Price */}
                <div className="mt-5 glass rounded-2xl p-4 border border-amber-500/20">
                  <div className="font-display font-800 text-2xl grad-gold">₹{totalPrice.toLocaleString()}</div>
                  <div className="text-[11px] text-white/40 mt-0.5">₹{unitPrice.toFixed(0)}/unit</div>
                  {discount && (
                    <div className="text-[11px] text-green-400 mt-1">🎉 {discount}</div>
                  )}
                </div>
              </div>
            </div>

            {/* Config panel */}
            <div className="flex-1 space-y-5">
              {/* Product info */}
              <div className="glass rounded-2xl p-6 border border-white/10">
                <h3 className="font-display font-600 text-[16px] mb-1">{selected.label}</h3>
                <p className="text-white/55 text-[13px]">{selected.desc}</p>
              </div>

              {/* Logo text */}
              <div className="glass rounded-2xl p-6 border border-white/10 space-y-4">
                <h4 className="font-600 text-[14px] text-white/60 uppercase tracking-wider text-[12px]">Brand Details</h4>
                <div>
                  <label className="block text-[12px] text-white/45 mb-2">Brand / Company Name</label>
                  <input value={logoText} onChange={(e) => setLogoText(e.target.value)}
                    placeholder="Your brand name" className="input-glass w-full px-4 py-3 text-[14px]"/>
                </div>
                <div>
                  <label className="block text-[12px] text-white/45 mb-2">Tagline / Event Name</label>
                  <input value={tagline} onChange={(e) => setTagline(e.target.value)}
                    placeholder="Your tagline or event name" className="input-glass w-full px-4 py-3 text-[14px]"/>
                </div>
              </div>

              {/* Color picker */}
              <div className="glass rounded-2xl p-6 border border-white/10">
                <h4 className="font-600 text-[12px] text-white/60 uppercase tracking-wider mb-3">Brand Color</h4>
                <div className="flex flex-wrap gap-3">
                  {colorOptions.map((c) => (
                    <button key={c} onClick={() => setColor(c)}
                      className={`w-9 h-9 rounded-xl transition-all ${color === c ? "scale-125" : "hover:scale-110"}`}
                      style={{ background: c, boxShadow: color === c ? `0 0 15px ${c}80` : "none", outline: color === c ? `2px solid white` : "none", outlineOffset: 2 }}/>
                  ))}
                </div>
              </div>

              {/* Finish */}
              <div className="glass rounded-2xl p-6 border border-white/10">
                <h4 className="font-600 text-[12px] text-white/60 uppercase tracking-wider mb-3">Print Finish</h4>
                <div className="flex gap-3">
                  {["Matte", "Gloss", "Satin", "Metallic"].map((f) => (
                    <button key={f} onClick={() => setFinish(f)}
                      className={`px-4 py-2.5 rounded-xl text-[13px] font-medium border transition-all ${
                        finish === f ? "border-amber-500/50 text-amber-400 bg-amber-500/10" : "border-white/12 text-white/55 glass hover:border-white/25"
                      }`}>
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="glass rounded-2xl p-6 border border-white/10">
                <h4 className="font-600 text-[12px] text-white/60 uppercase tracking-wider mb-3">Quantity: {qty} units</h4>
                <input type="range" min={25} max={2000} step={25} value={qty}
                  onChange={(e) => setQty(Number(e.target.value))} className="w-full"/>
                <div className="flex justify-between text-[11px] text-white/35 mt-2">
                  <span>25</span>
                  {[100, 200, 500, 1000].map((q) => (
                    <button key={q} onClick={() => setQty(q)} className="hover:text-purple-400 transition-colors">{q}</button>
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
                      className={`py-2 rounded-xl text-[11px] text-center border transition-all ${qty >= t.qty ? "status-complete" : "border-white/10 text-white/45 glass hover:border-white/25"}`}>
                      <div className="font-semibold">{t.label}</div>
                      <div>{t.discount}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="flex gap-3">
                <button className="flex-1 py-4 rounded-2xl font-semibold text-[15px]"
                  style={{ background: "linear-gradient(135deg, #D4AF37, #B8860B)", color: "#05010A" }}>
                  Place Order — ₹{totalPrice.toLocaleString()}
                </button>
                <button className="px-6 py-4 rounded-2xl glass border border-white/20 text-white/80 font-medium hover:border-white/40 transition-all">
                  Get Quote
                </button>
              </div>
              <p className="text-[11px] text-white/30 text-center">
                Free design proof within 24h · 7-day delivery · 100% quality guarantee
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
