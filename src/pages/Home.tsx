import { useState, useEffect, useRef } from "react";

/* ─── Event Services ───────────────────────────── */
const luxuryServices = [
  {
    id: "weddings",
    title: "Weddings & Celebrations",
    subtitle: "Destination Weddings, Receptions & Sangeet",
    desc: "Complete wedding planning, flower decor, catering, photography, and event management.",
    img: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80&fit=crop",
    tag: "Popular",
    page: "inspiration"
  },
  {
    id: "venues",
    title: "Top Venues & Estates",
    subtitle: "Banquet Halls, Gardens, Rooftops & Resorts",
    desc: "500+ verified venues with transparent pricing, live availability, and direct booking.",
    img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80&fit=crop",
    tag: "Verified",
    page: "venues"
  },
  {
    id: "catering",
    title: "Food & Catering",
    subtitle: "Multi-Cuisine Menus & Live Food Stalls",
    desc: "Delicious food packages, live counters, welcome drinks, and professional service staff.",
    img: "https://images.unsplash.com/photo-1555244162-803834f70033?w=800&q=80&fit=crop",
    tag: "Catering",
    page: "vendors"
  },
  {
    id: "galas",
    title: "Corporate Events",
    subtitle: "Conferences, Award Nights & Brand Launches",
    desc: "Professional stage setup, sound, 4K LED screens, delegate management, and security.",
    img: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80&fit=crop",
    tag: "Corporate",
    page: "booking"
  },
  {
    id: "decor",
    title: "Decoration & Lighting",
    subtitle: "Flower Setup, Themes & Stage Lighting",
    desc: "Custom flower backdrops, entrance gates, LED lighting, and table setups.",
    img: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80&fit=crop",
    tag: "Decor",
    page: "inspiration"
  },
  {
    id: "management",
    title: "Event Managers & Staff",
    subtitle: "On-Site Managers, Servers & Security",
    desc: "Experienced event directors to coordinate everything smoothly on your event day.",
    img: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80&fit=crop",
    tag: "Full Support",
    page: "workers"
  }
];

/* ─── Featured Estates ──────────────────────────── */
const featuredEstates = [
  {
    name: "Palace Grounds Royal Pavilion",
    location: "Palace Grounds, Bangalore",
    guests: "2,500 Guests",
    price: "₹3.5L / day",
    category: "Heritage Grounds",
    rating: "4.96",
    img: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80&fit=crop",
    badge: "Top Choice"
  },
  {
    name: "Nandi Hills Resort & Spa",
    location: "Nandi Hills, Bangalore",
    guests: "850 Guests",
    price: "₹2.2L / day",
    category: "Garden Resort",
    rating: "4.92",
    img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80&fit=crop",
    badge: "Scenic View"
  },
  {
    name: "Whitefield Glasshouse Pavilion",
    location: "Whitefield, Bangalore",
    guests: "600 Guests",
    price: "₹1.5L / day",
    category: "Glasshouse",
    rating: "4.88",
    img: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80&fit=crop",
    badge: "Modern"
  },
  {
    name: "Kanakapura Lakefront Villa",
    location: "Kanakapura Rd, Bangalore",
    guests: "500 Guests",
    price: "₹1.8L / day",
    category: "Lakefront Villa",
    rating: "4.91",
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80&fit=crop",
    badge: "Lakeside"
  }
];

/* ─── Client Stories ────────────────────────────── */
const clientStories = [
  {
    quote: "EVENTTRUST handled everything for our Bangalore wedding smoothly. The venue setup and flower decor were amazing, and the team made our special day stress-free.",
    author: "Ananya & Rohan Sharma",
    event: "Wedding Celebration · Bangalore",
    date: "November 2024",
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80&fit=crop"
  },
  {
    quote: "Organizing our company annual event for 800 employees was very easy with EVENTTRUST. Professional managers and transparent costs from day one.",
    author: "Marcus Vance",
    event: "Company Annual Meet · Bangalore",
    date: "January 2025",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80&fit=crop"
  },
  {
    quote: "The live budget planner showed us exact prices for venue, food, and decor. No surprise costs at the end. Really happy with the service!",
    author: "Priya & Vikram Malhotra",
    event: "Anniversary Party · Bangalore",
    date: "February 2025",
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&q=80&fit=crop"
  }
];

interface HomeProps {
  setPage: (p: string) => void;
}

export default function Home({ setPage }: HomeProps) {
  const [guestCount, setGuestCount] = useState(250);
  const [eventVision, setEventVision] = useState("wedding");
  const [venueStyle, setVenueStyle] = useState("heritage");
  const [activeStory, setActiveStory] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  /* Budget calculation math */
  const baseCostPerGuest = eventVision === "wedding" ? 3800 : eventVision === "gala" ? 2800 : 1800;
  const venueMultiplier = venueStyle === "heritage" ? 1.6 : venueStyle === "oceanfront" ? 1.4 : 1.1;
  const totalBudget = Math.round((guestCount * baseCostPerGuest * venueMultiplier) / 1000) * 1000;

  const venueCost = Math.round(totalBudget * 0.32);
  const cateringCost = Math.round(totalBudget * 0.28);
  const decorCost = Math.round(totalBudget * 0.20);
  const productionCost = Math.round(totalBudget * 0.12);
  const conciergeCost = Math.round(totalBudget * 0.08);

  /* Hero parallax effect */
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const handleScroll = () => {
      const y = window.scrollY;
      const img = el.querySelector(".hero-bg-img") as HTMLElement;
      if (img) img.style.transform = `translateY(${y * 0.2}px) scale(1.03)`;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#09090C] text-[#F4F4F6] font-sans antialiased selection:bg-amber-400/20">

      {/* ════════════════════════════════ HERO SECTION ═══ */}
      <section ref={heroRef} className="relative min-h-[88vh] flex items-center justify-center overflow-hidden pt-24 pb-20 px-6">
        {/* Background Photo */}
        <div className="absolute inset-0 z-0">
          <img
            className="hero-bg-img w-full h-full object-cover opacity-35 filter brightness-[0.75] contrast-[1.1] transition-transform duration-700 ease-out"
            src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1920&q=85&fit=crop"
            alt="Event decor hall setting"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#09090C] via-[#09090C]/65 to-[#09090C]/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#09090C]/80 via-transparent to-[#09090C]/80" />
        </div>

        {/* Ambient Subtle Lighting */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[550px] h-[550px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          {/* Subtle Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.03] border border-amber-300/20 backdrop-blur-md mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E2C08D]" />
            <span className="text-[10.5px] font-medium tracking-[0.2em] text-amber-200 uppercase">
              Event Management & Planning · Live in Bangalore & 14 Cities
            </span>
          </div>

          {/* Simple Headline */}
          <h1 className="font-serif font-light text-5xl md:text-7xl lg:text-8xl leading-[1.05] tracking-tight mb-8 text-white">
            Plan Your Event<br />
            <span className="italic font-normal text-amber-200/90 font-serif">In One Place</span>
          </h1>

          <p className="text-white/65 text-base md:text-lg font-light max-w-xl mx-auto leading-relaxed mb-12">
            Book top venues, trusted vendors, event staff, and manage your full budget easily — all in one platform.
          </p>

          {/* Simple Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setPage("booking")}
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#E2C08D] hover:bg-[#eddcb8] text-[#09090C] font-medium text-[13.5px] tracking-wide shadow-lg transition-all flex items-center justify-center gap-2">
              <span>Plan My Event</span>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </button>

            <button
              onClick={() => setPage("venues")}
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/15 text-white font-medium text-[13.5px] tracking-wide backdrop-blur-md transition-all">
              Browse Venues
            </button>
          </div>

          {/* Simple Metric Badges */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 border-t border-white/10 text-left">
            <div>
              <div className="font-mono text-2xl text-amber-200 font-medium">12,000+</div>
              <div className="text-white/45 text-[11px] uppercase tracking-wider mt-1 font-sans">Events Done</div>
            </div>
            <div>
              <div className="font-mono text-2xl text-amber-200 font-medium">500+</div>
              <div className="text-white/45 text-[11px] uppercase tracking-wider mt-1 font-sans">Verified Venues</div>
            </div>
            <div>
              <div className="font-mono text-2xl text-amber-200 font-medium">14 Cities</div>
              <div className="text-white/45 text-[11px] uppercase tracking-wider mt-1 font-sans">Active Locations</div>
            </div>
            <div>
              <div className="font-mono text-2xl text-amber-200 font-medium">99.4%</div>
              <div className="text-white/45 text-[11px] uppercase tracking-wider mt-1 font-sans">Happy Clients</div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════ SERVICES ═══ */}
      <section className="py-24 px-6 max-w-[1440px] mx-auto border-t border-white/10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-[10.5px] font-semibold text-amber-300 uppercase tracking-[0.25em]">What We Provide</span>
            <h2 className="font-serif font-light text-4xl md:text-5xl text-white mt-2">
              Everything for Your Event
            </h2>
          </div>
          <p className="text-white/55 text-[14px] max-w-md leading-relaxed">
            From venue booking to catering, flower decor, photography, and managers — we arrange everything for you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {luxuryServices.map((service) => (
            <div
              key={service.id}
              onClick={() => setPage(service.page)}
              className="group relative rounded-2xl overflow-hidden bg-[#0F0F13] border border-white/10 hover:border-amber-300/30 transition-all duration-300 cursor-pointer flex flex-col justify-between">
              <div className="relative h-60 overflow-hidden">
                <img
                  src={service.img}
                  alt=""
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80&fit=crop";
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F13] via-[#0F0F13]/20 to-transparent" />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-medium tracking-wider uppercase bg-black/60 text-amber-200 border border-amber-300/20 backdrop-blur-md">
                  {service.tag}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-2xl text-white group-hover:text-amber-200 transition-colors mb-1 font-normal">
                    {service.title}
                  </h3>
                  <p className="text-amber-200/80 text-[11.5px] font-medium tracking-wide mb-2.5">
                    {service.subtitle}
                  </p>
                  <p className="text-white/50 text-[13px] leading-relaxed">
                    {service.desc}
                  </p>
                </div>

                <div className="mt-5 flex items-center gap-2 text-[12px] font-medium text-amber-300 group-hover:translate-x-1 transition-transform">
                  <span>Explore Service</span>
                  <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M2 7h10M8 3l4 4-4 4" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════ BUDGET CALCULATOR ═══ */}
      <section className="py-24 px-6 bg-[#0B0B0E] border-y border-white/10 relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

            {/* Left Column: Controls */}
            <div className="lg:col-span-5">
              <span className="text-[10.5px] font-semibold text-amber-300 uppercase tracking-[0.25em]">Budget Estimator</span>
              <h2 className="font-serif font-light text-4xl md:text-5xl text-white mt-2 mb-3">
                Event Cost Calculator
              </h2>
              <p className="text-white/55 text-[14px] leading-relaxed mb-8">
                Select your event details to see a live breakdown of your estimated expenses across venue, food, decor, stage, and staff.
              </p>

              {/* Event Type Toggle */}
              <div className="mb-6">
                <label className="block text-[11px] uppercase tracking-wider text-white/45 mb-2 font-medium">Event Type</label>
                <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#14141A] border border-white/10 rounded-full">
                  {[
                    { id: "wedding", label: "Wedding" },
                    { id: "gala", label: "Party / Gala" },
                    { id: "private", label: "Small Event" }
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setEventVision(item.id)}
                      className={`py-2 px-3 rounded-full text-[12px] font-medium transition-all ${
                        eventVision === item.id
                          ? "bg-[#E2C08D] text-[#09090C] shadow-sm"
                          : "text-white/60 hover:text-white"
                      }`}>
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Guest Count Slider */}
              <div className="mb-7 bg-[#14141A] border border-white/10 rounded-2xl p-5">
                <div className="flex justify-between items-center mb-3">
                  <label className="text-[11px] uppercase tracking-wider text-white/45 font-medium">Guest Count</label>
                  <span className="font-mono text-lg text-amber-200 font-medium">{guestCount} Guests</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="1500"
                  step="25"
                  value={guestCount}
                  onChange={(e) => setGuestCount(Number(e.target.value))}
                  className="w-full accent-[#E2C08D] h-1.5 bg-white/10 rounded-lg cursor-pointer"
                />
              </div>

              {/* Venue Style Toggle */}
              <div className="mb-8">
                <label className="block text-[11px] uppercase tracking-wider text-white/45 mb-2 font-medium">Venue Style</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "heritage", label: "Palace / Resort" },
                    { id: "oceanfront", label: "Banquet Hall" },
                    { id: "glasshouse", label: "Rooftop" }
                  ].map((style) => (
                    <button
                      key={style.id}
                      onClick={() => setVenueStyle(style.id)}
                      className={`p-3 rounded-xl text-left border text-[12px] transition-all ${
                        venueStyle === style.id
                          ? "border-amber-300/60 bg-amber-300/10 text-amber-200 font-medium"
                          : "border-white/10 bg-[#14141A] text-white/60 hover:border-white/20"
                      }`}>
                      <div className="font-medium text-white mb-0.5">{style.label}</div>
                      <div className="text-[10px] text-white/40 font-normal">Option</div>
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setPage("booking")}
                className="w-full py-3.5 rounded-full bg-[#E2C08D] hover:bg-[#eddcb8] text-[#09090C] font-medium text-[13.5px] transition-all">
                Get Detailed Quote →
              </button>
            </div>

            {/* Right Column: Clean Breakdown Card */}
            <div className="lg:col-span-7 bg-[#121217] border border-white/10 rounded-2xl p-7 md:p-9 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-6 mb-6">
                <div>
                  <div className="text-[10.5px] uppercase tracking-[0.2em] text-amber-300 font-semibold mb-1">Estimated Total Budget</div>
                  <div className="font-mono text-4xl text-white font-medium tracking-tight">₹{(totalBudget / 100000).toFixed(2)} Lakhs</div>
                </div>
                <div className="mt-4 sm:mt-0 text-right">
                  <div className="text-[11.5px] text-white/40">Cost Per Guest</div>
                  <div className="font-mono text-base text-amber-200 font-medium">₹{Math.round(totalBudget / guestCount).toLocaleString()}</div>
                </div>
              </div>

              {/* Allocations */}
              <div className="space-y-5">
                {[
                  { label: "Venue Rental & Permissions", cost: venueCost, pct: 32 },
                  { label: "Food & Catering Services", cost: cateringCost, pct: 28 },
                  { label: "Decoration, Flowers & Stage", cost: decorCost, pct: 20 },
                  { label: "Sound System & Lighting", cost: productionCost, pct: 12 },
                  { label: "Event Manager & On-Site Staff", cost: conciergeCost, pct: 8 }
                ].map((item) => (
                  <div key={item.label} className="space-y-1.5">
                    <div className="flex justify-between items-center text-[13px]">
                      <span className="text-white/75 font-normal">{item.label}</span>
                      <span className="font-mono text-amber-200 font-medium">₹{(item.cost / 100000).toFixed(2)}L <span className="text-white/40 text-[11px]">({item.pct}%)</span></span>
                    </div>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-amber-300/80 to-amber-500 rounded-full transition-all duration-300"
                        style={{ width: `${item.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-5 border-t border-white/10 flex items-center justify-between text-white/45 text-[11.5px]">
                <span>✓ Verified live vendor market rates</span>
                <span>Includes taxes & fees</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ════════════════ FEATURED VENUES ═══ */}
      <section className="py-24 px-6 max-w-[1440px] mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-4">
          <div>
            <span className="text-[10.5px] font-semibold text-amber-300 uppercase tracking-[0.25em]">Bangalore & Nearby</span>
            <h2 className="font-serif font-light text-4xl md:text-5xl text-white mt-2">
              Featured Venues
            </h2>
          </div>
          <button
            onClick={() => setPage("venues")}
            className="text-[13px] font-medium text-amber-300 hover:text-amber-200 flex items-center gap-2 transition-colors">
            <span>View All Venues</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M2 7h10M8 3l4 4-4 4" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredEstates.map((estate) => (
            <div
              key={estate.name}
              onClick={() => setPage("venues")}
              className="group bg-[#0F0F13] rounded-2xl overflow-hidden border border-white/10 hover:border-amber-300/30 transition-all duration-300 cursor-pointer">
              <div className="relative h-52 overflow-hidden">
                <img
                  src={estate.img}
                  alt={estate.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F13] via-transparent to-transparent" />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-medium uppercase tracking-wider bg-black/60 text-amber-200 border border-amber-300/20 backdrop-blur-md">
                  {estate.badge}
                </span>
                <span className="absolute bottom-3 right-3 font-mono text-[12px] font-medium text-amber-300 bg-black/70 px-2.5 py-1 rounded-md backdrop-blur-md">
                  {estate.price}
                </span>
              </div>

              <div className="p-5">
                <h3 className="font-serif font-normal text-xl text-white group-hover:text-amber-200 transition-colors mb-1">
                  {estate.name}
                </h3>
                <p className="text-white/45 text-[12px] mb-3">📍 {estate.location} · {estate.category}</p>
                <div className="flex items-center justify-between text-[12px] pt-3 border-t border-white/10 text-white/60 font-sans">
                  <span>👥 {estate.guests}</span>
                  <span className="text-amber-300 font-medium">★ {estate.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════ CLIENT REVIEWS ═══ */}
      <section className="py-24 px-6 bg-[#0B0B0E] border-t border-white/10">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-[10.5px] font-semibold text-amber-300 uppercase tracking-[0.25em]">Customer Reviews</span>
          <h2 className="font-serif font-light text-4xl md:text-5xl text-white mt-2 mb-10">
            What Our Clients Say
          </h2>

          <div className="bg-[#121217] border border-white/10 rounded-2xl p-8 md:p-10 relative">
            <p className="font-serif font-light italic text-xl md:text-2xl text-white/90 leading-relaxed mb-8">
              &ldquo;{clientStories[activeStory].quote}&rdquo;
            </p>

            <div className="flex items-center justify-center gap-3">
              <img
                src={clientStories[activeStory].img}
                alt={clientStories[activeStory].author}
                className="w-12 h-12 rounded-full object-cover border border-amber-300/40"
              />
              <div className="text-left">
                <div className="font-medium text-base text-white">{clientStories[activeStory].author}</div>
                <div className="text-white/45 text-[12px]">{clientStories[activeStory].event}</div>
              </div>
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center gap-2 mt-7">
              {clientStories.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveStory(idx)}
                  className={`h-1.5 rounded-full transition-all ${
                    activeStory === idx ? "w-6 bg-[#E2C08D]" : "w-1.5 bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════ FOOTER ═══ */}
      <footer className="border-t border-white/10 py-14 px-6 bg-[#09090C]">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-white/45 text-[12.5px]">
          <div>
            <span className="font-serif text-lg text-white">EVENTTRUST</span>
            <span className="ml-3 text-[10px] uppercase tracking-widest text-amber-300/80">Event Management</span>
          </div>
          <div className="flex gap-7">
            <button onClick={() => setPage("venues")} className="hover:text-white transition-colors">Venues</button>
            <button onClick={() => setPage("vendors")} className="hover:text-white transition-colors">Vendors</button>
            <button onClick={() => setPage("inspiration")} className="hover:text-white transition-colors">Ideas</button>
            <button onClick={() => setPage("about")} className="hover:text-white transition-colors">About Us</button>
            <button onClick={() => setPage("contact")} className="hover:text-white transition-colors">Contact</button>
          </div>
          <div>© 2025 EVENTTRUST Technologies Pvt. Ltd. All rights reserved.</div>
        </div>
      </footer>

    </div>
  );
}
