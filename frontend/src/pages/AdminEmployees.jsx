import { useState, useEffect } from "react";
import { Mail } from "lucide-react";
import api from "../services/api";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";

const AdminEmployees = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    api.get("/admin/employees").then((res) => setEmployees(res.data));
  }, []);

  return (
    <div className="flex min-h-screen bg-bg">
      <Sidebar role="admin" />

      <div className="flex-1 p-6 pt-16 md:pt-6">
        <TopBar title="Employees" subtitle={`${employees.length} team members`} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {employees.map((emp) => (
            <div key={emp._id} className="bg-surface border border-border rounded-lg p-4 flex items-center gap-3">
              <div className="h-11 w-11 rounded-full bg-card2 text-white flex items-center justify-center font-display font-semibold">
                {emp.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-medium">{emp.name}</p>
                <p className="text-text-muted text-xs flex items-center gap-1">
                  <Mail size={12} />
                  {emp.email}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminEmployees;