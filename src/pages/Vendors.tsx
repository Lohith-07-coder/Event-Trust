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
  isLightMode?: boolean;
}

function VendorDetail({ vendor, onBack, setPage, isLightMode = false }: VendorDetailProps) {
  return (
    <div className="animate-fade-in">
      <button onClick={onBack} className={`flex items-center gap-2 text-[13px] font-bold mb-6 transition-colors ${
        isLightMode ? "text-[#6F6B66] hover:text-[#111116]" : "text-white/60 hover:text-white"
      }`}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M10 3L5 8l5 5"/></svg>
        Back to vendors
      </button>
      <div className={`rounded-3xl overflow-hidden border ${
        isLightMode ? "bg-white border-[#DED9CF] text-[#111116] shadow-sm" : "bg-[#151522] border-white/12 text-white"
      }`}>
        <div className="h-48 flex items-center justify-center text-6xl" style={{ background: isLightMode ? "#F7F4EE" : "linear-gradient(135deg, rgba(184,155,94,0.2), rgba(232,201,138,0.1))" }}>
          {categories.find((c) => c.id === vendor.cat)?.icon || "⭐"}
        </div>
        <div className="p-8">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="font-serif font-bold text-2xl">{vendor.name}</h2>
                {vendor.verified && <span className="bg-emerald-500/10 text-emerald-700 border border-emerald-500/30 px-2.5 py-0.5 rounded-full text-[11px] font-bold">✓ Verified</span>}
              </div>
              <p className={`text-[14px] ${isLightMode ? "text-[#6F6B66]" : "text-white/50"}`}>📍 {vendor.city} · {categories.find((c) => c.id === vendor.cat)?.label}</p>
            </div>
            <div className="text-right">
              <div className="font-mono font-bold text-xl text-[#B89B5E]">{vendor.price}</div>
              <div className={`text-[12px] font-medium mt-1 ${vendor.available ? "text-emerald-600" : "text-rose-500"}`}>
                {vendor.available ? "Available" : "Booked"}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 mb-5">
            <span className="text-[#B89B5E] font-semibold">★ {vendor.rating}</span>
            <span className={`text-[13px] ${isLightMode ? "text-[#6F6B66]" : "text-white/40"}`}>({vendor.reviews} reviews)</span>
          </div>
          <p className={`text-[14px] leading-relaxed mb-6 ${isLightMode ? "text-[#6F6B66]" : "text-white/65"}`}>{vendor.desc}</p>
          {vendor.cat === "qr" && (
            <div className={`rounded-2xl p-5 border mb-6 ${
              isLightMode ? "bg-[#F7F4EE] border-[#DED9CF]" : "bg-[#1C1C2B] border-white/10"
            }`}>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">📱</span>
                <h4 className="font-serif font-bold text-[#111116]">Smart QR Features</h4>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[13px]">
                {["Digital Invitations", "Live RSVP Tracking", "Guest Check-in QR", "Seating Assignment", "Event Analytics", "WhatsApp Integration"].map((f) => (
                  <div key={f} className="flex items-center gap-2 font-medium text-[#6F6B66]">
                    <span className="text-emerald-600">✓</span>{f}
                  </div>
                ))}
              </div>
            </div>
          )}
          {vendor.cat === "brand" && (
            <div className={`rounded-2xl p-5 border mb-6 ${
              isLightMode ? "bg-[#F7F4EE] border-[#DED9CF]" : "bg-[#1C1C2B] border-white/10"
            }`}>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">🏷️</span>
                <h4 className="font-serif font-bold text-[#111116]">BrandWorks Products</h4>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {["🍶 Bottles", "☕ Cups", "👜 Bags", "🍽️ Plates", "🧻 Tissues", "📦 Boxes"].map((p) => (
                  <button key={p} onClick={() => setPage("brandworks")}
                    className={`rounded-xl py-3 text-[13px] font-semibold border transition-all ${
                      isLightMode ? "bg-white border-[#DED9CF] text-[#111116] hover:border-[#B89B5E]" : "bg-white/5 border-white/10 text-white hover:border-[#B89B5E]"
                    }`}>
                    {p}
                  </button>
                ))}
              </div>
            </div>
          )}
          <div className="flex gap-3">
            <button className="btn-gold-champagne flex-1 py-3.5 rounded-full font-bold justify-center">
              Book Vendor
            </button>
            <button className={`px-5 py-3.5 rounded-full font-bold border transition-all ${
              isLightMode ? "bg-[#F7F4EE] border-[#DED9CF] text-[#111116] hover:bg-[#EAE5DA]" : "btn-hero-outline"
            }`}>
              WhatsApp
            </button>
            <button className={`px-5 py-3.5 rounded-full font-bold border transition-all ${
              isLightMode ? "bg-[#F7F4EE] border-[#DED9CF] text-[#111116] hover:bg-[#EAE5DA]" : "btn-hero-outline"
            }`}>
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
  isLightMode?: boolean;
}

export default function Vendors({ setPage, isLightMode = false }: VendorsProps) {
  const [activeCat, setActiveCat] = useState("all");
  const [selected, setSelected] = useState<typeof vendors[0] | null>(null);

  const filtered = activeCat === "all" ? vendors : vendors.filter((v) => v.cat === activeCat);

  return (
    <div className={`min-h-screen pt-10 pb-20 px-6 transition-colors duration-300 ${
      isLightMode ? "bg-[#F7F4EE] text-[#111116]" : "bg-[#0B0B14] text-[#F7F4EE]"
    }`}>
      <div className="max-w-[1440px] mx-auto">
        <div className="mb-8">
          <p className={`text-[11px] font-mono tracking-[0.25em] uppercase mb-2 font-bold ${
            isLightMode ? "text-[#6F6B66]" : "text-[#B89B5E]"
          }`}>Verified Network</p>
          <h1 className={`font-serif font-bold text-3xl md:text-5xl mb-2 ${
            isLightMode ? "text-[#111116]" : "text-white"
          }`}>
            Premium <span className="grad-champagne">Vendors</span>
          </h1>
          <p className={`text-[14px] font-medium ${isLightMode ? "text-[#6F6B66]" : "text-white/50"}`}>{filtered.length} verified vendors available</p>
        </div>

        {/* Category pills */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-8">
          {categories.map((c) => {
            const isActive = activeCat === c.id;
            return (
              <button key={c.id} onClick={() => setActiveCat(c.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-[13px] font-bold whitespace-nowrap border transition-all shrink-0 ${
                  isLightMode
                    ? isActive
                      ? "btn-gold-champagne !px-4 !py-2.5 text-[#111116] shadow-md"
                      : "bg-white border-[#DED9CF] text-[#111116] hover:bg-[#EAE5DA]"
                    : isActive
                      ? "border-[#B89B5E] bg-[#B89B5E]/20 text-[#E8C98A]"
                      : "border-white/12 text-white/60 hover:border-white/25 hover:text-white bg-[#151522]"
                }`}>
                <span>{c.icon}</span>{c.label}
              </button>
            );
          })}
        </div>

        {selected ? (
          <VendorDetail vendor={selected} onBack={() => setSelected(null)} setPage={setPage} isLightMode={isLightMode}/>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((v) => (
              <button key={v.name} onClick={() => setSelected(v)}
                className={`rounded-3xl p-6 text-left border transition-all hover:-translate-y-1 ${
                  isLightMode
                    ? "bg-white border-[#DED9CF] shadow-sm text-[#111116] hover:border-[#B89B5E]"
                    : "bg-[#151522] border-white/10 hover:border-white/22 text-white"
                }`}>
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl ${
                    isLightMode ? "bg-[#F7F4EE] text-[#B89B5E]" : "bg-white/10 text-[#E8C98A]"
                  }`}>
                    {categories.find((c) => c.id === v.cat)?.icon}
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    {v.verified && <span className="bg-emerald-500/10 text-emerald-700 border border-emerald-500/30 px-2.5 py-0.5 rounded-full text-[10px] font-bold">✓ Verified</span>}
                    <span className={`text-[11px] font-bold ${v.available ? "text-emerald-600" : "text-rose-500"}`}>
                      {v.available ? "● Available" : "● Booked"}
                    </span>
                  </div>
                </div>
                <h3 className={`font-serif font-bold text-xl mb-1 ${isLightMode ? "text-[#111116]" : "text-white"}`}>{v.name}</h3>
                <p className={`text-[12px] font-medium mb-3 ${isLightMode ? "text-[#6F6B66]" : "text-white/45"}`}>📍 {v.city}</p>
                <p className={`text-[13px] leading-relaxed mb-4 line-clamp-2 ${isLightMode ? "text-[#6F6B66]" : "text-white/60"}`}>{v.desc}</p>
                <div className={`flex items-center justify-between pt-3 border-t ${isLightMode ? "border-[#DED9CF]" : "border-white/10"}`}>
                  <div className="font-mono font-bold text-[15px] text-[#B89B5E]">{v.price}</div>
                  <div className="text-[#B89B5E] text-[13px] font-bold">★ {v.rating} <span className={`${isLightMode ? "text-[#6F6B66]" : "text-white/35"} font-normal text-[11px]`}>({v.reviews})</span></div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
