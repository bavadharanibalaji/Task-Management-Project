import { useState } from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, Users, ClipboardList, LogOut, ClipboardCheck, Menu, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Sidebar = ({ role }) => {
  const { logout } = useAuth();
  const [open, setOpen] = useState(false);

  const adminLinks = [
    { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/admin/employees", label: "Employees", icon: Users },
  ];

  const employeeLinks = [
    { to: "/employee/dashboard", label: "My Tasks", icon: ClipboardList },
  ];

  const links = role === "admin" ? adminLinks : employeeLinks;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="md:hidden fixed top-4 left-4 z-30 h-10 w-10 flex items-center justify-center rounded-lg bg-sidebar text-white shadow-lg"
      >
        <Menu size={20} />
      </button>

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="md:hidden fixed inset-0 bg-black/50 z-40"
        />
      )}

      <div
        className={`w-60 bg-sidebar text-white min-h-screen flex flex-col justify-between py-6 px-4 relative overflow-hidden
          fixed md:static top-0 left-0 z-50 transition-transform duration-200
          ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "16px 16px",
          }}
        />
        <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-primary/20 blur-2xl pointer-events-none" />

        <div className="relative">
          <div className="flex items-center justify-between px-2 mb-10">
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-lg bg-primary flex items-center justify-center">
                <ClipboardCheck size={18} className="text-white" />
              </div>
              <span className="font-display font-semibold text-lg">TaskFlow</span>
            </div>
            <button onClick={() => setOpen(false)} className="md:hidden text-white/60">
              <X size={20} />
            </button>
          </div>

          <nav className="flex flex-col gap-1">
            {links.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                    isActive
                      ? "bg-primary text-white"
                      : "text-white/60 hover:bg-white/10 hover:text-white"
                  }`
                }
              >
                <Icon size={18} />
                {label}
              </NavLink>
            ))}
          </nav>
        </div>

        <button
          onClick={logout}
          className="relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/60 hover:bg-white/10 hover:text-white transition-colors"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </>
  );
};

export default Sidebar;