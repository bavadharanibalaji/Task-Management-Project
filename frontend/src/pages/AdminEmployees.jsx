import { useState, useEffect } from "react";
import { Mail, UserPlus } from "lucide-react";
import api from "../services/api";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";

const AdminEmployees = () => {
  const [employees, setEmployees] = useState([]);
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    api.get("/admin/employees").then((res) => setEmployees(res.data));
  }, []);

 
  const handleAddEmployee = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      
      const response = await api.post("/auth/register", {
        name,
        email,
        password,
        role: "employee" 
      });

      if (response.status === 201 || response.status === 200) {
        setSuccess("Employee added successfully!");
        
       
        setName("");
        setEmail("");
        setPassword("");

       
        const updatedList = await api.get("/admin/employees");
        setEmployees(updatedList.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add employee. Try again.");
    }
  };

  return (
    <div className="flex min-h-screen bg-bg">
      <Sidebar role="admin" />

      <div className="flex-1 p-6 pt-16 md:pt-6 w-full min-w-0">
        <TopBar title="Employees" subtitle={`${employees.length} team members`} />

        <div className="bg-surface border border-border rounded-lg p-5 mb-8 max-w-2xl shadow-sm">
          <div className="flex items-center gap-2 mb-4 text-primary">
            <UserPlus size={18} />
            <h2 className="font-display font-semibold text-base">Add New Employee Instantly</h2>
          </div>

          {error && <p className="text-danger text-xs mb-3 font-medium">{error}</p>}
          {success && <p className="text-success text-xs mb-3 font-medium">{success}</p>}

          <form onSubmit={handleAddEmployee} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full border border-border rounded-md px-3 py-2 bg-bg text-sm outline-none focus:ring-2 focus:ring-primary text-text"
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border border-border rounded-md px-3 py-2 bg-bg text-sm outline-none focus:ring-2 focus:ring-primary text-text"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border border-border rounded-md px-3 py-2 bg-bg text-sm outline-none focus:ring-2 focus:ring-primary text-text"
              />
            </div>
            <div className="sm:col-span-3 flex justify-end mt-2">
              <button
                type="submit"
                className="bg-primary hover:bg-primary-hover text-white text-sm font-medium px-5 py-2 rounded-md transition-colors shadow-sm"
              >
                Add Employee
              </button>
            </div>
          </form>
        </div>

        <h2 className="font-display font-semibold text-base mb-4 text-text">Team Roster</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {employees.map((emp) => (
            <div key={emp._id} className="bg-surface border border-border rounded-lg p-4 flex items-center gap-3 shadow-sm">
              <div className="h-11 w-11 shrink-0 rounded-full bg-card2 text-white flex items-center justify-center font-display font-semibold">
                {emp.name ? emp.name.charAt(0).toUpperCase() : "?"}
              </div>
              <div className="min-w-0">
                <p className="font-medium truncate">{emp.name}</p>
                <p className="text-text-muted text-xs flex items-center gap-1 truncate">
                  <Mail size={12} className="shrink-0" />
                  <span className="truncate">{emp.email}</span>
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