import React, { useState, useEffect, Suspense } from "react";
import Nav from "./components/Nav";
import { SkeletonDashboard } from "./components/SkeletonLoader";
import WelcomeOptionsModal from "./components/WelcomeOptionsModal";

/* ── Lazy page imports ───────────────────────────── */
import Home            from "./pages/Home";
import BookingFlow     from "./pages/BookingFlow";
import Venues          from "./pages/Venues";
import Vendors         from "./pages/Vendors";
import Workers         from "./pages/Workers";
import ClientDashboard from "./pages/ClientDashboard";
import VendorDashboard from "./pages/VendorDashboard";
import ManagerDashboard from "./pages/ManagerDashboard";
import AdminDashboard  from "./pages/AdminDashboard";
import WhatsApp        from "./pages/WhatsApp";
import SmartQR         from "./pages/SmartQR";
import BrandWorks      from "./pages/BrandWorks";
import Contact         from "./pages/Contact";
import EventInspiration from "./pages/EventInspiration";
import Payments        from "./pages/Payments";
import FamilyAssistant from "./pages/FamilyAssistant";

/* ── About page ─────────────────────────────────── */
function About({ setPage, isLightMode = false }: { setPage: (p: string) => void; isLightMode?: boolean }) {
  const values = [
    { icon:"🎯", title:"Our Mission",    desc:"To make event management simple, accessible, transparent, and stress-free for every family and company in Bangalore and across India." },
    { icon:"💡", title:"Our Technology", desc:"Real-time venue availability, 2-minute callback support, Smart QR check-in, and clear budget estimation." },
    { icon:"🏆", title:"Our Impact",     desc:"12,000+ events managed, ₹180Cr+ venue bookings, and 99.4% client satisfaction across Bangalore and 14 major cities." },
  ];

  const team = [
    { name:"Vikram Nair",  role:"CEO & Co-Founder",       avatar:"VN" },
    { name:"Sneha Patel",  role:"CTO & Co-Founder",       avatar:"SP" },
    { name:"Arjun Das",    role:"Head of Bangalore Ops",  avatar:"AD" },
    { name:"Kavitha Iyer", role:"Head of Vendor Success", avatar:"KI" },
  ];

  return (
    <div className={`min-h-screen pt-8 pb-20 px-6 transition-colors duration-300 ${
      isLightMode ? "bg-[#F7F4EE] text-[#111116]" : "bg-[#0B0B14] text-[#F7F4EE]"
    }`}>
      <div className="max-w-[1440px] mx-auto">

        {/* Hero */}
        <div className="text-center mb-16">
          <p className="text-[12px] text-[#B89B5E] font-bold tracking-[0.25em] uppercase mb-3">Our Story</p>
          <h1 className={`font-serif font-bold text-5xl md:text-7xl mb-5 ${isLightMode ? "text-[#111116]" : "text-white"}`}>
            About <span className="font-handwriting text-[#B89B5E] normal-case text-6xl md:text-8xl">EVENTTRUST</span>
          </h1>
          <p className={`text-lg max-w-2xl mx-auto leading-relaxed font-medium ${isLightMode ? "text-[#6F6B66]" : "text-white/60"}`}>
            India&apos;s premier event management platform — connecting you with venues, caterers, decorators, and experienced event managers.
          </p>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {values.map(v => (
            <div key={v.title} className={`rounded-3xl p-8 border relative overflow-hidden transition-all hover:shadow-lg ${
              isLightMode ? "bg-white border-[#DED9CF] text-[#111116]" : "bg-[#151522] border-white/10 text-white"
            }`}>
              <div className="text-4xl mb-4">{v.icon}</div>
              <h3 className="font-serif font-bold text-2xl mb-3">{v.title}</h3>
              <p className={`text-[14px] leading-relaxed font-medium ${isLightMode ? "text-[#6F6B66]" : "text-white/60"}`}>{v.desc}</p>
            </div>
          ))}
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-16">
          {[
            { value:"2021", label:"Company Founded"      },
            { value:"14",   label:"Active Cities"        },
            { value:"120+", label:"Team Members"         },
            { value:"₹180Cr", label:"Events Managed Value" },
          ].map(s => (
            <div key={s.label} className={`rounded-2xl p-6 text-center border ${
              isLightMode ? "bg-white border-[#DED9CF]" : "bg-[#151522] border-white/10"
            }`}>
              <div className="font-serif font-bold text-3xl mb-1 text-[#B89B5E]">{s.value}</div>
              <div className={`text-[11.5px] uppercase tracking-wider font-bold ${isLightMode ? "text-[#6F6B66]" : "text-white/45"}`}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Team */}
        <div className="mb-16">
          <h2 className={`font-serif font-bold text-4xl mb-8 text-center ${isLightMode ? "text-[#111116]" : "text-white"}`}>
            Meet the <span className="font-handwriting text-[#B89B5E] text-5xl">Team</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {team.map(m => (
              <div key={m.name} className={`rounded-3xl p-6 border text-center transition-all hover:shadow-md ${
                isLightMode ? "bg-white border-[#DED9CF] text-[#111116]" : "bg-[#151522] border-white/10 text-white"
              }`}>
                <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center font-serif font-bold text-xl text-[#111116] shadow-md grad-champagne">
                  {m.avatar}
                </div>
                <h3 className="font-serif font-bold text-xl">{m.name}</h3>
                <p className={`text-[12px] mt-0.5 font-medium ${isLightMode ? "text-[#6F6B66]" : "text-white/45"}`}>{m.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className={`rounded-3xl p-12 border text-center relative overflow-hidden ${
          isLightMode ? "bg-white border-[#DED9CF] text-[#111116] shadow-md" : "bg-[#151522] border-[#B89B5E]/30 text-white"
        }`}>
          <div className="relative z-10">
            <h2 className="font-serif font-bold text-4xl mb-4">Join the EVENTTRUST Ecosystem</h2>
            <p className={`mb-8 text-[15px] max-w-lg mx-auto font-medium ${isLightMode ? "text-[#6F6B66]" : "text-white/60"}`}>
              Whether you&apos;re planning a wedding near Bangalore or hosting a corporate event — we are here to help.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button className="btn-gold-champagne px-8 py-3 rounded-full text-[14px]" onClick={() => setPage("booking")}>Plan My Event →</button>
              <button className={isLightMode ? "px-6 py-3 rounded-full font-bold bg-[#F7F4EE] text-[#111116] border border-[#DED9CF] hover:bg-[#E8C98A]/20" : "btn-hero-outline"} onClick={() => setPage("vendor-dashboard")}>Join as Vendor</button>
              <button className={isLightMode ? "px-6 py-3 rounded-full font-bold bg-[#F7F4EE] text-[#111116] border border-[#DED9CF] hover:bg-[#E8C98A]/20" : "btn-hero-outline"} onClick={() => setPage("contact")}>Contact Us</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
function AmbientBackdrop() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-[#0E051D]" aria-hidden="true">
      <div className="absolute -top-40 -left-40 w-[700px] h-[700px] bg-purple-600/15 rounded-full blur-[180px]" />
      <div className="absolute top-1/2 -right-40 w-[600px] h-[600px] bg-pink-600/12 rounded-full blur-[180px]" />
    </div>
  );
}

/* ── Router ──────────────────────────────────────── */
type PageProps = { setPage: (p: string) => void; isLightMode?: boolean };
type PageComponent = (props: PageProps) => React.ReactElement;

const ROUTES: Record<string, PageComponent> = {
  home:               ({ setPage, isLightMode }) => <Home setPage={setPage} isLightMode={isLightMode} />,
  booking:            ({ isLightMode })          => <BookingFlow isLightMode={isLightMode} />,
  venues:             ({ isLightMode })          => <Venues isLightMode={isLightMode} />,
  vendors:            ({ setPage, isLightMode }) => <Vendors setPage={setPage} isLightMode={isLightMode} />,
  workers:            ({ isLightMode })          => <Workers isLightMode={isLightMode} />,
  budget:             ({ isLightMode })          => <BookingFlow isLightMode={isLightMode} />,
  inspiration:        ({ setPage, isLightMode }) => <EventInspiration setPage={setPage} isLightMode={isLightMode} />,
  about:              ({ setPage, isLightMode }) => <About setPage={setPage} isLightMode={isLightMode} />,
  contact:            ({ isLightMode })          => <Contact isLightMode={isLightMode} />,
  payments:           ({ isLightMode })          => <Payments isLightMode={isLightMode} />,
  family:             ({ isLightMode })          => <FamilyAssistant isLightMode={isLightMode} />,
  "client-dashboard": ({ isLightMode })          => <ClientDashboard isLightMode={isLightMode} />,
  "vendor-dashboard": ({ isLightMode })          => <VendorDashboard isLightMode={isLightMode} />,
  "manager-dashboard":({ isLightMode })          => <ManagerDashboard isLightMode={isLightMode} />,
  "admin-dashboard":  ({ isLightMode })          => <AdminDashboard isLightMode={isLightMode} />,
  whatsapp:           ({ isLightMode })          => <WhatsApp isLightMode={isLightMode} />,
  "smart-qr":         ({ isLightMode })          => <SmartQR isLightMode={isLightMode} />,
  brandworks:         ({ isLightMode })          => <BrandWorks isLightMode={isLightMode} />,
};

/* ── App root ────────────────────────────────────── */
export default function App() {
  const [page, setPage] = useState("home");
  const [callbackModalOpen, setCallbackModalOpen] = useState(false);
  /* Studio Background Mode matching reference image: "studio-light" | "studio-dark" | "full" */
  const [studioTheme, setStudioTheme] = useState<"studio-light" | "studio-dark" | "full">("studio-light");

  const navigate = (p: string) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* Keyboard shortcut: Escape → home */
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape" && page !== "home") navigate("home"); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [page]);

  const Component = ROUTES[page] ?? ROUTES.home;

  /* Theme styling helper classes */
  const isLight = studioTheme === "studio-light";
  const outerBgClass = 
    studioTheme === "studio-light" 
      ? "studio-bg-light p-2 sm:p-6 md:p-10 min-h-screen transition-all duration-500 font-sans" 
      : studioTheme === "studio-dark"
      ? "studio-bg-dark p-2 sm:p-6 md:p-10 min-h-screen transition-all duration-500 font-sans"
      : "bg-[#0E051D] min-h-screen transition-all duration-500 font-sans";

  const frameClass =
    studioTheme !== "full"
      ? `max-w-[1520px] mx-auto studio-frame ${
          isLight ? "studio-frame-light bg-white text-slate-900" : "studio-frame-dark bg-[#0E051D] text-[#F8F5FF]"
        } relative transition-all duration-500 overflow-hidden min-h-[92vh]`
      : `relative min-h-screen ${isLight ? "bg-white text-slate-900" : "bg-[#0E051D] text-[#F8F5FF]"}`;

  return (
    <div className={outerBgClass}>
      {/* Main Canvas Frame Container */}
      <div className={frameClass}>
        {!isLight && <AmbientBackdrop />}

        {/* 2-Min Live Callback Dialog */}
        <WelcomeOptionsModal
          isOpen={callbackModalOpen}
          onClose={() => setCallbackModalOpen(false)}
        />

        <div className="relative z-10">
          <Nav
            currentPage={page}
            setPage={navigate}
            isLightMode={isLight}
            studioTheme={studioTheme}
            setStudioTheme={setStudioTheme}
          />

          <main className="pt-0">
            <Suspense fallback={
              <div className="pt-24 px-6 max-w-[1440px] mx-auto">
                <SkeletonDashboard />
              </div>
            }>
              <Component setPage={navigate} isLightMode={isLight} />
            </Suspense>
          </main>
        </div>
      </div>

      {/* Floating Sticky Option Bar + Quick Theme Switcher */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2 p-1.5 rounded-full bg-slate-900/90 border border-slate-700/50 backdrop-blur-xl shadow-2xl text-white">
        <button
          onClick={() => navigate("whatsapp")}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 text-[12px] font-medium transition-all">
          <span>💬 WhatsApp</span>
        </button>
        <button
          onClick={() => setCallbackModalOpen(true)}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:brightness-110 text-[12px] font-semibold transition-all shadow-md">
          <span>📞 Call Me in 2 Min</span>
        </button>
        <button
          onClick={() => setStudioTheme(isLight ? "studio-dark" : "studio-light")}
          className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 text-[11.5px] font-semibold transition-all border border-white/10">
          <span>{isLight ? "🌙 Studio Dark" : "✨ Studio Light"}</span>
        </button>
      </div>
    </div>
  );
}

