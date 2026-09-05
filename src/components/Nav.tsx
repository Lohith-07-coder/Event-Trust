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
  isLightMode?: boolean;
  studioTheme?: "studio-light" | "studio-dark" | "full";
  setStudioTheme?: (t: "studio-light" | "studio-dark" | "full") => void;
}

export default function Nav({ currentPage, setPage, isLightMode = false, studioTheme = "studio-light", setStudioTheme }: NavProps) {
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

  const navBgClass = scrolled
    ? isLightMode
      ? "bg-white/95 backdrop-blur-xl border-b border-slate-200/80 py-2 shadow-sm text-slate-900"
      : "bg-[#09090C]/90 backdrop-blur-xl border-b border-white/10 py-2 shadow-2xl text-white"
    : isLightMode
      ? "bg-white/90 backdrop-blur-md py-2.5 border-b border-slate-100 text-slate-900"
      : "bg-gradient-to-b from-[#09090C]/90 to-transparent backdrop-blur-md py-2.5 text-white";

  return (
    <nav className={`sticky top-0 w-full z-50 transition-all duration-300 ${navBgClass}`}>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 h-[56px] flex items-center justify-between gap-3">

        {/* ── Brand Emblem & Title ── */}
        <button onClick={() => go("home")} className="flex items-center gap-3 shrink-0 group text-left">
          {/* Champagne Gold Stacked Box Logo */}
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#E8C98A] to-[#B89B5E] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform text-[#111116] font-bold">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <div>
            <div className={`font-serif font-bold text-lg leading-none tracking-wide ${isLightMode ? "text-slate-900" : "text-white"}`}>
              EVENTTRUST
            </div>
            <div className="text-[9px] font-mono font-medium tracking-[0.22em] text-[#B89B5E] uppercase mt-0.5">
              EVENT MANAGEMENT & PLANNING
            </div>
          </div>
        </button>

        {/* ── Desktop Links ── */}
        <div className="hidden xl:flex items-center gap-1">
          {primaryLinks.map(l => {
            const isActive = currentPage === l.page;
            return (
              <button
                key={l.page}
                onClick={() => go(l.page)}
                className={`px-3 py-1.5 rounded-full text-[12.5px] font-semibold whitespace-nowrap transition-all relative ${
                  isLightMode
                    ? isActive
                      ? "text-slate-900 bg-slate-100 font-bold"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                    : isActive
                      ? "text-[#E8C98A] bg-[#B89B5E]/15 border border-[#B89B5E]/40"
                      : "text-white/80 hover:text-white hover:bg-white/5"
                }`}>
                {l.label}
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-[#B89B5E]" />
                )}
              </button>
            );
          })}

          {/* Dashboards dropdown */}
          <div className="relative ml-1" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setDashOpen(!dashOpen)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-[12.5px] font-semibold whitespace-nowrap transition-all ${
                isLightMode ? "text-slate-600 hover:text-slate-900 hover:bg-slate-50" : "text-white/70 hover:text-white hover:bg-white/5"
              }`}>
              <span>Dashboards</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"
                className={`transition-transform duration-200 ${dashOpen ? "rotate-180" : ""}`}>
                <path d="M2 4l4 4 4-4" strokeLinecap="round"/>
              </svg>
            </button>

            {dashOpen && (
              <div className={`absolute top-full right-0 mt-2 w-60 rounded-2xl py-2 shadow-2xl border animate-slide-down ${
                isLightMode ? "bg-white border-slate-200 text-slate-800" : "bg-[#151522] border-white/15 text-white"
              }`}>
                {dashboardLinks.map(l => (
                  <button
                    key={l.page}
                    onClick={() => go(l.page)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-[13px] transition-colors ${
                      isLightMode ? "hover:bg-slate-100 hover:text-[#B89B5E]" : "text-white/70 hover:text-[#E8C98A] hover:bg-white/5"
                    }`}>
                    <span className="text-base">{l.icon}</span>
                    {l.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── CTA Buttons & Quick Actions matching reference ── */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Search Icon */}
          <button
            onClick={() => go("inspiration")}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
              isLightMode ? "text-slate-700 hover:text-slate-900 hover:bg-slate-100" : "text-white/70 hover:text-white hover:bg-white/10"
            }`}
            title="Search events & venues">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
          </button>

          <div className={`w-[1px] h-4 ${isLightMode ? "bg-slate-200" : "bg-white/20"}`} />

          {/* Theme Switcher Button */}
          {setStudioTheme && (
            <button
              onClick={() => setStudioTheme(isLightMode ? "studio-dark" : "studio-light")}
              title="Toggle Studio Theme"
              className={`px-3 py-1.5 rounded-full text-[11.5px] font-bold whitespace-nowrap transition-all flex items-center gap-1 border ${
                isLightMode
                  ? "bg-slate-100 text-slate-800 border-slate-300 hover:bg-slate-200"
                  : "bg-white/10 text-white border-white/20 hover:bg-white/20"
              }`}>
              <span>{isLightMode ? "☀️ Studio Light" : "🌙 Studio Dark"}</span>
            </button>
          )}

          {/* WhatsApp Link */}
          <button
            onClick={() => go("whatsapp")}
            className={`flex items-center gap-1.5 text-[12.5px] font-semibold transition-colors px-2 py-1 rounded-full ${
              isLightMode ? "text-slate-700 hover:text-slate-900 hover:bg-slate-100" : "text-white/80 hover:text-white hover:bg-white/5"
            }`}>
            <span>💬 WhatsApp</span>
          </button>

          {/* Plan My Event Champagne Gold CTA */}
          <button
            onClick={() => go("booking")}
            className="btn-gold-champagne !px-5 !py-2 text-[13px] font-semibold flex items-center gap-2 shrink-0">
            <span>Plan My Event</span>
            <span>→</span>
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
