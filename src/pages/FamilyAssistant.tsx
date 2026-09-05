import { useState } from "react";

const members = [
  { name:"Priya Sharma",    role:"Account Owner",    avatar:"PS", color:"#6A38FF", events:3, permissions:"Full Access"   },
  { name:"Arjun Sharma",    role:"Co-Planner",       avatar:"AS", color:"#0EA5E9", events:3, permissions:"Full Access"   },
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

export default function FamilyAssistant() {
  const [activeTab, setActiveTab] = useState("Team");
  const [taskState, setTaskState] = useState<Record<number,boolean>>({});

  const tabs = ["Team","Shared Tasks","Guest Tracker","Messages"];

  const toggleTask = (i: number) => {
    setTaskState(prev => ({ ...prev, [i]: !prev[i] }));
  };

  const totalGuests   = guestGroups.reduce((s,g) => s + g.count, 0);
  const totalConfirmed = guestGroups.reduce((s,g) => s + g.confirmed, 0);

  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-[1440px] mx-auto">

        {/* Header */}
        <div className="flex flex-wrap items-center gap-5 mb-8">
          <div>
            <h1 className="font-display font-700 text-3xl">Family <span className="grad-primary">Assistant</span></h1>
            <p className="text-white/45 text-[13px] mt-0.5">Collaborative planning hub for Priya &amp; Arjun Wedding · Oct 15, 2025</p>
          </div>
          <button className="btn-primary ml-auto">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M8 1v14M1 8h14"/></svg>
            Invite Member
          </button>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label:"Days Left",      value:"40",   icon:"📅", color:"#6A38FF" },
            { label:"Team Members",   value:"4",    icon:"👨‍👩‍👧‍👦", color:"#0EA5E9" },
            { label:"Tasks Pending",  value:"3",    icon:"✅", color:"#F59E0B" },
            { label:"Guests Confirmed",value:`${totalConfirmed}/${totalGuests}`, icon:"🎟️", color:"#10B981" },
          ].map(s => (
            <div key={s.label} className="glass rounded-2xl p-5 border border-white/9 text-center hover-lift-sm">
              <div className="text-2xl mb-2">{s.icon}</div>
              <div className="font-display font-800 text-2xl mb-0.5" style={{ color:s.color }}>{s.value}</div>
              <div className="text-white/45 text-[12px]">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1.5 mb-7 overflow-x-auto pb-1">
          {tabs.map(t => (
            <button key={t} onClick={() => setActiveTab(t)}
              className={`px-5 py-2.5 rounded-xl text-[13px] font-medium whitespace-nowrap border transition-all shrink-0 ${
                activeTab === t ? "tab-active" : "glass border-white/8 text-white/55 hover:border-white/22 hover:text-white"
              }`}>
              {t}
            </button>
          ))}
        </div>

        {/* ── Team ── */}
        {activeTab === "Team" && (
          <div className="animate-fade-in space-y-4">
            {members.map(m => (
              <div key={m.name} className="glass rounded-2xl p-5 border border-white/9 flex flex-wrap items-center gap-4">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center font-display font-700 text-[15px] text-white shrink-0"
                  style={{ background:`linear-gradient(135deg, ${m.color}, ${m.color}88)` }}>
                  {m.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-display font-600 text-[15px] text-white">{m.name}</div>
                  <div className="text-white/45 text-[12px]">{m.role} · {m.events} events</div>
                </div>
                <span className="chip chip-confirmed">{m.permissions}</span>
                <button className="text-[12px] text-purple-400 hover:text-purple-300">Manage</button>
              </div>
            ))}
            <button className="w-full py-4 rounded-2xl glass border-dashed border-2 border-white/12 text-white/40 hover:border-purple-500/35 hover:text-purple-400 transition-all text-[13px]">
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
                <div key={i} className={`glass rounded-2xl p-5 border transition-all ${done ? "border-green-500/20 opacity-60" : "border-white/9"}`}>
                  <div className="flex items-start gap-4">
                    <button onClick={() => toggleTask(i)}
                      className={`w-6 h-6 rounded-md border-2 flex items-center justify-center mt-0.5 shrink-0 transition-all ${done ? "border-green-500 bg-green-500" : "border-white/25 hover:border-purple-400"}`}>
                      {done && <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round"/></svg>}
                    </button>
                    <div className="flex-1">
                      <p className={`text-[14px] font-medium ${done ? "line-through text-white/35" : "text-white"}`}>{task.task}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-[11px] text-white/38">📅 Due {task.due}</span>
                        <span className="text-[11px] text-white/38">👤 {task.assignee}</span>
                        <span className={`chip ${task.priority === "high" ? "chip-alert" : task.priority === "medium" ? "chip-contacted" : "chip-confirmed"} text-[9px]`}>
                          {task.priority}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <button className="w-full py-3.5 rounded-2xl glass border border-dashed border-white/12 text-white/40 hover:border-purple-500/35 hover:text-purple-400 transition-all text-[13px]">
              + Add Task
            </button>
          </div>
        )}

        {/* ── Guest Tracker ── */}
        {activeTab === "Guest Tracker" && (
          <div className="animate-fade-in space-y-5">
            {/* Summary bar */}
            <div className="glass rounded-2xl p-5 border border-white/9">
              <div className="flex justify-between text-[12px] mb-2">
                <span className="text-white/50">Overall RSVP Progress</span>
                <span className="text-white font-medium">{totalConfirmed}/{totalGuests} confirmed</span>
              </div>
              <div className="h-3 bg-white/8 rounded-full overflow-hidden">
                <div className="h-full rounded-full progress-bar" style={{ width:`${(totalConfirmed/totalGuests)*100}%` }} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {guestGroups.map(g => (
                <div key={g.name} className="glass rounded-2xl p-6 border border-white/9">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-display font-600 text-[16px] text-white">{g.name}</h3>
                    <span className="text-white/40 text-[13px]">{g.count} invited</span>
                  </div>
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {[
                      { label:"Confirmed", value:g.confirmed, color:"#10B981" },
                      { label:"Declined",  value:g.declined,  color:"#EF4444" },
                      { label:"Pending",   value:g.pending,   color:"#F59E0B" },
                    ].map(s => (
                      <div key={s.label} className="text-center glass rounded-xl py-3 border border-white/6">
                        <div className="font-display font-700 text-xl mb-0.5" style={{ color:s.color }}>{s.value}</div>
                        <div className="text-[10px] text-white/35">{s.label}</div>
                      </div>
                    ))}
                  </div>
                  <div className="h-2 bg-white/8 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all" style={{ width:`${(g.confirmed/g.count)*100}%`, background:"#10B981" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Messages ── */}
        {activeTab === "Messages" && (
          <div className="animate-fade-in glass rounded-2xl border border-white/9 overflow-hidden max-w-xl">
            <div className="px-5 py-4 border-b border-white/7">
              <h3 className="font-display font-600 text-[15px]">Family Group Chat</h3>
            </div>
            <div className="p-5 space-y-4" style={{ minHeight:300 }}>
              {[
                { from:"AS", name:"Arjun", msg:"Confirmed the DJ for Oct 15 ✅", time:"2:30 PM", color:"#0EA5E9" },
                { from:"MS", name:"Meena", msg:"I&apos;ve sent the dietary list to Spice & Aroma", time:"2:45 PM", color:"#EC4899" },
                { from:"PS", name:"Priya", msg:"Great! Can you also check on the flower arrangement timeline?", time:"3:01 PM", color:"#6A38FF" },
                { from:"RS", name:"Rohan", msg:"Airport shuttles confirmed for 28 guests from Delhi 🚌", time:"3:15 PM", color:"#10B981" },
              ].map((msg, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold text-white shrink-0"
                    style={{ background:`linear-gradient(135deg, ${msg.color}, ${msg.color}88)` }}>
                    {msg.from}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[12px] font-semibold text-white">{msg.name}</span>
                      <span className="text-[10px] text-white/30">{msg.time}</span>
                    </div>
                    <div className="chat-bubble-in px-4 py-2.5 text-[13px] text-white/80 inline-block"
                      dangerouslySetInnerHTML={{ __html: msg.msg }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="px-5 py-4 border-t border-white/7 flex gap-3">
              <input placeholder="Type a message..." className="input-glass flex-1 px-4 py-2.5 text-[13px]" />
              <button className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background:"linear-gradient(135deg,#6A38FF,#8B5CF6)" }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="white"><path d="M2 8L14 2l-4 6 4 6-12-6z"/></svg>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
