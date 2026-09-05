import { useState } from "react";

const venues = [
  {
    name: "Palace Grounds Royal Pavilion",
    city: "Bangalore",
    cap: 2500,
    price: 350000,
    rating: 4.96,
    reviews: 340,
    type: "Heritage Venue",
    img: "1519167758481-83f550bb49b3",
    amenities: ["Palace Lawn", "VVIP Security", "Helipad Access", "AV Stage"],
    available: true,
    address: "Sadashivanagar, Palace Grounds, Bengaluru"
  },
  {
    name: "Nandi Hills Luxury Vineyard Resort",
    city: "Bangalore",
    cap: 850,
    price: 220000,
    rating: 4.92,
    reviews: 195,
    type: "Garden Venue",
    img: "1566073771259-6a8506099945",
    amenities: ["Vineyard Views", "Open Air Lawn", "Poolside Villa", "Haute Cuisine"],
    available: true,
    address: "Nandi Hills Road, Near Bengaluru"
  },
  {
    name: "Whitefield Glasshouse Pavilion",
    city: "Bangalore",
    cap: 600,
    price: 150000,
    rating: 4.88,
    reviews: 182,
    type: "Glasshouse",
    img: "1511795409834-ef04bbd61622",
    amenities: ["Glass Architecture", "Central AC", "Botanical Garden", "Valet"],
    available: true,
    address: "ITPL Main Road, Whitefield, Bengaluru"
  },
  {
    name: "Kanakapura Lakefront Estate",
    city: "Bangalore",
    cap: 500,
    price: 180000,
    rating: 4.91,
    reviews: 142,
    type: "Lakefront Villa",
    img: "1507525428034-b723cf961d3e",
    amenities: ["Lake View", "Private Pier", "Outdoor Stage", "Boutique Rooms"],
    available: true,
    address: "Kanakapura Road, Bengaluru"
  },
  {
    name: "The Leela Palace Royal Ballroom",
    city: "Bangalore",
    cap: 1200,
    price: 380000,
    rating: 4.97,
    reviews: 410,
    type: "Ballroom",
    img: "1519225421980-1bb2832ac795",
    amenities: ["5-Star Luxury", "Crystal Chandeliers", "Michelin Dining", "Valet"],
    available: true,
    address: "Old Airport Road, Kodihalli, Bengaluru"
  },
  {
    name: "Taj West End Heritage Gardens",
    city: "Bangalore",
    cap: 900,
    price: 280000,
    rating: 4.94,
    reviews: 260,
    type: "Heritage Venue",
    img: "1519167758481-83f550bb49b3",
    amenities: ["20-Acre Heritage Park", "Centenary Trees", "Banquet Hall", "AV"],
    available: true,
    address: "Race Course Road, Sampangi Rama Nagar, Bengaluru"
  },
  {
    name: "The Grand Pavilion",
    city: "Mumbai",
    cap: 1200,
    price: 180000,
    rating: 4.9,
    reviews: 248,
    type: "Banquet Hall",
    img: "1519167758481-83f550bb49b3",
    amenities: ["AC", "Parking", "Catering", "AV System"],
    available: true,
    address: "Worli Sea Face, Mumbai"
  },
  {
    name: "Royal Terrace Gardens",
    city: "Delhi",
    cap: 800,
    price: 120000,
    rating: 4.8,
    reviews: 184,
    type: "Garden Venue",
    img: "1540575467063-178a50c2df87",
    amenities: ["Rooftop", "Garden", "Valet", "Stage"],
    available: true,
    address: "Chhatarpur, New Delhi"
  },
  {
    name: "Oceanfront Palms Resort",
    city: "Goa",
    cap: 600,
    price: 250000,
    rating: 4.95,
    reviews: 310,
    type: "Beach Venue",
    img: "1507525428034-b723cf961d3e",
    amenities: ["Beachfront", "Pool Side", "Sunset Lawn", "DJ Setup"],
    available: true,
    address: "Candolim Beach, Goa"
  },
  {
    name: "The Emerald Palace",
    city: "Jaipur",
    cap: 1500,
    price: 220000,
    rating: 4.7,
    reviews: 156,
    type: "Heritage Venue",
    img: "1518013491992-f36ba424a66a",
    amenities: ["Heritage", "Lawn", "Catering", "AV"],
    available: false,
    address: "Amer Road, Jaipur"
  }
];

const cities = ["All Cities", "Bangalore", "Mumbai", "Delhi", "Goa", "Jaipur"];
const types = ["All Types", "Heritage Venue", "Garden Venue", "Glasshouse", "Lakefront Villa", "Ballroom", "Banquet Hall", "Beach Venue"];

export default function Venues({ isLightMode = false }: { isLightMode?: boolean }) {
  const [city, setCity] = useState("Bangalore");
  const [type, setType] = useState("All Types");
  const [maxPrice, setMaxPrice] = useState(400000);
  const [minCap, setMinCap] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = venues.filter((v) =>
    (city === "All Cities" || v.city === city) &&
    (type === "All Types" || v.type === type) &&
    v.price <= maxPrice &&
    v.cap >= minCap
  );

  return (
    <div className={`min-h-screen pt-10 pb-20 px-6 transition-colors duration-300 ${
      isLightMode ? "bg-[#F7F4EE] text-[#111116]" : "bg-[#0B0B14] text-[#F7F4EE]"
    }`}>
      {/* Header */}
      <div className="max-w-[1440px] mx-auto mb-10">
        <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-[0.25em] mb-3 border ${
          isLightMode
            ? "bg-[#B89B5E]/10 text-[#B89B5E] border-[#B89B5E]/30"
            : "bg-white/5 border-white/15 text-[#E8C98A]"
        }`}>
          Prime Locations · Featuring Bangalore Estates
        </div>
        <h1 className={`font-serif font-bold text-4xl md:text-5xl mb-2 ${
          isLightMode ? "text-[#111116]" : "text-white"
        }`}>
          Curated Luxury Estates & Venues
        </h1>
        <p className={`text-[14px] font-medium ${
          isLightMode ? "text-[#6F6B66]" : "text-white/50"
        }`}>
          Showing {filtered.length} handpicked luxury venues in {city === "All Cities" ? "all cities" : city}
        </p>
      </div>

      <div className="max-w-[1440px] mx-auto flex gap-8 flex-col lg:flex-row">
        {/* Filters sidebar */}
        <div className="lg:w-80 shrink-0 space-y-5">
          <div className={`rounded-3xl p-6 border ${
            isLightMode ? "bg-white border-[#DED9CF] shadow-sm text-[#111116]" : "bg-[#151522] border-white/10 shadow-xl text-white"
          }`}>
            <h3 className="font-serif font-bold text-xl mb-5">Refine Estates</h3>

            {/* City Selection */}
            <div className="mb-6">
              <label className={`block text-[11px] font-bold mb-2 uppercase tracking-wider ${
                isLightMode ? "text-[#6F6B66]" : "text-white/50"
              }`}>City Location</label>
              <div className="flex flex-wrap gap-1.5">
                {cities.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCity(c)}
                    className={`px-3 py-1.5 rounded-full text-[12px] font-bold transition-all ${
                      city === c
                        ? "btn-gold-champagne !px-3 !py-1.5 text-[#111116] shadow-md"
                        : isLightMode ? "bg-[#F7F4EE] border border-[#DED9CF] text-[#111116] hover:bg-[#EAE5DA]" : "bg-white/5 border border-white/10 text-white/60 hover:text-white"
                    }`}>
                    {c} {c === "Bangalore" ? "📍" : ""}
                  </button>
                ))}
              </div>
            </div>

            {/* Venue Type */}
            <div className="mb-6">
              <label className={`block text-[11px] font-bold mb-2 uppercase tracking-wider ${
                isLightMode ? "text-[#6F6B66]" : "text-white/50"
              }`}>Estate Type</label>
              <div className="flex flex-wrap gap-1.5">
                {types.map((t) => (
                  <button
                    key={t}
                    onClick={() => setType(t)}
                    className={`px-3 py-1.5 rounded-full text-[12px] font-bold transition-all ${
                      type === t
                        ? "btn-gold-champagne !px-3 !py-1.5 text-[#111116] shadow-md"
                        : isLightMode ? "bg-[#F7F4EE] border border-[#DED9CF] text-[#111116] hover:bg-[#EAE5DA]" : "bg-white/5 border border-white/10 text-white/60 hover:text-white"
                    }`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Max Price */}
            <div className="mb-6">
              <label className={`block text-[11px] font-bold mb-2 uppercase tracking-wider ${
                isLightMode ? "text-[#6F6B66]" : "text-white/50"
              }`}>Max Rental Price / Day</label>
              <input
                type="range"
                min={80000}
                max={400000}
                step={20000}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#B89B5E]"
              />
              <div className={`flex justify-between text-[12px] font-mono mt-1 ${
                isLightMode ? "text-[#6F6B66]" : "text-white/40"
              }`}>
                <span>₹80K</span>
                <span className="font-bold text-[#B89B5E]">₹{(maxPrice / 100000).toFixed(1)} Lakhs</span>
                <span>₹4.0L</span>
              </div>
            </div>

            {/* Min Capacity */}
            <div>
              <label className={`block text-[11px] font-bold mb-2 uppercase tracking-wider ${
                isLightMode ? "text-[#6F6B66]" : "text-white/50"
              }`}>Min Guest Capacity</label>
              <input
                type="range"
                min={0}
                max={2000}
                step={100}
                value={minCap}
                onChange={(e) => setMinCap(Number(e.target.value))}
                className="w-full accent-[#B89B5E]"
              />
              <div className={`flex justify-between text-[12px] font-mono mt-1 ${
                isLightMode ? "text-[#6F6B66]" : "text-white/40"
              }`}>
                <span>Any</span>
                <span className="font-bold text-[#B89B5E]">{minCap}+ guests</span>
                <span>2,000</span>
              </div>
            </div>
          </div>

          {/* Quick Bangalore Highlights */}
          <div className={`rounded-3xl p-5 border ${
            isLightMode ? "bg-white border-[#DED9CF] text-[#111116] shadow-sm" : "bg-[#151522] border-white/10 text-white"
          }`}>
            <h3 className="text-lg font-serif font-bold mb-2 text-[#B89B5E]">Bangalore Concierge Desk</h3>
            <p className={`text-[12.5px] leading-relaxed mb-4 ${isLightMode ? "text-[#6F6B66]" : "text-white/55"}`}>
              Need exclusive access to Bangalore Palace Grounds, Nandi Hills vineyards, or Taj Leela Ballrooms?
            </p>
            <button
              onClick={() => setCity("Bangalore")}
              className="btn-gold-champagne w-full py-2.5 rounded-full text-[12.5px] font-bold justify-center">
              Filter Bangalore Estates →
            </button>
          </div>
        </div>

        {/* Venue grid */}
        <div className="flex-1">
          {selected ? (
            // Venue detail view
            <div className="animate-fade-in">
              <button onClick={() => setSelected(null)} className={`flex items-center gap-2 text-[13px] mb-6 font-bold transition-colors ${
                isLightMode ? "text-[#6F6B66] hover:text-[#111116]" : "text-white/60 hover:text-white"
              }`}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 3L5 8l5 5"/></svg>
                Back to all estates
              </button>
              {(() => {
                const v = venues.find((x) => x.name === selected)!;
                return (
                  <div className={`rounded-3xl overflow-hidden border shadow-xl ${
                    isLightMode ? "bg-white border-[#DED9CF] text-[#111116]" : "bg-[#151522] border-white/12 text-white"
                  }`}>
                    <img src={`https://images.unsplash.com/photo-${v.img}?w=1200&h=500&fit=crop&auto=format`}
                      alt={v.name} className="w-full h-80 object-cover"/>
                    <div className="p-8">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h2 className="font-serif font-bold text-3xl">{v.name}</h2>
                          <p className="text-[14px] mt-1 font-semibold text-[#B89B5E]">📍 {v.address || `${v.city} · ${v.type}`}</p>
                        </div>
                        <div className="text-right font-mono">
                          <div className="text-3xl font-extrabold text-[#B89B5E]">₹{(v.price / 100000).toFixed(2)}L</div>
                          <div className={`text-[12px] ${isLightMode ? "text-[#6F6B66]" : "text-white/40"}`}>per day rental</div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-4 mb-6">
                        <div className={`rounded-2xl px-4 py-2.5 text-[13px] border font-mono ${
                          isLightMode ? "bg-[#F7F4EE] border-[#DED9CF] text-[#111116]" : "bg-white/5 border-white/10 text-white"
                        }`}>
                          <span className="text-[#B89B5E] font-bold">★ {v.rating}</span>
                          <span className={`${isLightMode ? "text-[#6F6B66]" : "text-white/40"} ml-1`}>({v.reviews} verified reviews)</span>
                        </div>
                        <div className={`rounded-2xl px-4 py-2.5 text-[13px] font-semibold border ${
                          isLightMode ? "bg-[#F7F4EE] border-[#DED9CF] text-[#111116]" : "bg-white/5 border-white/10 text-white/80"
                        }`}>
                          👥 Up to {v.cap.toLocaleString()} guests
                        </div>
                        <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 rounded-2xl px-4 py-2.5 text-[12.5px] font-bold">
                          ✓ Available for Booking
                        </div>
                      </div>

                      <div className="mb-8">
                        <h4 className={`text-[12px] uppercase font-bold tracking-wider mb-3 ${isLightMode ? "text-[#6F6B66]" : "text-white/50"}`}>Estate Amenities & Specifications</h4>
                        <div className="flex flex-wrap gap-2">
                          {v.amenities.map((a) => (
                            <span key={a} className={`px-3.5 py-1.5 rounded-full text-[12.5px] font-semibold border ${
                              isLightMode ? "bg-[#F7F4EE] border-[#DED9CF] text-[#111116]" : "bg-white/5 border-white/12 text-white/80"
                            }`}>{a}</span>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <button className="btn-gold-champagne flex-1 py-4 font-bold rounded-full justify-center">
                          Reserve This Estate
                        </button>
                        <button className={`px-8 py-4 rounded-full font-bold transition-all border ${
                          isLightMode ? "bg-[#F7F4EE] border-[#DED9CF] text-[#111116] hover:bg-[#EAE5DA]" : "btn-hero-outline"
                        }`}>
                          Schedule Site Visit
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.map((v) => (
                <button key={v.name} onClick={() => setSelected(v.name)}
                  className={`rounded-3xl overflow-hidden border text-left transition-all group ${
                    isLightMode
                      ? "bg-white border-[#DED9CF] hover:border-[#B89B5E] shadow-sm"
                      : "bg-[#151522] border-white/10 hover:border-[#B89B5E]/40"
                  }`}>
                  <div className="relative h-52">
                    <img src={`https://images.unsplash.com/photo-${v.img}?w=600&h=400&fit=crop&auto=format`}
                      alt={v.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111116]/80 via-transparent to-transparent"/>
                    <div className="absolute top-3 left-3 bg-[#111116]/80 backdrop-blur-md rounded-lg px-2.5 py-1 text-[10.5px] uppercase font-bold text-[#E8C98A] shadow-sm">{v.type}</div>
                    <div className="absolute top-3 right-3 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 rounded-lg px-2.5 py-1 text-[10.5px] font-bold">
                      Available
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className={`font-serif font-bold text-xl mb-1 ${isLightMode ? "text-[#111116] group-hover:text-[#B89B5E]" : "text-white group-hover:text-[#E8C98A]"}`}>{v.name}</h3>
                    <p className={`text-[12px] mb-3 ${isLightMode ? "text-[#6F6B66]" : "text-white/50"}`}>📍 {v.city} · 👥 {v.cap.toLocaleString()} guests</p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {v.amenities.slice(0, 3).map((a) => (
                        <span key={a} className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${isLightMode ? "bg-[#F7F4EE] border-[#DED9CF] text-[#6F6B66]" : "border-white/10 text-white/60"}`}>{a}</span>
                      ))}
                    </div>
                    <div className={`flex items-center justify-between pt-3 border-t ${isLightMode ? "border-[#DED9CF]" : "border-white/10"}`}>
                      <div>
                        <div className="font-mono font-extrabold text-lg text-[#B89B5E]">₹{(v.price / 100000).toFixed(2)}L</div>
                        <div className={`text-[10.5px] ${isLightMode ? "text-[#6F6B66]" : "text-white/40"}`}>per day</div>
                      </div>
                      <div className="text-[#B89B5E] text-[13px] font-bold">★ {v.rating} <span className={`${isLightMode ? "text-[#6F6B66]" : "text-white/40"} font-normal text-[11px]`}>({v.reviews})</span></div>
                    </div>
                  </div>
                </button>
              ))}
              {filtered.length === 0 && (
                <div className={`col-span-full text-center py-20 ${isLightMode ? "text-[#6F6B66]" : "text-white/40"}`}>
                  <div className="text-4xl mb-4">🏛️</div>
                  <p>No venues match your filters. Try selecting &quot;All Cities&quot; or increasing your price limit.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
