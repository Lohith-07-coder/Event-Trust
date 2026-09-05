import { useState } from "react";

const members = [
  { name:"Priya Sharma",    role:"Account Owner",    avatar:"PS", color:"#B89B5E", events:3, permissions:"Full Access"   },
  { name:"Arjun Sharma",    role:"Co-Planner",       avatar:"AS", color:"#E8C98A", events:3, permissions:"Full Access"   },
  { name:"Meena Sharma",    role:"Family Member",    avatar:"MS", color:"#EC4899", events:1, permissions:"View Only"     },
  { name:"Rohan Sharma",    role:"Guest Coordinator",avatar:"RS", color:"#10B981", events:2, permissions:"Guest List"    },
];

const sharedTasks = [
  { task:"Confirm guest list with Rohan by Sep 20",     due:"Sep 20", assignee:"AS", done:false, priority:"high"   },
  { task:"Collect dietary restrictions from Meena's list",due:"Sep 15",assignee:"MS", done:true,  priority:"medium" },
  { task:"Review catering menu samples",                due:"Oct 05", assignee:"PS", done:false, priority:"high"   },
  { task:"Finalize shuttle transport from airport",     due:"Oct 10", assignee:"AS", done:false, priority:"low"    },
  { task:"Confirm hotel rooms for out-of-town guests",  due:"Sep 25", assignee:"RS", done:true,  priority:"medium" },
];

const guestGroups = [
  { name:"Bride Side",  count:212, confirmed:188, declined:14, pending:10 },
  { name:"Groom Side",  count:198, confirmed:172, declined:9,  pending:17 },
  { name:"Close Family",count:48,  confirmed:48,  declined:0,  pending:0  },
  { name:"Friends",     count:142, confirmed:104, declined:22, pending:16 },
];

export default function FamilyAssistant({ isLightMode = false }: { isLightMode?: boolean }) {
  const [activeTab, setActiveTab] = useState("Team");
  const [taskState, setTaskState] = useState<Record<number,boolean>>({});

  const tabs = ["Team","Shared Tasks","Guest Tracker","Messages"];

  const toggleTask = (i: number) => {
    setTaskState(prev => ({ ...prev, [i]: !prev[i] }));
  };

  const totalGuests   = guestGroups.reduce((s,g) => s + g.count, 0);
  const totalConfirmed = guestGroups.reduce((s,g) => s + g.confirmed, 0);

  return (
    <div className={`min-h-screen pt-10 pb-20 px-6 transition-colors duration-300 ${
      isLightMode ? "bg-[#F7F4EE] text-[#111116]" : "bg-[#0B0B14] text-[#F7F4EE]"
    }`}>
      <div className="max-w-[1440px] mx-auto">

        {/* Header */}
        <div className="flex flex-wrap items-center gap-5 mb-8">
          <div>
            <p className={`text-[11px] font-mono tracking-[0.25em] uppercase mb-1 font-bold ${
              isLightMode ? "text-[#6F6B66]" : "text-[#B89B5E]"
            }`}>Collaboration Workspace</p>
            <h1 className={`font-serif font-bold text-3xl md:text-5xl ${isLightMode ? "text-[#111116]" : "text-white"}`}>
              Family <span className="grad-champagne">Assistant</span>
            </h1>
            <p className={`text-[13px] mt-0.5 font-medium ${isLightMode ? "text-[#6F6B66]" : "text-white/45"}`}>
              Collaborative planning hub for Priya &amp; Arjun Wedding · Oct 15, 2025
            </p>
          </div>
          <button className="btn-gold-champagne ml-auto px-6 py-3 font-bold rounded-full flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M8 1v14M1 8h14"/></svg>
            Invite Member
          </button>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label:"Days Left",      value:"40",   icon:"📅", color:"#B89B5E" },
            { label:"Team Members",   value:"4",    icon:"👨‍👩‍👧‍👦", color:"#B89B5E" },
            { label:"Tasks Pending",  value:"3",    icon:"✅", color:"#F59E0B" },
            { label:"Guests Confirmed",value:`${totalConfirmed}/${totalGuests}`, icon:"🎟️", color:"#10B981" },
          ].map(s => (
            <div key={s.label} className={`rounded-2xl p-5 border text-center ${
              isLightMode ? "bg-white border-[#DED9CF] shadow-sm text-[#111116]" : "bg-[#151522] border-white/10 text-white"
            }`}>
              <div className="text-2xl mb-2">{s.icon}</div>
              <div className="font-mono font-extrabold text-2xl mb-0.5 text-[#B89B5E]">{s.value}</div>
              <div className={`text-[12px] font-semibold ${isLightMode ? "text-[#6F6B66]" : "text-white/45"}`}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-7 overflow-x-auto pb-1">
          {tabs.map(t => {
            const isActive = activeTab === t;
            return (
              <button key={t} onClick={() => setActiveTab(t)}
                className={`px-5 py-2.5 rounded-full text-[13px] font-bold whitespace-nowrap border transition-all shrink-0 ${
                  isLightMode
                    ? isActive
                      ? "btn-gold-champagne !px-5 !py-2.5 text-[#111116] shadow-md"
                      : "bg-white border-[#DED9CF] text-[#111116] hover:bg-[#EAE5DA]"
                    : isActive
                      ? "border-[#B89B5E] bg-[#B89B5E]/20 text-[#E8C98A]"
                      : "border-white/10 text-white/60 hover:border-white/22 hover:text-white bg-[#151522]"
                }`}>
                {t}
              </button>
            );
          })}
        </div>

        {/* ── Team ── */}
        {activeTab === "Team" && (
          <div className="animate-fade-in space-y-4">
            {members.map(m => (
              <div key={m.name} className={`rounded-2xl p-5 border flex flex-wrap items-center gap-4 ${
                isLightMode ? "bg-white border-[#DED9CF] shadow-sm text-[#111116]" : "bg-[#151522] border-white/10 text-white"
              }`}>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-[15px] text-[#111116] shrink-0 shadow-sm"
                  style={{ background:`linear-gradient(135deg, #E8C98A, #B89B5E)` }}>
                  {m.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-[15px]">{m.name}</div>
                  <div className={`text-[12px] font-medium ${isLightMode ? "text-[#6F6B66]" : "text-white/45"}`}>{m.role} · {m.events} events</div>
                </div>
                <span className="bg-emerald-500/10 text-emerald-700 border border-emerald-500/30 px-3 py-1 rounded-full text-[11px] font-bold">{m.permissions}</span>
                <button className="text-[12px] font-bold text-[#B89B5E] hover:underline">Manage</button>
              </div>
            ))}
            <button className={`w-full py-4 rounded-full border-2 border-dashed transition-all text-[13px] font-bold ${
              isLightMode ? "bg-[#F7F4EE] border-[#DED9CF] text-[#111116] hover:border-[#B89B5E]" : "bg-white/5 border-white/12 text-white/40 hover:border-[#B89B5E]"
            }`}>
              + Add Family Member
            </button>
          </div>
        )}

        {/* ── Shared Tasks ── */}
        {activeTab === "Shared Tasks" && (
          <div className="animate-fade-in space-y-3">
            {sharedTasks.map((task, i) => {
              const done = i in taskState ? taskState[i] : task.done;
              return (
                <div key={i} className={`rounded-2xl p-5 border transition-all ${
                  isLightMode
                    ? done ? "bg-[#F7F4EE] border-[#DED9CF] opacity-60" : "bg-white border-[#DED9CF] shadow-sm text-[#111116]"
                    : done ? "bg-[#151522] border-emerald-500/20 opacity-60" : "bg-[#151522] border-white/10 text-white"
                }`}>
                  <div className="flex items-start gap-4">
                    <button onClick={() => toggleTask(i)}
                      className={`w-6 h-6 rounded-md border-2 flex items-center justify-center mt-0.5 shrink-0 transition-all ${
                        done 
                          ? "border-emerald-500 bg-emerald-500" 
                          : (isLightMode ? "border-[#DED9CF] hover:border-[#B89B5E]" : "border-white/25 hover:border-[#B89B5E]")
                      }`}>
                      {done && <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round"/></svg>}
                    </button>
                    <div className="flex-1">
                      <p className={`text-[14px] font-bold ${done ? (isLightMode ? "line-through text-[#6F6B66]" : "line-through text-white/35") : ""}`}>{task.task}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <span className={`text-[11px] font-medium ${isLightMode ? "text-[#6F6B66]" : "text-white/38"}`}>📅 Due {task.due}</span>
                        <span className={`text-[11px] font-medium ${isLightMode ? "text-[#6F6B66]" : "text-white/38"}`}>👤 {task.assignee}</span>
                        <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold ${
                          task.priority === "high"
                            ? "bg-rose-500/10 text-rose-700 border border-rose-500/30"
                            : task.priority === "medium"
                              ? "bg-amber-500/10 text-amber-700 border border-amber-500/30"
                              : "bg-emerald-500/10 text-emerald-700 border border-emerald-500/30"
                        }`}>
                          {task.priority}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <button className={`w-full py-3.5 rounded-full border border-dashed transition-all text-[13px] font-bold ${
              isLightMode ? "bg-[#F7F4EE] border-[#DED9CF] text-[#111116] hover:border-[#B89B5E]" : "bg-white/5 border-white/12 text-white/40 hover:border-[#B89B5E]"
            }`}>
              + Add Task
            </button>
          </div>
        )}

        {/* ── Guest Tracker ── */}
        {activeTab === "Guest Tracker" && (
          <div className="animate-fade-in space-y-5">
            {/* Summary bar */}
            <div className={`rounded-2xl p-5 border ${
              isLightMode ? "bg-white border-[#DED9CF] shadow-sm text-[#111116]" : "bg-[#151522] border-white/10 text-white"
            }`}>
              <div className="flex justify-between text-[12px] mb-2 font-semibold">
                <span className={isLightMode ? "text-[#6F6B66]" : "text-white/50"}>Overall RSVP Progress</span>
                <span className="font-bold">{totalConfirmed}/{totalGuests} confirmed</span>
              </div>
              <div className={`h-3 rounded-full overflow-hidden ${isLightMode ? "bg-[#F7F4EE]" : "bg-white/8"}`}>
                <div className="h-full rounded-full bg-gradient-to-r from-[#E8C98A] to-[#B89B5E]" style={{ width:`${(totalConfirmed/totalGuests)*100}%` }} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {guestGroups.map(g => (
                <div key={g.name} className={`rounded-2xl p-6 border ${
                  isLightMode ? "bg-white border-[#DED9CF] shadow-sm text-[#111116]" : "bg-[#151522] border-white/10 text-white"
                }`}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-serif font-bold text-lg">{g.name}</h3>
                    <span className={`text-[13px] font-medium ${isLightMode ? "text-[#6F6B66]" : "text-white/40"}`}>{g.count} invited</span>
                  </div>
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {[
                      { label:"Confirmed", value:g.confirmed, color:"#10B981" },
                      { label:"Declined",  value:g.declined,  color:"#EF4444" },
                      { label:"Pending",   value:g.pending,   color:"#F59E0B" },
                    ].map(s => (
                      <div key={s.label} className={`text-center rounded-xl py-3 border ${
                        isLightMode ? "bg-[#F7F4EE] border-[#DED9CF]" : "bg-[#1C1C2B] border-white/10"
                      }`}>
                        <div className="font-mono font-extrabold text-xl mb-0.5" style={{ color:s.color }}>{s.value}</div>
                        <div className={`text-[10px] font-semibold ${isLightMode ? "text-[#6F6B66]" : "text-white/35"}`}>{s.label}</div>
                      </div>
                    ))}
                  </div>
                  <div className={`h-2 rounded-full overflow-hidden ${isLightMode ? "bg-[#F7F4EE]" : "bg-white/8"}`}>
                    <div className="h-full rounded-full transition-all bg-emerald-500" style={{ width:`${(g.confirmed/g.count)*100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Messages ── */}
        {activeTab === "Messages" && (
          <div className={`animate-fade-in rounded-3xl border overflow-hidden max-w-xl ${
            isLightMode ? "bg-white border-[#DED9CF] shadow-sm text-[#111116]" : "bg-[#151522] border-white/10 text-white"
          }`}>
            <div className={`px-5 py-4 border-b ${isLightMode ? "border-[#DED9CF]" : "border-white/10"}`}>
              <h3 className="font-serif font-bold text-lg">Family Group Chat</h3>
            </div>
            <div className="p-5 space-y-4" style={{ minHeight:300 }}>
              {[
                { from:"AS", name:"Arjun", msg:"Confirmed the DJ for Oct 15 ✅", time:"2:30 PM", color:"#B89B5E" },
                { from:"MS", name:"Meena", msg:"I&apos;ve sent the dietary list to Spice & Aroma", time:"2:45 PM", color:"#EC4899" },
                { from:"PS", name:"Priya", msg:"Great! Can you also check on the flower arrangement timeline?", time:"3:01 PM", color:"#E8C98A" },
                { from:"RS", name:"Rohan", msg:"Airport shuttles confirmed for 28 guests from Delhi 🚌", time:"3:15 PM", color:"#10B981" },
              ].map((msg, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold text-[#111116] shrink-0 shadow-sm"
                    style={{ background:`linear-gradient(135deg, ${msg.color}, ${msg.color}88)` }}>
                    {msg.from}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[12px] font-bold">{msg.name}</span>
                      <span className={`text-[10px] font-medium ${isLightMode ? "text-[#6F6B66]" : "text-white/30"}`}>{msg.time}</span>
                    </div>
                    <div className={`px-4 py-2.5 text-[13px] rounded-2xl font-medium ${
                      isLightMode ? "bg-[#F7F4EE] text-[#111116]" : "bg-[#1C1C2B] text-white/80"
                    }`}
                      dangerouslySetInnerHTML={{ __html: msg.msg }} />
                  </div>
                </div>
              ))}
            </div>
            <div className={`px-5 py-4 border-t flex gap-3 ${isLightMode ? "border-[#DED9CF]" : "border-white/10"}`}>
              <input placeholder="Type a message..." className={`flex-1 px-4 py-2.5 text-[13px] rounded-xl border transition-all ${
                isLightMode ? "bg-[#F7F4EE] border-[#DED9CF] text-[#111116] focus:bg-white focus:border-[#B89B5E] outline-none" : "bg-[#1C1C2B] border-white/15 text-white"
              }`} />
              <button className="btn-gold-champagne !w-10 !h-10 !p-0 rounded-full font-bold justify-center">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="#111116"><path d="M2 8L14 2l-4 6 4 6-12-6z"/></svg>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
