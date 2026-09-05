import { useState } from "react";

const themes = [
  { id: "all",       label: "All Themes",      icon: "✨" },
  { id: "royal",     label: "Royal & Regal",   icon: "👑" },
  { id: "minimal",   label: "Minimal Chic",    icon: "🤍" },
  { id: "boho",      label: "Boho Garden",     icon: "🌿" },
  { id: "beach",     label: "Coastal",         icon: "🌊" },
  { id: "vintage",   label: "Vintage Glam",    icon: "🌹" },
  { id: "neon",      label: "Neon Night",      icon: "💜" },
  { id: "pastel",    label: "Pastel Dream",    icon: "🌸" },
];

const inspirations = [
  { title:"Royal Rajputana Wedding",   cat:"royal",   img:"1519167758481-83f550bb49b3", city:"Jaipur",    budget:"₹25L+",  likes:2840, type:"Wedding"    },
  { title:"Minimal Rooftop Proposal",  cat:"minimal", img:"1507525428034-b723cf961d3e", city:"Mumbai",    budget:"₹3L",    likes:1204, type:"Engagement" },
  { title:"Boho Forest Birthday",      cat:"boho",    img:"1464366400600-ac2779b46d32", city:"Coorg",     budget:"₹4.5L",  likes:987,  type:"Birthday"   },
  { title:"Azure Beachfront Gala",     cat:"beach",   img:"1519225421980-1bb2832ac795", city:"Goa",       budget:"₹12L",   likes:3120, type:"Corporate"  },
  { title:"Vintage Art Deco Soirée",   cat:"vintage", img:"1518013491992-f36ba424a66a", city:"Delhi",     budget:"₹8L",    likes:1876, type:"Anniversary"},
  { title:"Neon Galaxy Night Party",   cat:"neon",    img:"1493225457124-a3eb161ffa5f", city:"Hyderabad", budget:"₹6L",    likes:2241, type:"Birthday"   },
  { title:"Pastel Cherry Blossom Wed", cat:"pastel",  img:"1460978812857-470c0b00fb01", city:"Pune",      budget:"₹15L",   likes:4302, type:"Wedding"    },
  { title:"Crystal Ballroom Gala",     cat:"royal",   img:"1526046031180-77f6f6a4d1f3", city:"Mumbai",    budget:"₹30L+",  likes:1589, type:"Corporate"  },
  { title:"Earthy Monsoon Wedding",    cat:"boho",    img:"1414235077428-338989a2e8c0", city:"Kerala",    budget:"₹10L",   likes:2018, type:"Wedding"    },
];

const moodboards = [
  { title:"Midnight Luxe",    colors:["#0D0020","#6A38FF","#D4AF37","#1A0035"], vibe:"Opulent · Dark · Dramatic" },
  { title:"Rose Gold Romance",colors:["#FFF0F3","#F9A8D4","#C77DFF","#D4AF37"], vibe:"Romantic · Soft · Elegant"  },
  { title:"Coastal Zen",      colors:["#0EA5E9","#E0F2FE","#FFFFFF","#10B981"], vibe:"Fresh · Minimal · Serene"   },
  { title:"Royal Forest",     colors:["#064E3B","#D4AF37","#FFFBEB","#065F46"], vibe:"Lush · Grand · Natural"     },
];

export default function EventInspiration({ setPage }: { setPage: (p: string) => void }) {
  const [activeTheme, setActiveTheme] = useState("all");
  const [liked, setLiked] = useState<Set<string>>(new Set());

  const filtered = activeTheme === "all" ? inspirations : inspirations.filter(i => i.cat === activeTheme);

  const toggleLike = (title: string) => {
    setLiked(prev => {
      const n = new Set(prev);
      n.has(title) ? n.delete(title) : n.add(title);
      return n;
    });
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-[1440px] mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-[12px] text-purple-400 font-semibold tracking-[0.25em] uppercase mb-3">Curated Gallery</p>
          <h1 className="font-display font-700 text-4xl md:text-5xl mb-4">
            Event <span className="grad-primary">Inspiration</span>
          </h1>
          <p className="text-white/50 text-[16px] max-w-xl mx-auto">
            Browse real EVENTTRUST events, curated mood boards, and theme galleries. Save your favourites and share with your planner.
          </p>
        </div>

        {/* Theme filter */}
        <div className="flex gap-2.5 overflow-x-auto pb-2 mb-10 justify-center flex-wrap">
          {themes.map(t => (
            <button key={t.id} onClick={() => setActiveTheme(t.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-medium whitespace-nowrap border transition-all ${
                activeTheme === t.id
                  ? "tab-active"
                  : "glass border-white/10 text-white/55 hover:border-white/25 hover:text-white"
              }`}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {filtered.map((item, i) => (
            <div key={item.title} className={`glass rounded-3xl overflow-hidden border border-white/9 hover-lift group ${i % 5 === 0 ? "sm:col-span-2 lg:col-span-1" : ""}`}>
              <div className="relative overflow-hidden" style={{ height: i % 3 === 0 ? 280 : 220 }}>
                <img
                  src={`https://images.unsplash.com/photo-${item.img}?w=700&h=500&fit=crop&auto=format`}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-600"
                />
                <div className="absolute inset-0" style={{ background:"linear-gradient(to top, rgba(5,1,10,0.85) 0%, transparent 55%)" }} />

                {/* Like button */}
                <button
                  onClick={() => toggleLike(item.title)}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full glass-strong flex items-center justify-center transition-all hover:scale-110 active:scale-95">
                  <span style={{ color: liked.has(item.title) ? "#EF4444" : "rgba(255,255,255,0.7)", fontSize: 16 }}>
                    {liked.has(item.title) ? "❤️" : "🤍"}
                  </span>
                </button>

                {/* Budget chip */}
                <div className="absolute top-4 left-4 glass-strong rounded-xl px-3 py-1 text-[11px] font-semibold text-amber-300">
                  {item.budget}
                </div>

                {/* Bottom info overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="font-display font-600 text-[15px] text-white mb-1">{item.title}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-white/50 text-[12px]">📍 {item.city}</span>
                    <div className="flex items-center gap-2">
                      <span className="chip chip-progress text-[10px]">{item.type}</span>
                      <span className="text-white/40 text-[11px]">❤ {(item.likes + (liked.has(item.title) ? 1 : 0)).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 flex gap-3">
                <button onClick={() => setPage("booking")}
                  className="flex-1 py-2.5 rounded-xl text-[12px] font-semibold text-white text-center"
                  style={{ background:"linear-gradient(135deg,#6A38FF,#8B5CF6)" }}>
                  Book This Theme
                </button>
                <button className="px-4 py-2.5 rounded-xl text-[12px] font-medium glass border border-white/12 text-white/65 hover:border-white/25 hover:text-white transition-all">
                  Save
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Mood boards section */}
        <div className="mb-12">
          <h2 className="font-display font-700 text-3xl mb-2">Curated <span className="grad-gold">Mood Boards</span></h2>
          <p className="text-white/45 text-[14px] mb-8">AI-generated palettes matched to your event vibe</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {moodboards.map(mb => (
              <div key={mb.title} className="glass rounded-3xl p-5 border border-white/9 hover-lift-sm group cursor-pointer">
                {/* Color swatches */}
                <div className="flex gap-2 mb-5">
                  {mb.colors.map((c, ci) => (
                    <div key={ci} className="flex-1 h-16 rounded-xl shadow-md transition-transform group-hover:scale-105"
                      style={{ background:c, transitionDelay:`${ci * 50}ms` }} />
                  ))}
                </div>
                <h3 className="font-display font-600 text-[16px] text-white mb-1">{mb.title}</h3>
                <p className="text-white/45 text-[12px] italic">{mb.vibe}</p>
                <button className="mt-4 w-full py-2 rounded-xl text-[12px] font-medium text-purple-400 border border-purple-500/25 hover:bg-purple-500/10 transition-all">
                  Use This Palette
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="glass rounded-3xl p-10 border border-purple-500/18 text-center relative overflow-hidden">
          <div className="orb w-80 h-80 animate-orb" style={{ background:"rgba(106,56,255,0.12)", top:"-40%", left:"50%", transform:"translateX(-50%)" }} />
          <div className="relative z-10">
            <h2 className="font-display font-700 text-3xl mb-3">Love a theme? <span className="grad-primary">Let&apos;s Build It.</span></h2>
            <p className="text-white/55 text-[15px] mb-7 max-w-lg mx-auto">
              Share your saved inspirations with your EVENTTRUST manager and we&apos;ll turn your vision into reality.
            </p>
            <button className="btn-primary" onClick={() => setPage("booking")}>
              Start Planning This Theme →
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
