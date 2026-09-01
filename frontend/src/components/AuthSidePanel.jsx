import { ClipboardCheck, CheckCircle2, Clock, ListTodo } from "lucide-react";

const AuthSidePanel = () => {
  return (
    <div className="hidden md:flex flex-1 bg-sidebar text-white relative overflow-hidden flex-col justify-between p-10">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      <div className="absolute -top-16 -right-16 h-64 w-64 rounded-full bg-primary/30 blur-2xl" />
      <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-card3/30 blur-2xl" />
      <div className="absolute top-1/3 left-10 h-24 w-24 rounded-full bg-card1/20 blur-xl" />

      <div className="relative flex items-center gap-2">
        <div className="h-9 w-9 rounded-lg bg-primary flex items-center justify-center">
          <ClipboardCheck size={18} />
        </div>
        <span className="font-display font-semibold text-m">TaskFlow</span>
      </div>

      <div className="relative">
        <h2 className="font-display text-2xl font-semibold mb-2 leading-snug">
          Manage your team's<br />work in one place
        </h2>
        
        <div className="backdrop-blur rounded-xl p-4 space-y-3 border border-white/10">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-md bg-card1 flex items-center justify-center">
              <ListTodo size={16} />
            </div>
            <div className="flex-1">
              <div className="h-2 w-24 bg-white/30 rounded-full mb-1" />
              <div className="h-2 w-16 bg-white/15 rounded-full" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-md bg-card2 flex items-center justify-center">
              <Clock size={16} />
            </div>
            <div className="flex-1">
              <div className="h-2 w-28 bg-white/30 rounded-full mb-1" />
              <div className="h-2 w-14 bg-white/15 rounded-full" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-md bg-card3 flex items-center justify-center">
              <CheckCircle2 size={16} />
            </div>
            <div className="flex-1">
              <div className="h-2 w-20 bg-white/30 rounded-full mb-1" />
              <div className="h-2 w-24 bg-white/15 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default AuthSidePanel;