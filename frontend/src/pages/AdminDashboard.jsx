import { useState, useEffect } from "react";
import { ListTodo, Clock, CheckCircle2 } from "lucide-react";
import api from "../services/api";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import StatCard from "../components/StatCard";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import TaskTable from "../components/TaskTable";
import TaskForm from "../components/TaskForm";

const AdminDashboard = () => {
  const [stats, setStats] = useState({});
  const [employees, setEmployees] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    api.get("/admin/dashboard-stats").then((res) => setStats(res.data));
    api.get("/admin/employees").then((res) => setEmployees(res.data));
  }, []);

  useEffect(() => {
    api.get(`/admin/tasks?search=${search}&page=${page}&limit=5`).then((res) => {
      setTasks(res.data.tasks);
      setTotalPages(res.data.totalPages);
    });
  }, [search, page]);

  const handleCreateTask = async (taskData) => {
    await api.post("/admin/tasks", taskData);
    const res = await api.get(`/admin/tasks?search=${search}&page=${page}&limit=5`);
    setTasks(res.data.tasks);
    const statsRes = await api.get("/admin/dashboard-stats");
    setStats(statsRes.data);
  };

  return (
    <div className="flex min-h-screen bg-bg">
      <Sidebar role="admin" />

      {/* Main Panel Content - Patched layout sizing blocks */}
      <div className="flex-1 p-6 pt-16 md:pt-6 w-full min-w-0">
        <TopBar title="Dashboard" subtitle="Overview of all tasks" />

        {/* Responsive Grid System: Stacks on mobile viewports, wraps smoothly */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <StatCard label="Not Started" count={stats["Not Started"] || 0} icon={ListTodo} color="var(--card1)" />
          <StatCard label="Pending" count={stats["Pending"] || 0} icon={Clock} color="var(--card2)" />
          <StatCard label="Completed" count={stats["Completed"] || 0} icon={CheckCircle2} color="var(--card3)" />
        </div>

        <TaskForm employees={employees} onSubmit={handleCreateTask} />

        <div className="mb-4">
          <SearchBar value={search} onChange={setSearch} />
        </div>

        {/* Added dynamic horizontal wrap constraints for the table components */}
        <div className="bg-surface border border-border rounded-lg p-4 overflow-x-auto">
          <TaskTable tasks={tasks} showAssignedTo />
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;