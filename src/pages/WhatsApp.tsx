import { useState } from "react";

type Message = {
  from: "bot" | "user";
  text: string;
  time: string;
  buttons?: { label: string; next: string }[];
};

const flows: Record<string, Message[]> = {
  start: [
    {
      from: "bot",
      text: "👋 Welcome to *EVENTTRUST* — Your AI-powered Event Concierge!\n\nHow can I help you today?",
      time: "2:31 PM",
      buttons: [
        { label: "🎪 Plan My Event", next: "plan" },
        { label: "📋 My Bookings", next: "bookings" },
        { label: "💬 Talk to Manager", next: "manager" },
      ],
    },
  ],
  plan: [
    {
      from: "bot",
      text: "Great! Let&apos;s plan your event. 🎉\n\nWhat type of event are you planning?",
      time: "2:32 PM",
      buttons: [
        { label: "💍 Wedding", next: "wedding" },
        { label: "🎂 Birthday", next: "birthday" },
        { label: "🏢 Corporate", next: "corporate" },
        { label: "Other →", next: "other" },
      ],
    },
  ],
  wedding: [
    {
      from: "bot",
      text: "Beautiful! 💍 We specialize in luxury weddings.\n\nApprox. how many guests are you expecting?",
      time: "2:33 PM",
      buttons: [
        { label: "50–150 guests", next: "budget" },
        { label: "150–500 guests", next: "budget" },
        { label: "500+ guests", next: "budget" },
      ],
    },
  ],
  birthday: [
    {
      from: "bot",
      text: "🎂 We&apos;ll make it unforgettable!\n\nHow many guests are you expecting?",
      time: "2:33 PM",
      buttons: [
        { label: "Under 50", next: "budget" },
        { label: "50–200", next: "budget" },
        { label: "200+ guests", next: "budget" },
      ],
    },
  ],
  corporate: [
    {
      from: "bot",
      text: "Perfect! 🏢 We handle corporate events with complete professionalism.\n\nEstimated guests?",
      time: "2:33 PM",
      buttons: [
        { label: "Under 100", next: "budget" },
        { label: "100–500", next: "budget" },
        { label: "500+ guests", next: "budget" },
      ],
    },
  ],
  other: [
    {
      from: "bot",
      text: "No problem! We handle all types of events. 🎊\n\nEstimated guests?",
      time: "2:33 PM",
      buttons: [
        { label: "Under 100", next: "budget" },
        { label: "100–500", next: "budget" },
        { label: "500+ guests", next: "budget" },
      ],
    },
  ],
  budget: [
    {
      from: "bot",
      text: "Got it! 💰 What&apos;s your estimated budget range?",
      time: "2:34 PM",
      buttons: [
        { label: "Under ₹1 Lakh", next: "confirm" },
        { label: "₹1L – ₹5L", next: "confirm" },
        { label: "₹5L – ₹20L", next: "confirm" },
        { label: "₹20L+", next: "confirm" },
      ],
    },
  ],
  confirm: [
    {
      from: "bot",
      text: "✅ Perfect! I&apos;ve noted your requirements.\n\nA dedicated EVENTTRUST manager will call you within *2 minutes* to confirm your booking.\n\n📞 You&apos;ll receive: Free venue shortlist · Vendor recommendations · AI budget plan",
      time: "2:35 PM",
      buttons: [
        { label: "📞 Call Me Now", next: "calling" },
        { label: "📋 View Full Planner", next: "start" },
      ],
    },
  ],
  calling: [
    {
      from: "bot",
      text: "📞 Connecting you to a manager...\n\n*Rohan Mehra* (Senior Event Manager) will call you within 2 minutes!\n\nMeanwhile, here&apos;s what to expect:\n→ Free consultation\n→ 3 venue suggestions\n→ Budget breakdown",
      time: "2:36 PM",
      buttons: [{ label: "🏠 Back to Home", next: "start" }],
    },
  ],
  bookings: [
    {
      from: "bot",
      text: "📋 *Your Bookings*\n\n1. *Priya & Arjun Wedding* — Oct 15 ✅ Confirmed\n2. *Sharma Family Reunion* — Nov 2 ⟳ In Progress\n\nWould you like to?",
      time: "2:32 PM",
      buttons: [
        { label: "📊 View Budget", next: "start" },
        { label: "📞 Call Manager", next: "manager" },
        { label: "🏠 Main Menu", next: "start" },
      ],
    },
  ],
  manager: [
    {
      from: "bot",
      text: "Connecting you to your dedicated manager...\n\n👤 *Rohan Mehra* — Senior Manager\n📞 +91 98765 43210\n⭐ 4.9 Rating · 47 events managed\n\nRohan is available now!",
      time: "2:33 PM",
      buttons: [
        { label: "📞 Call Rohan", next: "calling" },
        { label: "💬 WhatsApp Rohan", next: "calling" },
        { label: "🏠 Main Menu", next: "start" },
      ],
    },
  ],
};

export default function WhatsApp() {
  const [messages, setMessages] = useState<Message[]>(flows.start);
  const [userMsgs, setUserMsgs] = useState<string[]>([]);

  const handleButton = (label: string, next: string) => {
    const userMsg: Message = { from: "user", text: label, time: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true }) };
    const nextMsgs = flows[next] || flows.start;
    setUserMsgs((prev) => [...prev, label]);
    setMessages((prev) => [...prev, userMsg, ...nextMsgs]);
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-6 flex items-start justify-center">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="font-display font-700 text-2xl md:text-3xl mb-2">
            WhatsApp <span className="grad-primary">Assistant</span>
          </h1>
          <p className="text-white/50 text-[13px]">AI-powered event booking via WhatsApp</p>
        </div>

        {/* Phone mockup */}
        <div className="relative mx-auto" style={{ maxWidth: 380 }}>
          {/* Neon glow */}
          <div className="absolute inset-0 rounded-[40px]" style={{ boxShadow: "0 0 60px rgba(16,185,129,0.25), 0 0 120px rgba(16,185,129,0.1)", pointerEvents: "none" }}/>

          <div className="glass rounded-[36px] overflow-hidden border border-white/15">
            {/* Status bar */}
            <div className="bg-[#075E54] px-5 pt-3 pb-0">
              <div className="flex items-center justify-between text-[11px] text-white/80 mb-3">
                <span>9:41</span>
                <span>●●● 5G 🔋</span>
              </div>

              {/* Chat header */}
              <div className="flex items-center gap-3 pb-3 border-b border-white/10">
                <button className="text-white/80">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 5L7 10l5 5"/></svg>
                </button>
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-display font-700 text-[13px] text-white"
                  style={{ background: "linear-gradient(135deg, #6A38FF, #8B5CF6)" }}>ET</div>
                <div>
                  <div className="font-semibold text-white text-[14px]">EVENTTRUST</div>
                  <div className="text-green-400 text-[11px]">● Online · AI Assistant</div>
                </div>
                <div className="ml-auto flex gap-3 text-white/70">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 13.87 19.79 19.79 0 01.006 5.22 2 2 0 012 3.004h3a2 2 0 012 1.72c.13 1.05.36 2.08.71 3.08a2 2 0 01-.45 2.11L6.91 11a16 16 0 006 6"/></svg>
                </div>
              </div>
            </div>

            {/* Chat body */}
            <div className="overflow-y-auto p-4 space-y-3" style={{ maxHeight: 420, background: "rgba(5,1,10,0.95)", backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236A38FF' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }}>
              {/* Date badge */}
              <div className="text-center">
                <span className="glass px-3 py-1 rounded-full text-[11px] text-white/40">Today</span>
              </div>

              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"} animate-fade-in`}>
                  <div className={`max-w-[85%] ${msg.from === "bot" ? "chat-bubble-in" : "chat-bubble-out"} px-4 py-2.5`}>
                    <p className="text-[13px] text-white/90 leading-relaxed whitespace-pre-line"
                      dangerouslySetInnerHTML={{ __html: msg.text.replace(/\*(.*?)\*/g, "<strong>$1</strong>").replace(/→/g, "→") }}/>
                    <div className={`text-[10px] mt-1 ${msg.from === "bot" ? "text-white/30" : "text-white/50"} flex items-center gap-1 justify-end`}>
                      {msg.time}
                      {msg.from === "user" && <span className="text-blue-400">✓✓</span>}
                    </div>

                    {/* Action buttons */}
                    {msg.buttons && (
                      <div className="mt-3 flex flex-col gap-2">
                        {msg.buttons.map((btn) => (
                          <button key={btn.label} onClick={() => handleButton(btn.label, btn.next)}
                            className="w-full py-2 rounded-xl text-[12px] font-medium text-white border border-green-500/40 hover:bg-green-500/15 transition-all text-center"
                            style={{ background: "rgba(7,94,84,0.3)" }}>
                            {btn.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Input bar */}
            <div style={{ background: "#075E54" }} className="px-3 py-2.5 flex items-center gap-2">
              <div className="flex-1 flex items-center gap-2 px-4 py-2 rounded-full bg-white/10">
                <span className="text-[13px] text-white/40">Message...</span>
              </div>
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "#25D366" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
              </div>
            </div>
          </div>
        </div>

        {/* Feature callouts */}
        <div className="grid grid-cols-3 gap-3 mt-8">
          {[
            { icon: "⚡", label: "Instant AI Response" },
            { icon: "📞", label: "2-Min Manager Callback" },
            { icon: "🔒", label: "End-to-End Encrypted" },
          ].map((f) => (
            <div key={f.label} className="glass rounded-xl p-3 text-center border border-white/8">
              <div className="text-xl mb-1">{f.icon}</div>
              <div className="text-[11px] text-white/55 leading-tight">{f.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
