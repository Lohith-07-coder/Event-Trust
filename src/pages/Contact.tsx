import { useState } from "react";

const offices = [
  { city: "Mumbai", addr: "901 One BKC, Bandra Kurla Complex", phone: "+91 98765 43210", email: "mumbai@eventtrust.in" },
  { city: "Delhi",  addr: "Level 12, Worldmark 3, Aerocity",   phone: "+91 98765 43211", email: "delhi@eventtrust.in"  },
  { city: "Bangalore", addr: "IndiQube Sigma, Outer Ring Road", phone: "+91 98765 43212", email: "blr@eventtrust.in"   },
];

const faqs = [
  { q: "How quickly can you plan an event?", a: "Emergency bookings are available within 48 hours. Standard events are planned in 5–7 working days with our full AI-assisted workflow." },
  { q: "What cities do you operate in?", a: "We currently serve 14 cities including Mumbai, Delhi, Bangalore, Hyderabad, Chennai, Pune, Jaipur, Goa, Kolkata, Ahmedabad, Surat, Kochi, Chandigarh, and Lucknow." },
  { q: "Is there a platform fee?", a: "EVENTTRUST is free for clients. We earn a small commission from verified vendors. For fully-managed events, an 8% management fee applies on the total budget." },
  { q: "How does the Smart QR check-in work?", a: "Each guest receives a unique QR on their invite. Scanning at entry validates attendance in real time, visible to both the client and manager dashboard." },
];

export default function Contact({ isLightMode = false }: { isLightMode?: boolean }) {
  const [form, setForm] = useState({ name:"", email:"", phone:"", eventType:"Wedding", message:"", budget:"" });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className={`min-h-screen pt-10 pb-20 px-6 transition-colors duration-300 ${
      isLightMode ? "bg-[#F7F4EE] text-[#111116]" : "bg-[#0B0B14] text-[#F7F4EE]"
    }`}>
      <div className="max-w-[1440px] mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <p className={`text-[11px] font-mono tracking-[0.25em] uppercase mb-2 font-bold ${
            isLightMode ? "text-[#6F6B66]" : "text-[#B89B5E]"
          }`}>Get In Touch</p>
          <h1 className={`font-serif font-bold text-4xl md:text-6xl mb-4 ${isLightMode ? "text-[#111116]" : "text-white"}`}>
            Let&apos;s Plan Your <span className="grad-champagne">Dream Event</span>
          </h1>
          <p className={`text-[16px] max-w-xl mx-auto font-medium ${isLightMode ? "text-[#6F6B66]" : "text-white/55"}`}>
            Speak to a dedicated event consultant. We respond within 30 minutes during business hours.
          </p>
        </div>

        {/* Contact grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">

          {/* Form */}
          <div className={`rounded-3xl p-8 border ${
            isLightMode ? "bg-white border-[#DED9CF] shadow-sm text-[#111116]" : "bg-[#151522] border-white/10 text-white"
          }`}>
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 animate-scale-in">
                <div className="w-20 h-20 rounded-3xl flex items-center justify-center text-4xl mb-6 shadow-md text-[#111116]"
                  style={{ background:"linear-gradient(135deg, #E8C98A, #B89B5E)" }}>✓</div>
                <h3 className="font-serif font-bold text-2xl mb-3">Message Sent!</h3>
                <p className={`text-[14px] max-w-xs leading-relaxed font-medium ${isLightMode ? "text-[#6F6B66]" : "text-white/55"}`}>
                  Thank you, <strong className={isLightMode ? "text-[#111116]" : "text-white"}>{form.name}</strong>! A dedicated consultant will call you within 30 minutes.
                </p>
                <button onClick={() => setSubmitted(false)} className={`mt-8 px-6 py-3 rounded-full font-bold border transition-all ${
                  isLightMode ? "bg-[#F7F4EE] text-[#111116] border-[#DED9CF] hover:bg-[#EAE5DA]" : "btn-hero-outline"
                }`}>
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <h3 className="font-serif font-bold text-2xl mb-1">Send us a message</h3>
                  <p className={`text-[13px] font-medium ${isLightMode ? "text-[#6F6B66]" : "text-white/45"}`}>Free consultation · No commitment required</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-[12px] mb-2 uppercase tracking-wider font-bold ${isLightMode ? "text-[#6F6B66]" : "text-white/45"}`}>Your Name *</label>
                    <input required value={form.name} onChange={e => setForm({...form, name:e.target.value})}
                      placeholder="Priya Sharma" className={`w-full px-4 py-3.5 text-[14px] rounded-xl border transition-all ${
                        isLightMode ? "bg-[#F7F4EE] border-[#DED9CF] text-[#111116] focus:bg-white focus:border-[#B89B5E] outline-none" : "bg-[#1C1C2B] border-white/15 text-white"
                      }`} />
                  </div>
                  <div>
                    <label className={`block text-[12px] mb-2 uppercase tracking-wider font-bold ${isLightMode ? "text-[#6F6B66]" : "text-white/45"}`}>Phone *</label>
                    <input required value={form.phone} onChange={e => setForm({...form, phone:e.target.value})}
                      placeholder="+91 98765 43210" type="tel" className={`w-full px-4 py-3.5 text-[14px] rounded-xl border transition-all ${
                        isLightMode ? "bg-[#F7F4EE] border-[#DED9CF] text-[#111116] focus:bg-white focus:border-[#B89B5E] outline-none" : "bg-[#1C1C2B] border-white/15 text-white"
                      }`} />
                  </div>
                </div>

                <div>
                  <label className={`block text-[12px] mb-2 uppercase tracking-wider font-bold ${isLightMode ? "text-[#6F6B66]" : "text-white/45"}`}>Email</label>
                  <input value={form.email} onChange={e => setForm({...form, email:e.target.value})}
                    placeholder="priya@email.com" type="email" className={`w-full px-4 py-3.5 text-[14px] rounded-xl border transition-all ${
                      isLightMode ? "bg-[#F7F4EE] border-[#DED9CF] text-[#111116] focus:bg-white focus:border-[#B89B5E] outline-none" : "bg-[#1C1C2B] border-white/15 text-white"
                    }`} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-[12px] mb-2 uppercase tracking-wider font-bold ${isLightMode ? "text-[#6F6B66]" : "text-white/45"}`}>Event Type</label>
                    <select value={form.eventType} onChange={e => setForm({...form, eventType:e.target.value})}
                      className={`w-full px-4 py-3.5 text-[14px] rounded-xl border transition-all ${
                        isLightMode ? "bg-[#F7F4EE] border-[#DED9CF] text-[#111116] focus:bg-white focus:border-[#B89B5E] outline-none" : "bg-[#1C1C2B] border-white/15 text-white"
                      }`}>
                      {["Wedding","Birthday","Corporate","College Fest","Anniversary","Other"].map(t => (
                        <option key={t} className={isLightMode ? "bg-white text-[#111116]" : "bg-[#0B0B14] text-white"}>{t}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={`block text-[12px] mb-2 uppercase tracking-wider font-bold ${isLightMode ? "text-[#6F6B66]" : "text-white/45"}`}>Approx. Budget</label>
                    <select value={form.budget} onChange={e => setForm({...form, budget:e.target.value})}
                      className={`w-full px-4 py-3.5 text-[14px] rounded-xl border transition-all ${
                        isLightMode ? "bg-[#F7F4EE] border-[#DED9CF] text-[#111116] focus:bg-white focus:border-[#B89B5E] outline-none" : "bg-[#1C1C2B] border-white/15 text-white"
                      }`}>
                      {["Under ₹1 Lakh","₹1L – ₹5L","₹5L – ₹15L","₹15L – ₹50L","₹50L+"].map(b => (
                        <option key={b} className={isLightMode ? "bg-white text-[#111116]" : "bg-[#0B0B14] text-white"}>{b}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className={`block text-[12px] mb-2 uppercase tracking-wider font-bold ${isLightMode ? "text-[#6F6B66]" : "text-white/45"}`}>Tell us more</label>
                  <textarea value={form.message} onChange={e => setForm({...form, message:e.target.value})}
                    rows={4} placeholder="Date, guest count, special requirements, vibe..."
                    className={`w-full px-4 py-3.5 text-[14px] resize-none rounded-xl border transition-all ${
                      isLightMode ? "bg-[#F7F4EE] border-[#DED9CF] text-[#111116] focus:bg-white focus:border-[#B89B5E] outline-none" : "bg-[#1C1C2B] border-white/15 text-white"
                    }`} />
                </div>

                <button type="submit" className="btn-gold-champagne w-full justify-center py-4 text-[15px] font-bold rounded-full">
                  Send Message — We&apos;ll Call in 30 Min →
                </button>

                <p className={`text-[11px] text-center font-medium ${isLightMode ? "text-[#6F6B66]" : "text-white/30"}`}>
                  By submitting, you agree to our Privacy Policy. No spam, ever.
                </p>
              </form>
            )}
          </div>

          {/* Right panel */}
          <div className="space-y-5">
            {/* Quick contact */}
            <div className={`rounded-3xl p-7 border ${
              isLightMode ? "bg-white border-[#DED9CF] shadow-sm text-[#111116]" : "bg-[#151522] border-white/10 text-white"
            }`}>
              <h3 className="font-serif font-bold text-xl mb-5">Quick Contact</h3>
              <div className="space-y-4">
                {[
                  { icon:"📞", label:"Call Us",      val:"+91 98765 43210",  sub:"Available 8 AM – 11 PM daily" },
                  { icon:"💬", label:"WhatsApp",     val:"+91 98765 43210",  sub:"Reply within 5 minutes"       },
                  { icon:"✉️", label:"Email",         val:"hello@eventtrust.in", sub:"Response within 2 hours"  },
                  { icon:"📍", label:"HQ",            val:"Mumbai, India",    sub:"Serving 14 cities nationwide" },
                ].map(c => (
                  <div key={c.label} className={`flex items-center gap-4 p-4 rounded-2xl transition-colors cursor-pointer ${
                    isLightMode ? "hover:bg-[#F7F4EE]" : "hover:bg-white/5"
                  }`}>
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0"
                      style={{ background: isLightMode ? "#F7F4EE" : "rgba(255,255,255,0.08)" }}>
                      {c.icon}
                    </div>
                    <div>
                      <div className={`text-[12px] uppercase tracking-wider font-bold ${isLightMode ? "text-[#6F6B66]" : "text-white/40"}`}>{c.label}</div>
                      <div className="font-bold text-[14px]">{c.val}</div>
                      <div className={`text-[11px] font-medium ${isLightMode ? "text-[#6F6B66]" : "text-white/35"}`}>{c.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Response time badge */}
            <div className={`rounded-2xl p-5 border flex items-center gap-4 ${
              isLightMode ? "bg-emerald-50 border-emerald-200 text-[#111116]" : "bg-[#151522] border-emerald-500/30 text-white"
            }`}>
              <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <div>
                <div className="font-bold text-emerald-700 text-[14px]">Currently Online</div>
                <div className={`text-[12px] font-medium ${isLightMode ? "text-[#6F6B66]" : "text-white/45"}`}>Average response time: 4 minutes</div>
              </div>
            </div>
          </div>
        </div>

        {/* Offices */}
        <div className="mb-16">
          <h2 className={`font-serif font-bold text-3xl mb-6 ${isLightMode ? "text-[#111116]" : "text-white"}`}>Our <span className="grad-champagne">Offices</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {offices.map(o => (
              <div key={o.city} className={`rounded-2xl p-6 border ${
                isLightMode ? "bg-white border-[#DED9CF] shadow-sm text-[#111116]" : "bg-[#151522] border-white/10 text-white"
              }`}>
                <div className="font-serif font-bold text-2xl mb-2 text-[#B89B5E]">{o.city}</div>
                <p className={`text-[13px] mb-4 leading-relaxed font-medium ${isLightMode ? "text-[#6F6B66]" : "text-white/55"}`}>{o.addr}</p>
                <div className="space-y-1.5">
                  <div className={`text-[12px] font-medium ${isLightMode ? "text-[#6F6B66]" : "text-white/45"}`}>📞 {o.phone}</div>
                  <div className="text-[12px] font-bold text-[#B89B5E]">{o.email}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div>
          <h2 className={`font-serif font-bold text-3xl mb-6 ${isLightMode ? "text-[#111116]" : "text-white"}`}>Frequently Asked <span className="grad-champagne">Questions</span></h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className={`rounded-2xl border overflow-hidden ${
                isLightMode ? "bg-white border-[#DED9CF] shadow-sm text-[#111116]" : "bg-[#151522] border-white/10 text-white"
              }`}>
                <button
                  className={`w-full flex items-center justify-between px-6 py-5 text-left transition-colors ${
                    isLightMode ? "hover:bg-[#F7F4EE]" : "hover:bg-white/4"
                  }`}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span className="font-bold text-[15px] pr-4">{faq.q}</span>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                    className={`shrink-0 transition-transform text-[#B89B5E] ${openFaq === i ? "rotate-180" : ""}`}>
                    <path d="M4 7l5 5 5-5"/>
                  </svg>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 animate-slide-down">
                    <div className={`h-px mb-4 ${isLightMode ? "bg-[#DED9CF]" : "bg-white/10"}`} />
                    <p className={`text-[14px] leading-relaxed font-medium ${isLightMode ? "text-[#6F6B66]" : "text-white/60"}`}>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
