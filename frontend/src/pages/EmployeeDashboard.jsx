import { useState, useEffect } from "react";
import api from "../services/api";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import TaskTable from "../components/TaskTable";

const EmployeeDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    api.get(`/employee/tasks?search=${search}&page=${page}&limit=5`).then((res) => {
      setTasks(res.data.tasks);
      setTotalPages(res.data.totalPages);
    });
  }, [search, page]);

  const handleStatusChange = async (taskId, newStatus) => {
    await api.put(`/employee/tasks/${taskId}/status`, { status: newStatus });
    setTasks((prev) =>
      prev.map((t) => (t._id === taskId ? { ...t, status: newStatus } : t))
    );
  };

  return (
    <div className="flex min-h-screen bg-bg">
      <Sidebar role="employee" />

      <div className="flex-1 p-6">
        <TopBar title="My Tasks" subtitle="Tasks assigned to you" />

        <div className="mb-4">
          <SearchBar value={search} onChange={setSearch} />
        </div>

        <div className="bg-surface border border-border rounded-lg p-4">
          <TaskTable tasks={tasks} onStatusChange={handleStatusChange} />
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;