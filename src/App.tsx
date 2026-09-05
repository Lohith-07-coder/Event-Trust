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
function About({ setPage }: { setPage: (p: string) => void }) {
  const values = [
    { icon:"🎯", title:"Our Mission",    desc:"To make event management simple, accessible, transparent, and stress-free for every family and company in Bangalore and across India." },
    { icon:"💡", title:"Our Technology", desc:"Real-time venue availability, 2-minute callback support, Smart QR check-in, and clear budget estimation." },
    { icon:"🏆", title:"Our Impact",     desc:"12,000+ events managed, ₹180Cr+ venue bookings, and 99.4% client satisfaction across Bangalore and 14 major cities." },
  ];

  const team = [
    { name:"Vikram Nair",  role:"CEO & Co-Founder",       avatar:"VN", bg:"#7C4DFF" },
    { name:"Sneha Patel",  role:"CTO & Co-Founder",       avatar:"SP", bg:"#38BDF8" },
    { name:"Arjun Das",    role:"Head of Bangalore Ops",  avatar:"AD", bg:"#34D399" },
    { name:"Kavitha Iyer", role:"Head of Vendor Success", avatar:"KI", bg:"#E2C08D" },
  ];

  return (
    <div className="min-h-screen pt-24 pb-20 px-6 bg-[#09090C] text-[#F4F4F6]">
      <div className="max-w-[1440px] mx-auto">

        {/* Hero */}
        <div className="text-center mb-20">
          <p className="text-[11px] text-amber-300 font-semibold tracking-[0.25em] uppercase mb-3">Our Story</p>
          <h1 className="font-serif font-light text-5xl md:text-7xl mb-5 text-white">
            About <span className="italic text-amber-200">EVENTTRUST</span>
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto leading-relaxed font-light">
            India&apos;s premier event management platform — connecting you with venues, caterers, decorators, and experienced event managers.
          </p>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {values.map(v => (
            <div key={v.title} className="bg-[#111116] rounded-2xl p-8 border border-white/10 relative overflow-hidden">
              <div className="text-4xl mb-4">{v.icon}</div>
              <h3 className="font-serif font-normal text-2xl text-white mb-3">{v.title}</h3>
              <p className="text-white/55 text-[14px] leading-relaxed font-light">{v.desc}</p>
            </div>
          ))}
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-20">
          {[
            { value:"2021", label:"Company Founded"      },
            { value:"14",   label:"Active Cities"        },
            { value:"120+", label:"Team Members"         },
            { value:"₹180Cr", label:"Events Managed Value" },
          ].map(s => (
            <div key={s.label} className="bg-[#111116] rounded-2xl p-6 text-center border border-white/10">
              <div className="font-mono font-medium text-3xl text-amber-200 mb-1">{s.value}</div>
              <div className="text-white/45 text-[12.5px] uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Team */}
        <div className="mb-20">
          <h2 className="font-serif font-light text-4xl mb-8 text-center text-white">Meet the <span className="italic text-amber-200">Team</span></h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {team.map(m => (
              <div key={m.name} className="bg-[#111116] rounded-2xl p-6 border border-white/10 text-center">
                <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center font-mono font-semibold text-xl text-black"
                  style={{ background:`${m.bg}` }}>
                  {m.avatar}
                </div>
                <h3 className="font-serif font-normal text-lg text-white">{m.name}</h3>
                <p className="text-white/45 text-[12px] mt-0.5">{m.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-[#121217] rounded-3xl p-12 border border-amber-300/20 text-center relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="font-serif font-light text-4xl mb-4 text-white">Join the EVENTTRUST Ecosystem</h2>
            <p className="text-white/55 mb-8 text-[15px] max-w-lg mx-auto font-light">
              Whether you&apos;re planning a wedding near Bangalore or hosting a corporate event — we are here to help.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button className="btn-primary" onClick={() => setPage("booking")}>Plan My Event</button>
              <button className="btn-ghost" onClick={() => setPage("vendor-dashboard")}>Join as Vendor</button>
              <button className="btn-ghost" onClick={() => setPage("contact")}>Contact Us</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

/* ── Ambient luxury lighting backdrop ────────────── */
function AmbientBackdrop() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-[#09090C]" aria-hidden="true">
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[160px]" />
      <div className="absolute top-1/2 -right-40 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[160px]" />
    </div>
  );
}

/* ── Router ──────────────────────────────────────── */
type PageComponent = (props: { setPage: (p: string) => void }) => React.ReactElement;

const ROUTES: Record<string, PageComponent> = {
  home:               ({ setPage }) => <Home setPage={setPage} />,
  booking:            ()           => <BookingFlow />,
  venues:             ()           => <Venues />,
  vendors:            ({ setPage }) => <Vendors setPage={setPage} />,
  workers:            ()           => <Workers />,
  budget:             ()           => <BookingFlow />,
  inspiration:        ({ setPage }) => <EventInspiration setPage={setPage} />,
  about:              ({ setPage }) => <About setPage={setPage} />,
  contact:            ()           => <Contact />,
  payments:           ()           => <Payments />,
  family:             ()           => <FamilyAssistant />,
  "client-dashboard": ()           => <ClientDashboard />,
  "vendor-dashboard": ()           => <VendorDashboard />,
  "manager-dashboard":()           => <ManagerDashboard />,
  "admin-dashboard":  ()           => <AdminDashboard />,
  whatsapp:           ()           => <WhatsApp />,
  "smart-qr":         ()           => <SmartQR />,
  brandworks:         ()           => <BrandWorks />,
};

/* ── App root ────────────────────────────────────── */
export default function App() {
  const [page, setPage] = useState("home");
  const [callbackModalOpen, setCallbackModalOpen] = useState(false);

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

  return (
    <div className="relative min-h-screen bg-[#09090C] text-[#F4F4F6]">
      <AmbientBackdrop />

      {/* 2-Min Live Callback Dialog */}
      <WelcomeOptionsModal
        isOpen={callbackModalOpen}
        onClose={() => setCallbackModalOpen(false)}
      />

      <div className="relative z-10">
        <Nav currentPage={page} setPage={navigate} />

        <main>
          <Suspense fallback={
            <div className="pt-24 px-6 max-w-[1440px] mx-auto">
              <SkeletonDashboard />
            </div>
          }>
            <Component setPage={navigate} />
          </Suspense>
        </main>
      </div>

      {/* Floating Sticky 3-Option Bar */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2 p-1.5 rounded-full bg-[#121217]/95 border border-amber-300/30 backdrop-blur-xl shadow-2xl">
        <button
          onClick={() => navigate("whatsapp")}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 text-[12px] font-medium transition-all">
          <span>💬 WhatsApp</span>
        </button>
        <button
          onClick={() => setCallbackModalOpen(true)}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-300/20 text-amber-200 hover:bg-amber-300/30 text-[12px] font-medium transition-all">
          <span>📞 Call Me in 2 Min</span>
        </button>
        <button
          onClick={() => navigate("booking")}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 text-white hover:bg-white/20 text-[12px] font-medium transition-all">
          <span>🏛️ Plan by Yourself</span>
        </button>
      </div>
    </div>
  );
}
