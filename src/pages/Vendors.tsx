import { useState } from "react";

const categories = [
  { id: "all", label: "All", icon: "✨" },
  { id: "catering", label: "Catering", icon: "🍽️" },
  { id: "decor", label: "Decoration", icon: "🌸" },
  { id: "photo", label: "Photography", icon: "📸" },
  { id: "dj", label: "DJ & Music", icon: "🎵" },
  { id: "makeup", label: "Makeup", icon: "💄" },
  { id: "entertainment", label: "Entertainment", icon: "🎭" },
  { id: "qr", label: "Smart QR", icon: "📱" },
  { id: "brand", label: "BrandWorks", icon: "🏷️" },
];

const vendors = [
  { name: "Spice & Aroma Catering", cat: "catering", city: "Mumbai", rating: 4.9, reviews: 342, price: "₹450/plate", desc: "Multi-cuisine catering for 50–5000 guests. Hygienic, FSSAI certified.", portfolio: ["1414235077428-338989a2e8c0"], verified: true, available: true },
  { name: "Bliss Decor Studio", cat: "decor", city: "Delhi", rating: 4.8, reviews: 215, price: "From ₹80K", desc: "Luxury floral & theme decorations. Specializing in weddings & gala events.", portfolio: ["1460978812857-470c0b00fb01"], verified: true, available: true },
  { name: "Frames & Moments", cat: "photo", city: "Bangalore", rating: 5.0, reviews: 189, price: "₹35K/day", desc: "Award-winning photography & videography. Drone coverage included.", portfolio: ["1526046031180-77f6f6a4d1f3"], verified: true, available: false },
  { name: "DJ Karan Pro", cat: "dj", city: "Goa", rating: 4.7, reviews: 478, price: "₹25K/event", desc: "Top Bollywood & International sets. Full sound & lighting system.", portfolio: ["1493225457124-a3eb161ffa5f"], verified: true, available: true },
  { name: "Glam & Glow Artistry", cat: "makeup", city: "Hyderabad", rating: 4.9, reviews: 267, price: "₹15K/session", desc: "Bridal & event makeup with premium international products.", portfolio: [], verified: true, available: true },
  { name: "StarAct Entertainment", cat: "entertainment", city: "Mumbai", rating: 4.6, reviews: 134, price: "₹50K+", desc: "Live singers, dancers, emcees, magicians & circus acts for any event.", portfolio: [], verified: false, available: true },
  { name: "QRInvite Pro", cat: "qr", city: "Pan India", rating: 4.8, reviews: 98, price: "₹5K setup", desc: "Digital Smart QR invites, check-in systems, RSVP management.", portfolio: [], verified: true, available: true },
  { name: "PrintMark BrandWorks", cat: "brand", city: "Pan India", rating: 4.7, reviews: 156, price: "From ₹8K", desc: "Custom branded merchandise: bottles, cups, bags, tissues & more.", portfolio: [], verified: true, available: true },
  { name: "Royal Feast Catering", cat: "catering", city: "Jaipur", rating: 4.8, reviews: 298, price: "₹380/plate", desc: "Rajasthani & Mughlai speciality catering with live counters.", portfolio: [], verified: true, available: true },
];

interface VendorDetailProps {
  vendor: typeof vendors[0];
  onBack: () => void;
  setPage: (p: string) => void;
}

function VendorDetail({ vendor, onBack, setPage }: VendorDetailProps) {
  return (
    <div className="animate-fade-in">
      <button onClick={onBack} className="flex items-center gap-2 text-[13px] text-white/60 hover:text-white mb-6 transition-colors">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M10 3L5 8l5 5"/></svg>
        Back to vendors
      </button>
      <div className="glass rounded-3xl overflow-hidden border border-white/12">
        <div className="h-48 flex items-center justify-center text-6xl" style={{ background: "linear-gradient(135deg, rgba(106,56,255,0.2), rgba(139,92,246,0.1))" }}>
          {categories.find((c) => c.id === vendor.cat)?.icon || "⭐"}
        </div>
        <div className="p-8">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="font-display font-700 text-2xl text-white">{vendor.name}</h2>
                {vendor.verified && <span className="status-confirmed px-2 py-0.5 rounded-full text-[11px]">✓ Verified</span>}
              </div>
              <p className="text-white/50 text-[14px]">📍 {vendor.city} · {categories.find((c) => c.id === vendor.cat)?.label}</p>
            </div>
            <div className="text-right">
              <div className="font-display font-700 text-xl grad-primary">{vendor.price}</div>
              <div className={`text-[12px] font-medium mt-1 ${vendor.available ? "text-green-400" : "text-red-400"}`}>
                {vendor.available ? "Available" : "Booked"}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 mb-5">
            <span className="text-amber-400 font-semibold">★ {vendor.rating}</span>
            <span className="text-white/40 text-[13px]">({vendor.reviews} reviews)</span>
          </div>
          <p className="text-white/65 text-[14px] leading-relaxed mb-6">{vendor.desc}</p>
          {vendor.cat === "qr" && (
            <div className="glass rounded-2xl p-5 border border-purple-500/20 mb-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">📱</span>
                <h4 className="font-600 text-white">Smart QR Features</h4>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[13px] text-white/65">
                {["Digital Invitations", "Live RSVP Tracking", "Guest Check-in QR", "Seating Assignment", "Event Analytics", "WhatsApp Integration"].map((f) => (
                  <div key={f} className="flex items-center gap-2">
                    <span className="text-green-400">✓</span>{f}
                  </div>
                ))}
              </div>
            </div>
          )}
          {vendor.cat === "brand" && (
            <div className="glass rounded-2xl p-5 border border-amber-500/20 mb-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">🏷️</span>
                <h4 className="font-600 text-white">BrandWorks Products</h4>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {["🍶 Bottles", "☕ Cups", "👜 Bags", "🍽️ Plates", "🧻 Tissues", "📦 Boxes"].map((p) => (
                  <button key={p} onClick={() => setPage("brandworks")}
                    className="glass rounded-xl py-3 text-[13px] text-white/70 hover:text-white border border-white/10 hover:border-purple-500/40 transition-all">
                    {p}
                  </button>
                ))}
              </div>
            </div>
          )}
          <div className="flex gap-3">
            <button className="flex-1 py-3.5 rounded-2xl font-semibold text-white glow-primary"
              style={{ background: "linear-gradient(135deg, #6A38FF, #8B5CF6)" }}>
              Book Vendor
            </button>
            <button className="px-5 py-3.5 rounded-2xl glass border border-white/20 text-white/80 hover:border-white/40 transition-all">
              WhatsApp
            </button>
            <button className="px-5 py-3.5 rounded-2xl glass border border-white/20 text-white/80 hover:border-white/40 transition-all">
              Portfolio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface VendorsProps {
  setPage: (p: string) => void;
}

export default function Vendors({ setPage }: VendorsProps) {
  const [activeCat, setActiveCat] = useState("all");
  const [selected, setSelected] = useState<typeof vendors[0] | null>(null);

  const filtered = activeCat === "all" ? vendors : vendors.filter((v) => v.cat === activeCat);

  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-[1440px] mx-auto">
        <div className="mb-8">
          <h1 className="font-display font-700 text-3xl md:text-4xl mb-2">
            Premium <span className="grad-primary">Vendors</span>
          </h1>
          <p className="text-white/50 text-[14px]">{filtered.length} vendors available</p>
        </div>

        {/* Category pills */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-8">
          {categories.map((c) => (
            <button key={c.id} onClick={() => setActiveCat(c.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-medium whitespace-nowrap border transition-all shrink-0 ${
                activeCat === c.id ? "border-purple-500 bg-purple-500/18 text-purple-300" : "border-white/12 text-white/60 hover:border-white/25 hover:text-white glass"
              }`}>
              <span>{c.icon}</span>{c.label}
            </button>
          ))}
        </div>

        {selected ? (
          <VendorDetail vendor={selected} onBack={() => setSelected(null)} setPage={setPage}/>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((v) => (
              <button key={v.name} onClick={() => setSelected(v)}
                className="glass rounded-3xl p-6 text-left hover-lift border border-white/10 hover:border-white/22 transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
                    style={{ background: "linear-gradient(135deg, rgba(106,56,255,0.25), rgba(139,92,246,0.15))" }}>
                    {categories.find((c) => c.id === v.cat)?.icon}
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    {v.verified && <span className="status-confirmed px-2 py-0.5 rounded-full text-[10px]">✓ Verified</span>}
                    <span className={`text-[11px] font-medium ${v.available ? "text-green-400" : "text-red-400"}`}>
                      {v.available ? "● Available" : "● Booked"}
                    </span>
                  </div>
                </div>
                <h3 className="font-display font-600 text-[16px] text-white mb-1">{v.name}</h3>
                <p className="text-white/45 text-[12px] mb-3">📍 {v.city}</p>
                <p className="text-white/60 text-[13px] leading-relaxed mb-4 line-clamp-2">{v.desc}</p>
                <div className="flex items-center justify-between">
                  <div className="font-display font-700 text-[15px]" style={{ color: "#8B5CF6" }}>{v.price}</div>
                  <div className="text-amber-400 text-[13px] font-semibold">★ {v.rating} <span className="text-white/35 font-normal text-[11px]">({v.reviews})</span></div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
