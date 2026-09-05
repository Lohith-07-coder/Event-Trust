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
      text: "Awesome! 🎂 Milestone birthdays are our specialty.\n\nWhat is your estimated guest count?",
      time: "2:33 PM",
      buttons: [
        { label: "20–50 guests", next: "budget" },
        { label: "50–200 guests", next: "budget" },
      ],
    },
  ],
  corporate: [
    {
      from: "bot",
      text: "Professional corporate events. 🏢 We provide full AV, stage setup & catering.\n\nSelect your requirements:",
      time: "2:33 PM",
      buttons: [
        { label: "Annual Gala", next: "budget" },
        { label: "Conference", next: "budget" },
        { label: "Product Launch", next: "budget" },
      ],
    },
  ],
  budget: [
    {
      from: "bot",
      text: "Understood! 💰 What is your estimated total budget?",
      time: "2:34 PM",
      buttons: [
        { label: "₹1L – ₹5L", next: "done" },
        { label: "₹5L – ₹15L", next: "done" },
        { label: "₹15L+", next: "done" },
      ],
    },
  ],
  done: [
    {
      from: "bot",
      text: "🎉 Perfect! Based on your selections, we have allocated venue, catering & decor packages.\n\nA senior manager will call you within 2 minutes with exact pricing!",
      time: "2:35 PM",
      buttons: [{ label: "📱 Open Live Booking Flow", next: "start" }],
    },
  ],
  manager: [
    {
      from: "bot",
      text: "Connecting you to a senior EVENTTRUST manager... 📞\n\nAverage callback time: *90 seconds*.",
      time: "2:32 PM",
    },
  ],
  bookings: [
    {
      from: "bot",
      text: "📋 *Active Booking*\n\nEvent: *Gupta Wedding*\nDate: *Oct 15, 2025*\nVenue: *Palace Grounds*\nStatus: *✓ Confirmed*",
      time: "2:32 PM",
    },
  ],
};

export default function WhatsApp({ isLightMode = false }: { isLightMode?: boolean }) {
  const [messages, setMessages] = useState<Message[]>(flows.start);

  const handleButton = (label: string, next: string) => {
    const userMsg: Message = {
      from: "user",
      text: label,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const nextFlow = flows[next] || [
      {
        from: "bot",
        text: `Got it: *${label}*. A manager will follow up shortly!`,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ];

    setMessages((prev) => [...prev, userMsg, ...nextFlow]);
  };

  return (
    <div className={`min-h-screen pt-10 pb-20 px-6 transition-colors duration-300 ${
      isLightMode ? "bg-[#F7F4EE] text-[#111116]" : "bg-[#0B0B14] text-[#F7F4EE]"
    }`}>
      <div className="max-w-md mx-auto">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-[0.25em] mb-2 border border-emerald-500/30 text-emerald-700 bg-emerald-50">
            💬 Live WhatsApp Concierge
          </div>
          <h1 className={`font-serif font-bold text-3xl mb-1 ${isLightMode ? "text-[#111116]" : "text-white"}`}>
            EVENTTRUST <span className="text-emerald-700 font-extrabold">WhatsApp</span>
          </h1>
          <p className={`text-[13px] font-medium ${isLightMode ? "text-[#6F6B66]" : "text-white/45"}`}>
            Simulated interactive WhatsApp assistant · Live response
          </p>
        </div>

        {/* Phone mockup */}
        <div className="rounded-[36px] p-3 shadow-2xl border border-white/20 bg-[#111116]">
          <div className="rounded-[28px] overflow-hidden">
            {/* Header bar */}
            <div className="bg-[#075E54] p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-[13px] text-[#111116] shadow-sm"
                  style={{ background: "linear-gradient(135deg, #E8C98A, #B89B5E)" }}>ET</div>
                <div>
                  <div className="font-bold text-white text-[14px]">EVENTTRUST</div>
                  <div className="text-emerald-300 text-[11px] font-semibold">● Online · AI Assistant</div>
                </div>
              </div>
            </div>

            {/* Chat body */}
            <div className="overflow-y-auto p-4 space-y-3" style={{ maxHeight: 420, background: isLightMode ? "#EAE5DA" : "rgba(5,1,10,0.95)" }}>
              <div className="text-center">
                <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-white/90 text-[#111116] shadow-sm">Today</span>
              </div>

              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"} animate-fade-in`}>
                  <div className={`max-w-[85%] ${
                    msg.from === "bot" 
                      ? (isLightMode ? "bg-white text-[#111116] shadow-sm rounded-2xl rounded-tl-sm" : "bg-[#151522] text-white rounded-2xl rounded-tl-sm") 
                      : "bg-[#DCF8C6] text-[#111116] shadow-sm rounded-2xl rounded-tr-sm"
                  } px-4 py-2.5`}>
                    <p className="text-[13px] leading-relaxed whitespace-pre-line font-medium"
                      dangerouslySetInnerHTML={{ __html: msg.text.replace(/\*(.*?)\*/g, "<strong>$1</strong>").replace(/→/g, "→") }}/>
                    <div className="text-[10px] mt-1 text-[#6F6B66] flex items-center gap-1 justify-end font-semibold">
                      {msg.time}
                      {msg.from === "user" && <span className="text-blue-500">✓✓</span>}
                    </div>

                    {/* Action buttons */}
                    {msg.buttons && (
                      <div className="mt-3 flex flex-col gap-2">
                        {msg.buttons.map((btn) => (
                          <button key={btn.label} onClick={() => handleButton(btn.label, btn.next)}
                            className="w-full py-2 rounded-xl text-[12px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-300 hover:bg-emerald-100 transition-all text-center">
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
            <div className="bg-[#075E54] px-3 py-2.5 flex items-center gap-2">
              <div className="flex-1 flex items-center gap-2 px-4 py-2 rounded-full bg-white/10">
                <span className="text-[13px] text-white/60 font-medium">Message...</span>
              </div>
              <div className="w-10 h-10 rounded-full flex items-center justify-center shadow-sm bg-[#25D366]">
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
            <div key={f.label} className={`rounded-xl p-3 text-center border ${
              isLightMode ? "bg-white border-[#DED9CF] shadow-sm text-[#111116]" : "bg-[#151522] border-white/10 text-white"
            }`}>
              <div className="text-xl mb-1">{f.icon}</div>
              <div className={`text-[11px] font-semibold leading-tight ${isLightMode ? "text-[#6F6B66]" : "text-white/55"}`}>{f.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
