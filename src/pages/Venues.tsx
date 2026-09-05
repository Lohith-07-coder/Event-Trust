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
    reviews: 189,
    type: "Garden Venue",
    img: "1519167758481-83f550bb49b3",
    amenities: ["Open Air", "Lawn", "Decor", "Parking"],
    available: true,
    address: "Lutyens' Delhi"
  },
  {
    name: "Azure Beachfront Hall",
    city: "Goa",
    cap: 500,
    price: 95000,
    rating: 4.9,
    reviews: 312,
    type: "Beach Venue",
    img: "1507525428034-b723cf961d3e",
    amenities: ["Beachfront", "Pool", "Bar", "DJ System"],
    available: true,
    address: "Candolim Beach, North Goa"
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

export default function Venues() {
  const [city, setCity] = useState("Bangalore"); // Default to Bangalore as priority
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
    <div className="min-h-screen pt-24 pb-20 bg-[#09090C] text-[#F4F4F6]">
      {/* Header */}
      <div className="px-6 max-w-[1440px] mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-200 text-[11px] font-medium uppercase tracking-[0.2em] mb-3">
          Prime Locations · Featuring Bangalore Estates
        </div>
        <h1 className="font-serif font-light text-4xl md:text-6xl text-white mb-2">
          Curated Luxury Estates & Venues
        </h1>
        <p className="text-white/50 text-[14px]">
          Showing {filtered.length} handpicked luxury venues in {city === "All Cities" ? "all cities" : city}
        </p>
      </div>

      <div className="px-6 max-w-[1440px] mx-auto flex gap-8 flex-col lg:flex-row">
        {/* Filters sidebar */}
        <div className="lg:w-80 shrink-0 space-y-5">
          <div className="bg-[#111116] rounded-2xl p-6 border border-white/10">
            <h3 className="font-serif text-xl font-normal text-white mb-5">Refine Estates</h3>

            {/* City Selection */}
            <div className="mb-6">
              <label className="block text-[11px] font-medium text-white/50 mb-2 uppercase tracking-wider">City Location</label>
              <div className="flex flex-wrap gap-1.5">
                {cities.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCity(c)}
                    className={`px-3 py-1.5 rounded-full text-[12px] font-medium transition-all ${
                      city === c
                        ? "bg-[#E2C08D] text-[#09090C]"
                        : "bg-white/5 border border-white/10 text-white/60 hover:text-white"
                    }`}>
                    {c} {c === "Bangalore" ? "📍" : ""}
                  </button>
                ))}
              </div>
            </div>

            {/* Venue Type */}
            <div className="mb-6">
              <label className="block text-[11px] font-medium text-white/50 mb-2 uppercase tracking-wider">Estate Type</label>
              <div className="flex flex-wrap gap-1.5">
                {types.map((t) => (
                  <button
                    key={t}
                    onClick={() => setType(t)}
                    className={`px-3 py-1.5 rounded-full text-[12px] font-medium transition-all ${
                      type === t
                        ? "bg-[#E2C08D] text-[#09090C]"
                        : "bg-white/5 border border-white/10 text-white/60 hover:text-white"
                    }`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Max Price */}
            <div className="mb-6">
              <label className="block text-[11px] font-medium text-white/50 mb-2 uppercase tracking-wider">Max Rental Price / Day</label>
              <input
                type="range"
                min={80000}
                max={400000}
                step={20000}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#E2C08D]"
              />
              <div className="flex justify-between text-[12px] font-mono text-white/40 mt-1">
                <span>₹80K</span>
                <span className="text-amber-200 font-semibold">₹{(maxPrice / 100000).toFixed(1)} Lakhs</span>
                <span>₹4.0L</span>
              </div>
            </div>

            {/* Min Capacity */}
            <div>
              <label className="block text-[11px] font-medium text-white/50 mb-2 uppercase tracking-wider">Min Guest Capacity</label>
              <input
                type="range"
                min={0}
                max={2000}
                step={100}
                value={minCap}
                onChange={(e) => setMinCap(Number(e.target.value))}
                className="w-full accent-[#E2C08D]"
              />
              <div className="flex justify-between text-[12px] font-mono text-white/40 mt-1">
                <span>Any</span>
                <span className="text-amber-200 font-semibold">{minCap}+ guests</span>
                <span>2,000</span>
              </div>
            </div>
          </div>

          {/* Quick Bangalore Highlights */}
          <div className="bg-[#111116] rounded-2xl p-5 border border-amber-300/20">
            <h3 className="font-serif text-lg text-amber-200 mb-2 font-normal">Bangalore Concierge Desk</h3>
            <p className="text-white/55 text-[12.5px] leading-relaxed mb-4">
              Need exclusive access to Bangalore Palace Grounds, Nandi Hills vineyards, or Taj Leela Ballrooms?
            </p>
            <button
              onClick={() => setCity("Bangalore")}
              className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-[12.5px] font-medium transition-all">
              Filter Bangalore Estates →
            </button>
          </div>
        </div>

        {/* Venue grid */}
        <div className="flex-1">
          {selected ? (
            // Venue detail view
            <div className="animate-fade-in">
              <button onClick={() => setSelected(null)} className="flex items-center gap-2 text-[13px] text-white/60 hover:text-white mb-6 transition-colors">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M10 3L5 8l5 5"/></svg>
                Back to all estates
              </button>
              {(() => {
                const v = venues.find((x) => x.name === selected)!;
                return (
                  <div className="bg-[#111116] rounded-3xl overflow-hidden border border-white/12 shadow-2xl">
                    <img src={`https://images.unsplash.com/photo-${v.img}?w=1200&h=500&fit=crop&auto=format`}
                      alt={v.name} className="w-full h-80 object-cover"/>
                    <div className="p-8">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h2 className="font-serif font-light text-3xl text-white">{v.name}</h2>
                          <p className="text-amber-200/80 text-[14px] mt-1 font-medium">📍 {v.address || `${v.city} · ${v.type}`}</p>
                        </div>
                        <div className="text-right font-mono">
                          <div className="text-3xl text-amber-200 font-semibold">₹{(v.price / 100000).toFixed(2)}L</div>
                          <div className="text-white/40 text-[12px]">per day rental</div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-4 mb-6">
                        <div className="bg-white/5 rounded-xl px-4 py-2.5 text-[13px] border border-white/10 font-mono">
                          <span className="text-amber-300">★ {v.rating}</span>
                          <span className="text-white/40 ml-1">({v.reviews} verified reviews)</span>
                        </div>
                        <div className="bg-white/5 rounded-xl px-4 py-2.5 text-[13px] text-white/80 border border-white/10">
                          👥 Up to {v.cap.toLocaleString()} guests
                        </div>
                        <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 rounded-xl px-4 py-2.5 text-[12.5px] font-medium">
                          ✓ Available for Booking
                        </div>
                      </div>

                      <div className="mb-8">
                        <h4 className="text-[12px] uppercase tracking-wider text-white/50 mb-3">Estate Amenities & Specifications</h4>
                        <div className="flex flex-wrap gap-2">
                          {v.amenities.map((a) => (
                            <span key={a} className="bg-white/5 px-3.5 py-1.5 rounded-full text-[12.5px] text-white/80 border border-white/12">{a}</span>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <button className="flex-1 py-4 rounded-xl font-semibold text-[#09090C] bg-[#E2C08D] hover:bg-[#eddcb8] transition-all">
                          Reserve This Estate
                        </button>
                        <button className="px-8 py-4 rounded-xl bg-white/5 border border-white/20 text-white font-medium hover:bg-white/10 transition-all">
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
                  className="bg-[#111116] rounded-2xl overflow-hidden border border-white/10 hover:border-amber-300/30 text-left transition-all group">
                  <div className="relative h-52">
                    <img src={`https://images.unsplash.com/photo-${v.img}?w=600&h=400&fit=crop&auto=format`}
                      alt={v.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111116] via-transparent to-transparent"/>
                    <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md rounded-lg px-2.5 py-1 text-[10.5px] uppercase font-medium text-amber-200 border border-amber-300/20">{v.type}</div>
                    <div className="absolute top-3 right-3 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 rounded-lg px-2.5 py-1 text-[10.5px] font-medium">
                      Available
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-serif font-normal text-xl text-white group-hover:text-amber-200 transition-colors mb-1">{v.name}</h3>
                    <p className="text-white/50 text-[12px] mb-3">📍 {v.city} · 👥 {v.cap.toLocaleString()} guests</p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {v.amenities.slice(0, 3).map((a) => (
                        <span key={a} className="px-2.5 py-0.5 rounded-full text-[11px] text-white/60 border border-white/10">{a}</span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-white/10">
                      <div>
                        <div className="font-mono font-medium text-lg text-amber-200">₹{(v.price / 100000).toFixed(2)}L</div>
                        <div className="text-white/40 text-[10.5px]">per day</div>
                      </div>
                      <div className="text-amber-300 text-[13px] font-medium">★ {v.rating} <span className="text-white/40 font-normal">({v.reviews})</span></div>
                    </div>
                  </div>
                </button>
              ))}
              {filtered.length === 0 && (
                <div className="col-span-full text-center py-20 text-white/40">
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
