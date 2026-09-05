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

export default function Contact() {
  const [form, setForm] = useState({ name:"", email:"", phone:"", eventType:"Wedding", message:"", budget:"" });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-[1440px] mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[12px] text-purple-400 font-semibold tracking-[0.25em] uppercase mb-3">Get In Touch</p>
          <h1 className="font-display font-700 text-4xl md:text-6xl mb-4">
            Let&apos;s Plan Your <span className="grad-primary">Dream Event</span>
          </h1>
          <p className="text-white/55 text-[16px] max-w-xl mx-auto">
            Speak to a dedicated event consultant. We respond within 30 minutes during business hours.
          </p>
        </div>

        {/* Contact grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">

          {/* Form */}
          <div className="glass rounded-3xl p-8 border border-white/12">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 animate-scale-in">
                <div className="w-20 h-20 rounded-3xl flex items-center justify-center text-4xl mb-6 glow-primary"
                  style={{ background:"linear-gradient(135deg,#6A38FF,#8B5CF6)" }}>✓</div>
                <h3 className="font-display font-700 text-2xl text-white mb-3">Message Sent!</h3>
                <p className="text-white/55 text-[14px] max-w-xs leading-relaxed">
                  Thank you, <strong className="text-white">{form.name}</strong>! A dedicated consultant will call you within 30 minutes.
                </p>
                <button onClick={() => setSubmitted(false)} className="btn-ghost mt-8">
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <h3 className="font-display font-600 text-[20px] mb-1">Send us a message</h3>
                  <p className="text-white/45 text-[13px]">Free consultation · No commitment required</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[12px] text-white/45 mb-2 uppercase tracking-wider">Your Name *</label>
                    <input required value={form.name} onChange={e => setForm({...form, name:e.target.value})}
                      placeholder="Priya Sharma" className="input-glass w-full px-4 py-3.5 text-[14px]" />
                  </div>
                  <div>
                    <label className="block text-[12px] text-white/45 mb-2 uppercase tracking-wider">Phone *</label>
                    <input required value={form.phone} onChange={e => setForm({...form, phone:e.target.value})}
                      placeholder="+91 98765 43210" type="tel" className="input-glass w-full px-4 py-3.5 text-[14px]" />
                  </div>
                </div>

                <div>
                  <label className="block text-[12px] text-white/45 mb-2 uppercase tracking-wider">Email</label>
                  <input value={form.email} onChange={e => setForm({...form, email:e.target.value})}
                    placeholder="priya@email.com" type="email" className="input-glass w-full px-4 py-3.5 text-[14px]" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[12px] text-white/45 mb-2 uppercase tracking-wider">Event Type</label>
                    <select value={form.eventType} onChange={e => setForm({...form, eventType:e.target.value})}
                      className="input-glass w-full px-4 py-3.5 text-[14px] bg-transparent">
                      {["Wedding","Birthday","Corporate","College Fest","Anniversary","Other"].map(t => (
                        <option key={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[12px] text-white/45 mb-2 uppercase tracking-wider">Approx. Budget</label>
                    <select value={form.budget} onChange={e => setForm({...form, budget:e.target.value})}
                      className="input-glass w-full px-4 py-3.5 text-[14px] bg-transparent">
                      {["Under ₹1 Lakh","₹1L – ₹5L","₹5L – ₹15L","₹15L – ₹50L","₹50L+"].map(b => (
                        <option key={b}>{b}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[12px] text-white/45 mb-2 uppercase tracking-wider">Tell us more</label>
                  <textarea value={form.message} onChange={e => setForm({...form, message:e.target.value})}
                    rows={4} placeholder="Date, guest count, special requirements, vibe..."
                    className="input-glass w-full px-4 py-3.5 text-[14px] resize-none" />
                </div>

                <button type="submit" className="btn-primary w-full justify-center">
                  Send Message — We&apos;ll Call in 30 Min
                </button>

                <p className="text-[11px] text-white/28 text-center">
                  By submitting, you agree to our Privacy Policy. No spam, ever.
                </p>
              </form>
            )}
          </div>

          {/* Right panel */}
          <div className="space-y-5">
            {/* Quick contact */}
            <div className="glass rounded-3xl p-7 border border-white/12">
              <h3 className="font-display font-600 text-[17px] mb-5">Quick Contact</h3>
              <div className="space-y-4">
                {[
                  { icon:"📞", label:"Call Us",      val:"+91 98765 43210",  sub:"Available 8 AM – 11 PM daily", color:"#10B981" },
                  { icon:"💬", label:"WhatsApp",     val:"+91 98765 43210",  sub:"Reply within 5 minutes",       color:"#25D366" },
                  { icon:"✉️", label:"Email",         val:"hello@eventtrust.in", sub:"Response within 2 hours",  color:"#6A38FF" },
                  { icon:"📍", label:"HQ",            val:"Mumbai, India",    sub:"Serving 14 cities nationwide", color:"#D4AF37" },
                ].map(c => (
                  <div key={c.label} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-white/5 transition-colors cursor-pointer">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0"
                      style={{ background:`${c.color}18` }}>
                      {c.icon}
                    </div>
                    <div>
                      <div className="text-[12px] text-white/40 uppercase tracking-wider">{c.label}</div>
                      <div className="font-semibold text-white text-[14px]">{c.val}</div>
                      <div className="text-[11px] text-white/35">{c.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Response time badge */}
            <div className="glass rounded-2xl p-5 border border-green-500/22 flex items-center gap-4">
              <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse-glow shrink-0" />
              <div>
                <div className="font-semibold text-green-400 text-[14px]">Currently Online</div>
                <div className="text-white/45 text-[12px]">Average response time: 4 minutes</div>
              </div>
            </div>
          </div>
        </div>

        {/* Offices */}
        <div className="mb-16">
          <h2 className="font-display font-700 text-2xl mb-6">Our <span className="grad-primary">Offices</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {offices.map(o => (
              <div key={o.city} className="glass rounded-2xl p-6 border border-white/10 hover-lift-sm">
                <div className="font-display font-700 text-[18px] grad-primary mb-2">{o.city}</div>
                <p className="text-white/55 text-[13px] mb-4 leading-relaxed">{o.addr}</p>
                <div className="space-y-1.5">
                  <div className="text-[12px] text-white/45">📞 {o.phone}</div>
                  <div className="text-[12px] text-purple-400">{o.email}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div>
          <h2 className="font-display font-700 text-2xl mb-6">Frequently Asked <span className="grad-primary">Questions</span></h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="glass rounded-2xl border border-white/9 overflow-hidden">
                <button
                  className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-white/4 transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span className="font-display font-600 text-[15px] text-white pr-4">{faq.q}</span>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                    className={`shrink-0 text-purple-400 transition-transform ${openFaq === i ? "rotate-180" : ""}`}>
                    <path d="M4 7l5 5 5-5"/>
                  </svg>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 animate-slide-down">
                    <div className="h-px bg-white/8 mb-4" />
                    <p className="text-white/60 text-[14px] leading-relaxed">{faq.a}</p>
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
