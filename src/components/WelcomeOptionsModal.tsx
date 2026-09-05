import { useState, useEffect } from "react";

interface CallbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CallbackModal({ isOpen, onClose }: CallbackModalProps) {
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [timerActive, setTimerActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120);

  /* Live 120-second countdown for 'Call Me in 2 Min' */
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [timerActive, timeLeft]);

  const handleStartCall = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.length < 10) return;
    setTimerActive(true);
    setTimeLeft(120);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="bg-[#180A30] border border-purple-500/35 rounded-3xl p-6 sm:p-8 max-w-md w-full relative shadow-2xl text-center">
        {/* Close Button */}
        <button
          onClick={() => {
            setTimerActive(false);
            onClose();
          }}
          className="absolute top-4 right-4 p-2 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {!timerActive ? (
          <div>
            <div className="w-16 h-16 rounded-full bg-purple-500/20 text-pink-300 flex items-center justify-center text-3xl mx-auto mb-4 border border-purple-500/30">
              📞
            </div>
            <h3 className="font-serif font-light text-3xl text-white mb-2">Request 2-Min Call</h3>
            <p className="text-white/60 text-[13px] mb-6">
              Enter your mobile number and our event manager in Bangalore will call you within 2 minutes.
            </p>

            <form onSubmit={handleStartCall} className="space-y-4 text-left">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-white/50 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-purple-500/25 text-white placeholder:text-white/30 text-[14px] focus:outline-none focus:border-pink-500"
                />
              </div>
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-white/50 mb-1">Mobile Number</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-purple-500/25 text-white placeholder:text-white/30 text-[14px] focus:outline-none focus:border-pink-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:brightness-110 text-white font-semibold text-[14px] transition-all mt-2 shadow-lg shadow-purple-600/30">
                Call Me in 2 Minutes →
              </button>
            </form>
          </div>
        ) : (
          <div className="py-6">
            <div className="w-20 h-20 rounded-full bg-pink-500/20 border-2 border-pink-500 text-pink-300 flex items-center justify-center text-4xl mx-auto mb-6 animate-pulse">
              📲
            </div>
            <h3 className="font-serif text-3xl text-white mb-2">Calling You Now...</h3>
            <p className="text-white/60 text-[13.5px] mb-6">
              We are dialing <strong className="text-white">{phone}</strong>. Please keep your phone nearby.
            </p>

            <div className="font-mono text-5xl text-pink-300 font-bold tracking-tight mb-4">
              {formatTime(timeLeft)}
            </div>

            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mb-6">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-1000"
                style={{ width: `${(timeLeft / 120) * 100}%` }}
              />
            </div>

            <button
              onClick={() => {
                setTimerActive(false);
                onClose();
              }}
              className="px-6 py-2.5 rounded-full border border-white/20 text-white/70 hover:text-white text-[13px]">
              Cancel Request
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
