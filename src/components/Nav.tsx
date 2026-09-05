import { useState, useEffect } from "react";

const primaryLinks = [
  { label: "Home",             page: "home"        },
  { label: "Book Event",       page: "booking"     },
  { label: "Venues",           page: "venues"      },
  { label: "Vendors",          page: "vendors"     },
  { label: "Event Staff",      page: "workers"     },
  { label: "Budget Calculator",page: "budget"      },
  { label: "Ideas & Themes",   page: "inspiration" },
  { label: "About Us",         page: "about"       },
  { label: "Contact Us",       page: "contact"     },
];

const dashboardLinks = [
  { label: "Client Dashboard",  page: "client-dashboard",  icon: "👤" },
  { label: "Vendor Dashboard",  page: "vendor-dashboard",  icon: "🏪" },
  { label: "Manager Dashboard", page: "manager-dashboard", icon: "📋" },
  { label: "Admin Dashboard",   page: "admin-dashboard",   icon: "⚡" },
  { label: "Payments",          page: "payments",           icon: "💳" },
  { label: "Family Assistant",  page: "family",             icon: "👨‍👩‍👧‍👦" },
  { label: "WhatsApp Assistant",page: "whatsapp",           icon: "💬" },
  { label: "Smart Guest QR",    page: "smart-qr",           icon: "📱" },
  { label: "Brand Works",       page: "brandworks",         icon: "🏷️" },
];

interface NavProps {
  currentPage: string;
  setPage: (p: string) => void;
}

export default function Nav({ currentPage, setPage }: NavProps) {
  const [mobileOpen, setMobileOpen]   = useState(false);
  const [dashOpen,   setDashOpen]     = useState(false);
  const [scrolled,   setScrolled]     = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const close = () => setDashOpen(false);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  const go = (p: string) => { setPage(p); setMobileOpen(false); setDashOpen(false); };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled
        ? "bg-[#09090C]/90 backdrop-blur-xl border-b border-white/10 py-2 shadow-2xl"
        : "bg-gradient-to-b from-[#09090C]/80 to-transparent backdrop-blur-md py-3"
    }`}>
      <div className="max-w-[1440px] mx-auto px-6 h-[58px] flex items-center justify-between gap-4">

        {/* ── Brand Emblem & Title ── */}
        <button onClick={() => go("home")} className="flex items-center gap-3 shrink-0 group text-left">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="flex flex-col text-left">
            <span className="font-serif font-400 text-lg tracking-wider text-white leading-none">
              EVENTTRUST
            </span>
            <span className="text-[9.5px] tracking-[0.15em] text-amber-300/90 font-medium uppercase mt-1">
              Event Management & Planning
            </span>
          </div>
        </button>

        {/* ── Desktop Links ── */}
        <div className="hidden xl:flex items-center gap-1">
          {primaryLinks.map(l => (
            <button
              key={l.page}
              onClick={() => go(l.page)}
              className={`px-3 py-1.5 rounded-lg text-[13px] font-medium transition-all ${
                currentPage === l.page
                  ? "text-amber-200 bg-amber-500/10 border border-amber-500/30"
                  : "text-white/70 hover:text-white hover:bg-white/5"
              }`}>
              {l.label}
            </button>
          ))}

          {/* Dashboards dropdown */}
          <div className="relative ml-2" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setDashOpen(!dashOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px] font-medium text-white/70 hover:text-white hover:bg-white/5 transition-all">
              <span>Dashboards</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"
                className={`transition-transform duration-200 ${dashOpen ? "rotate-180" : ""}`}>
                <path d="M2 4l4 4 4-4" strokeLinecap="round"/>
              </svg>
            </button>

            {dashOpen && (
              <div className="absolute top-full right-0 mt-2 w-60 bg-[#14141A] rounded-2xl py-2 shadow-2xl border border-white/15 animate-slide-down">
                {dashboardLinks.map(l => (
                  <button
                    key={l.page}
                    onClick={() => go(l.page)}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-[13px] text-white/70 hover:text-amber-200 hover:bg-white/5 transition-colors">
                    <span className="text-base">{l.icon}</span>
                    {l.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── CTA Buttons ── */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={() => go("whatsapp")}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-[12.5px] font-medium border border-emerald-500/30 text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 transition-all">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            WhatsApp
          </button>

          <button
            onClick={() => go("booking")}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold text-[13px] tracking-wide shadow-md shadow-amber-500/10 hover:brightness-110 transition-all flex items-center gap-1.5">
            Plan My Event
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M2 6.5h9M7 3l3.5 3.5L7 10"/>
            </svg>
          </button>
        </div>

        {/* ── Mobile hamburger ── */}
        <button
          className="xl:hidden p-2 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            {mobileOpen
              ? <path d="M4 4l12 12M16 4L4 16"/>
              : <><path d="M3 5h14"/><path d="M3 10h14"/><path d="M3 15h14"/></>
            }
          </svg>
        </button>
      </div>

      {/* ── Mobile menu ── */}
      {mobileOpen && (
        <div className="xl:hidden bg-[#09090C] border-t border-white/10 py-5 px-6 animate-slide-down">
          <div className="flex flex-col gap-1 mb-4">
            {primaryLinks.map(l => (
              <button key={l.page} onClick={() => go(l.page)}
                className={`text-left px-4 py-2.5 rounded-xl text-[14px] transition-colors ${
                  currentPage === l.page ? "text-amber-200 bg-amber-500/10" : "text-white/70 hover:text-white hover:bg-white/5"
                }`}>
                {l.label}
              </button>
            ))}
          </div>
          <div className="border-t border-white/10 my-3" />
          <div className="text-[11px] text-amber-400 uppercase tracking-widest px-4 mb-2">Dashboards</div>
          <div className="grid grid-cols-2 gap-1 mb-4">
            {dashboardLinks.map(l => (
              <button key={l.page} onClick={() => go(l.page)}
                className="text-left flex items-center gap-2 px-3 py-2 rounded-xl text-[13px] text-white/70 hover:text-white hover:bg-white/5 transition-colors">
                <span>{l.icon}</span>{l.label}
              </button>
            ))}
          </div>
          <button onClick={() => go("booking")} className="w-full py-3 rounded-xl bg-amber-500 text-black font-semibold text-[14px]">
            Plan My Event
          </button>
        </div>
      )}
    </nav>
  );
}
