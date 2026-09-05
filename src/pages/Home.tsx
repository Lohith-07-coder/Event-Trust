import { useState, useEffect, useRef } from "react";

/* ─── Event Categories Grid Data (Matching Screenshot) ─────────────────────────── */
const exploreCategories = [
  {
    id: "weddings",
    title: "Weddings",
    subtitle: "A celebration of love",
    img: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80&fit=crop",
    page: "inspiration"
  },
  {
    id: "corporate",
    title: "Corporate Events",
    subtitle: "Events that inspire",
    img: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&q=80&fit=crop",
    page: "booking"
  },
  {
    id: "birthdays",
    title: "Birthdays",
    subtitle: "Make it special",
    img: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&q=80&fit=crop",
    page: "inspiration"
  },
  {
    id: "engagements",
    title: "Engagements",
    subtitle: "New beginnings",
    img: "https://images.unsplash.com/photo-1519225421980-1bb2832ac795?w=600&q=80&fit=crop",
    page: "inspiration"
  },
  {
    id: "concerts",
    title: "Concerts & Live Shows",
    subtitle: "Unforgettable experiences",
    img: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&q=80&fit=crop",
    page: "booking"
  },
  {
    id: "gatherings",
    title: "Social Gatherings",
    subtitle: "For every occasion",
    img: "https://images.unsplash.com/photo-1464366400600-ac2779b46d32?w=600&q=80&fit=crop",
    page: "venues"
  }
];

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
  isLightMode?: boolean;
}

export default function Home({ setPage, isLightMode = true }: HomeProps) {
  const [guestCount, setGuestCount] = useState(250);
  const [eventVision, setEventVision] = useState("wedding");
  const [venueStyle, setVenueStyle] = useState("heritage");
  const [activeStory, setActiveStory] = useState(0);
  const [heroSlide, setHeroSlide] = useState(1);
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

  /* Parallax effect */
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
    <div className="min-h-screen font-sans antialiased bg-[#0B0B14] text-[#F7F4EE]">

      {/* ════════════════ HERO SECTION (#0B0B14 Dark Hero Matching Reference Image) ════════════════ */}
      <section ref={heroRef} className="relative min-h-[90vh] bg-[#0B0B14] text-white pt-10 pb-16 px-6 lg:px-12 flex flex-col justify-between overflow-hidden">
        <div className="max-w-[1440px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto">
          
          {/* Left Column: Headlines & Call to Action */}
          <div className="lg:col-span-6 z-10">
            <p className="text-[11px] font-mono tracking-[0.25em] text-[#B89B5E] uppercase mb-4 font-semibold">
              EVENTS THAT BRING PEOPLE TOGETHER
            </p>

            <h1 className="font-serif font-light text-6xl md:text-7xl lg:text-8xl leading-[1.02] tracking-tight text-white mb-6">
              Moments<br />
              Made Simple.
            </h1>

            <p className="text-[#6F6B66] text-sm md:text-base font-medium max-w-md leading-relaxed mb-8">
              Plan, book and manage your events with trusted venues, verified vendors and expert support — all in one place.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <button
                onClick={() => setPage("booking")}
                className="btn-gold-champagne !px-7 !py-3.5 text-sm font-semibold rounded-full flex items-center gap-2">
                <span>Plan My Event</span>
                <span>→</span>
              </button>

              <button
                onClick={() => setPage("inspiration")}
                className="btn-hero-outline !px-7 !py-3.5 text-sm font-medium rounded-full">
                Explore Events
              </button>
            </div>

            {/* Feature Pills Row */}
            <div className="flex flex-wrap items-center gap-6 text-[12.5px] font-semibold text-white/80">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-xs">✓</span>
                <span>Verified Vendors</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-xs">📍</span>
                <span>Best Venues</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-xs">👥</span>
                <span>Expert Support</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-xs">💳</span>
                <span>Budget Friendly</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Dinner Setup Image & Script Overlay */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            {/* Handwriting script overlay */}
            <div className="absolute top-6 left-2 sm:-left-4 z-20 pointer-events-none select-none">
              <div className="font-handwriting text-3xl md:text-4xl text-[#F7F4EE]/90 leading-tight transform -rotate-6">
                Events<br />
                Create<br />
                Better<br />
                People
              </div>
              {/* Subtle underline curve */}
              <svg width="90" height="20" viewBox="0 0 100 20" fill="none" className="mt-1 opacity-70">
                <path d="M5 15 C 30 5, 70 18, 95 8" stroke="#E8C98A" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>

            {/* Main Centerpiece Image Card */}
            <div className="relative w-full max-w-lg aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-white/10 group">
              <img
                src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1000&q=80&fit=crop"
                alt="Candlelit event setup"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B14]/60 via-transparent to-transparent" />
            </div>

            {/* Hero Slider Controls (Matching Screenshot 01 02 03 + Arrows) */}
            <div className="absolute bottom-4 right-4 z-20 flex items-center gap-4 bg-[#151522]/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-xs">
              <div className="flex items-center gap-2 font-mono text-white/70">
                <span className={heroSlide === 1 ? "text-[#E8C98A] font-bold border-b border-[#E8C98A]" : ""}>01</span>
                <span className={heroSlide === 2 ? "text-[#E8C98A] font-bold border-b border-[#E8C98A]" : ""}>02</span>
                <span className={heroSlide === 3 ? "text-[#E8C98A] font-bold border-b border-[#E8C98A]" : ""}>03</span>
              </div>
              <div className="flex items-center gap-1.5 ml-2">
                <button
                  onClick={() => setHeroSlide((prev) => (prev > 1 ? prev - 1 : 3))}
                  className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
                  ←
                </button>
                <button
                  onClick={() => setHeroSlide((prev) => (prev < 3 ? prev + 1 : 1))}
                  className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
                  →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════ EXPLORE EVENTS SECTION (#F7F4EE Ivory Section Matching Screenshot) ════════════════ */}
      <section className="bg-[#F7F4EE] text-[#111116] py-16 md:py-24 px-6 lg:px-12">
        <div className="max-w-[1440px] mx-auto">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <p className="text-[11px] font-mono tracking-[0.25em] text-[#6F6B66] uppercase mb-2 font-bold">
                EXPLORE EVENTS
              </p>
              <h2 className="font-serif font-bold text-3xl md:text-4xl lg:text-5xl text-[#111116] tracking-tight">
                Find the perfect event for every occasion.
              </h2>
            </div>
            <button
              onClick={() => setPage("inspiration")}
              className="text-[#111116] font-bold text-sm hover:underline underline-offset-4 flex items-center gap-1">
              <span>View All Events</span>
              <span>→</span>
            </button>
          </div>

          {/* 6 Category Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {exploreCategories.map((cat) => (
              <div
                key={cat.id}
                onClick={() => setPage(cat.page)}
                className="group relative h-56 sm:h-64 rounded-2xl overflow-hidden cursor-pointer shadow-md hover:-translate-y-1.5 transition-all duration-300">
                <img
                  src={cat.img}
                  alt={cat.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Dark gradient overlay at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#111116]/90 via-[#111116]/30 to-transparent" />

                {/* Card Content */}
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between z-10">
                  <div>
                    <h3 className="font-serif font-bold text-xl text-white mb-0.5">{cat.title}</h3>
                    <p className="text-xs text-white/75 font-medium">{cat.subtitle}</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/20 group-hover:bg-[#B89B5E] text-white flex items-center justify-center text-xs backdrop-blur-md transition-colors shadow-sm">
                    →
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Stats & Social Proof Banner (#FFFFFF Container on #F7F4EE Ivory background) */}
          <div className="bg-white border border-[#DED9CF] rounded-2xl p-6 md:p-8 shadow-sm">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 items-center">
              
              {/* Stat 1 */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#F7F4EE] flex items-center justify-center text-lg">
                  📋
                </div>
                <div>
                  <div className="font-sans font-extrabold text-xl text-[#111116]">12,000+</div>
                  <div className="text-[11px] text-[#6F6B66] font-medium">Events Done</div>
                </div>
              </div>

              {/* Stat 2 */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#F7F4EE] flex items-center justify-center text-lg">
                  👥
                </div>
                <div>
                  <div className="font-sans font-extrabold text-xl text-[#111116]">500+</div>
                  <div className="text-[11px] text-[#6F6B66] font-medium">Verified Vendors</div>
                </div>
              </div>

              {/* Stat 3 */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#F7F4EE] flex items-center justify-center text-lg">
                  📍
                </div>
                <div>
                  <div className="font-sans font-extrabold text-xl text-[#111116]">14</div>
                  <div className="text-[11px] text-[#6F6B66] font-medium">Active Cities</div>
                </div>
              </div>

              {/* Stat 4 */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#F7F4EE] flex items-center justify-center text-lg">
                  ⭐
                </div>
                <div>
                  <div className="font-sans font-extrabold text-xl text-[#111116]">99.4%</div>
                  <div className="text-[11px] text-[#6F6B66] font-medium">Happy Clients</div>
                </div>
              </div>

              {/* Quote & Avatars Block */}
              <div className="col-span-2 md:col-span-1 border-t md:border-t-0 md:border-l border-[#DED9CF] pt-4 md:pt-0 md:pl-6 flex flex-col justify-center">
                <p className="text-xs italic text-[#111116] font-serif mb-2">
                  &ldquo;Well planned events. Truly hassle free!&rdquo;
                </p>
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    <img className="w-6 h-6 rounded-full border border-white object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&q=80&fit=crop" alt="" />
                    <img className="w-6 h-6 rounded-full border border-white object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80&fit=crop" alt="" />
                    <img className="w-6 h-6 rounded-full border border-white object-cover" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&q=80&fit=crop" alt="" />
                  </div>
                  <span className="text-[10.5px] font-bold text-[#6F6B66]">Trusted by 10,000+ Happy Clients</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ════════════════ SERVICES SECTION (#151522 Dark Surface) ════════════════ */}
      <section className="bg-[#151522] py-24 px-6 lg:px-12 border-t border-white/10">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-[10.5px] font-mono font-bold uppercase tracking-[0.25em] text-[#B89B5E]">What We Provide</span>
              <h2 className="font-serif font-bold text-4xl md:text-5xl mt-2 text-white">
                Everything for Your Event
              </h2>
            </div>
            <p className="text-[#6F6B66] text-sm max-w-md leading-relaxed">
              From venue booking to catering, flower decor, photography, and managers — we arrange everything for you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {luxuryServices.map((service) => (
              <div
                key={service.id}
                onClick={() => setPage(service.page)}
                className="group relative rounded-3xl overflow-hidden transition-all duration-300 cursor-pointer flex flex-col justify-between bg-[#1C1C2B] border border-white/10 hover:border-[#B89B5E]/50 shadow-lg">
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={service.img}
                    alt=""
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80&fit=crop";
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C2B] via-[#1C1C2B]/20 to-transparent" />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase backdrop-blur-md bg-black/60 text-[#E8C98A] border border-[#B89B5E]/30">
                    {service.tag}
                  </span>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif font-bold text-2xl mb-1 text-white group-hover:text-[#E8C98A] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-[12px] font-semibold tracking-wide mb-2.5 text-[#B89B5E]">
                      {service.subtitle}
                    </p>
                    <p className="text-[13px] leading-relaxed text-white/60">
                      {service.desc}
                    </p>
                  </div>

                  <div className="mt-5 flex items-center gap-2 text-[12px] font-bold text-[#E8C98A] group-hover:translate-x-1 transition-transform">
                    <span>Explore Service</span>
                    <span>→</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════ BUDGET CALCULATOR (#F7F4EE Ivory Section) ════════════════ */}
      <section className="bg-[#F7F4EE] text-[#111116] py-24 px-6 lg:px-12 border-t border-[#DED9CF]">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

            {/* Left Column: Controls */}
            <div className="lg:col-span-5">
              <span className="text-[10.5px] font-mono font-bold uppercase tracking-[0.25em] text-[#6F6B66]">Budget Estimator</span>
              <h2 className="font-serif font-bold text-4xl md:text-5xl mt-2 mb-3 text-[#111116]">
                Event Cost Calculator
              </h2>
              <p className="text-sm leading-relaxed mb-8 text-[#6F6B66]">
                Select your event details to see a live breakdown of your estimated expenses across venue, food, decor, stage, and staff.
              </p>

              {/* Event Type Toggle */}
              <div className="mb-6">
                <label className="block text-[11px] uppercase tracking-wider mb-2 font-bold text-[#6F6B66]">Event Type</label>
                <div className="grid grid-cols-3 gap-1.5 p-1.5 rounded-full border border-[#DED9CF] bg-white shadow-sm">
                  {[
                    { id: "wedding", label: "Wedding" },
                    { id: "gala", label: "Party / Gala" },
                    { id: "private", label: "Small Event" }
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setEventVision(item.id)}
                      className={`py-2 px-3 rounded-full text-[12px] font-bold transition-all ${
                        eventVision === item.id
                          ? "btn-gold-champagne !px-3 !py-2 text-[#111116] shadow-md"
                          : "text-[#6F6B66] hover:text-[#111116]"
                      }`}>
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Guest Count Slider */}
              <div className="mb-7 rounded-3xl p-6 border border-[#DED9CF] bg-white shadow-sm">
                <div className="flex justify-between items-center mb-3">
                  <label className="text-[11px] uppercase tracking-wider font-bold text-[#6F6B66]">Guest Count</label>
                  <span className="font-mono text-xl font-bold text-[#B89B5E]">{guestCount} Guests</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="1500"
                  step="25"
                  value={guestCount}
                  onChange={(e) => setGuestCount(Number(e.target.value))}
                  className="w-full accent-[#B89B5E] h-2 bg-[#F7F4EE] rounded-lg cursor-pointer"
                />
              </div>

              {/* Venue Style Toggle */}
              <div className="mb-8">
                <label className="block text-[11px] uppercase tracking-wider mb-2 font-bold text-[#6F6B66]">Venue Style</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "heritage", label: "Palace / Resort" },
                    { id: "oceanfront", label: "Banquet Hall" },
                    { id: "glasshouse", label: "Rooftop" }
                  ].map((style) => (
                    <button
                      key={style.id}
                      onClick={() => setVenueStyle(style.id)}
                      className={`p-3 rounded-2xl text-left border text-[12px] transition-all ${
                        venueStyle === style.id
                          ? "border-[#B89B5E] bg-[#B89B5E]/10 text-[#111116] font-bold shadow-sm"
                          : "border-[#DED9CF] bg-white text-[#6F6B66] hover:border-[#B89B5E]"
                      }`}>
                      <div className="font-bold mb-0.5">{style.label}</div>
                      <div className="text-[10px] opacity-70 font-normal">Option</div>
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setPage("booking")}
                className="btn-gold-champagne w-full py-4 rounded-full font-bold text-[14px] justify-center">
                Get Detailed Quote →
              </button>
            </div>

            {/* Right Column: Clean Breakdown Card */}
            <div className="lg:col-span-7 rounded-3xl p-8 md:p-10 border border-[#DED9CF] bg-white shadow-xl text-[#111116]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#DED9CF] pb-6 mb-6">
                <div>
                  <div className="text-[10.5px] uppercase tracking-[0.2em] font-bold mb-1 text-[#6F6B66]">Estimated Total Budget</div>
                  <div className="font-mono text-4xl font-extrabold tracking-tight text-[#111116]">₹{(totalBudget / 100000).toFixed(2)} Lakhs</div>
                </div>
                <div className="mt-4 sm:mt-0 text-right">
                  <div className="text-[11.5px] text-[#6F6B66]">Cost Per Guest</div>
                  <div className="font-mono text-base font-bold text-[#B89B5E]">₹{Math.round(totalBudget / guestCount).toLocaleString()}</div>
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
                  <div key={item.label}>
                    <div className="flex justify-between text-xs font-semibold mb-1 text-[#111116]">
                      <span>{item.label}</span>
                      <span className="font-mono text-[#B89B5E]">₹{item.cost.toLocaleString()}</span>
                    </div>
                    <div className="h-2 w-full bg-[#F7F4EE] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#E8C98A] to-[#B89B5E]"
                        style={{ width: `${item.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ════════════════ FEATURED ESTATES (#151522 Dark Surface) ════════════════ */}
      <section className="bg-[#151522] py-24 px-6 lg:px-12 border-t border-white/10">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-[10.5px] font-mono font-bold uppercase tracking-[0.25em] text-[#B89B5E]">Handpicked Venues</span>
              <h2 className="font-serif font-bold text-4xl md:text-5xl mt-2 text-white">
                Featured Event Estates
              </h2>
            </div>
            <button
              onClick={() => setPage("venues")}
              className="text-[#E8C98A] font-bold text-sm hover:underline flex items-center gap-1">
              <span>View All 500+ Venues</span>
              <span>→</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredEstates.map((estate) => (
              <div
                key={estate.name}
                onClick={() => setPage("venues")}
                className="group rounded-3xl overflow-hidden bg-[#1C1C2B] border border-white/10 hover:border-[#B89B5E]/50 transition-all duration-300 cursor-pointer shadow-lg">
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={estate.img}
                    alt={estate.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold bg-black/70 text-[#E8C98A] border border-[#B89B5E]/40 backdrop-blur-md">
                    {estate.badge}
                  </span>
                  <span className="absolute top-4 right-4 px-2.5 py-1 rounded-full text-[11px] font-bold bg-white text-[#111116] shadow-md">
                    ★ {estate.rating}
                  </span>
                </div>

                <div className="p-5">
                  <h3 className="font-serif font-bold text-lg text-white mb-1 group-hover:text-[#E8C98A] transition-colors">
                    {estate.name}
                  </h3>
                  <p className="text-xs text-white/50 mb-4">{estate.location}</p>
                  <div className="flex items-center justify-between border-t border-white/10 pt-3">
                    <span className="text-xs font-semibold text-white/70">{estate.guests}</span>
                    <span className="font-mono text-sm font-bold text-[#E8C98A]">{estate.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════ CLIENT STORIES SECTION (#F7F4EE Ivory) ════════════════ */}
      <section className="bg-[#F7F4EE] text-[#111116] py-24 px-6 lg:px-12 border-t border-[#DED9CF]">
        <div className="max-w-[1440px] mx-auto text-center">
          <span className="text-[10.5px] font-mono font-bold uppercase tracking-[0.25em] text-[#6F6B66]">Testimonials</span>
          <h2 className="font-serif font-bold text-4xl md:text-5xl mt-2 mb-12 text-[#111116]">
            Loved by Couples & Companies
          </h2>

          <div className="max-w-3xl mx-auto bg-white border border-[#DED9CF] rounded-3xl p-8 md:p-12 shadow-sm relative">
            <p className="font-serif text-xl md:text-2xl italic leading-relaxed text-[#111116] mb-8">
              &ldquo;{clientStories[activeStory].quote}&rdquo;
            </p>

            <div className="flex items-center justify-center gap-4">
              <img
                src={clientStories[activeStory].img}
                alt={clientStories[activeStory].author}
                className="w-12 h-12 rounded-full object-cover border-2 border-[#B89B5E]"
              />
              <div className="text-left">
                <div className="font-bold text-base text-[#111116]">{clientStories[activeStory].author}</div>
                <div className="text-xs text-[#6F6B66]">{clientStories[activeStory].event}</div>
              </div>
            </div>

            {/* Pagination dots */}
            <div className="flex justify-center gap-2 mt-8">
              {clientStories.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveStory(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    activeStory === idx ? "w-8 bg-[#B89B5E]" : "bg-[#DED9CF]"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
