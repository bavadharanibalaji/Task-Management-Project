import { useState } from "react";
import { UserPlus } from "lucide-react";

const TaskForm = ({ employees, onSubmit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [assignedTo, setAssignedTo] = useState("");
  const [dueDate, setDueDate] = useState(""); // 1. Local state hook declared perfectly

  const handleSubmit = (e) => {
    e.preventDefault();
    // 2. Added dueDate payload key here so it passes over your database API call functions!
    onSubmit({ title, description, priority, assignedTo, dueDate });
    
    // 3. Clear out the fields on completion
    setTitle("");
    setDescription("");
    setPriority("Medium");
    setAssignedTo("");
    setDueDate(""); // Added clear execution line here
  };

  return (
    <form onSubmit={handleSubmit} className="border border-primary/30 rounded-lg p-4 mb-6 bg-surface shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <UserPlus size={20} className="text-primary" />
        <h2 className="font-display font-semibold text-base sm:text-lg">Assign New Task</h2>
      </div>

      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="w-full border border-border rounded-md px-3 py-2 mb-3 bg-bg text-text outline-none focus:ring-1 focus:ring-primary"
      />

      <textarea
        placeholder="Task description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        className="w-full border border-border rounded-md px-3 py-2 mb-3 bg-bg text-text outline-none focus:ring-1 focus:ring-primary h-20 resize-none"
      />

      {/* Responsive Row Sizing Layout: Stacks columns on mobile grids seamlessly */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="border border-border rounded-md px-3 py-2 bg-bg text-sm text-text outline-none cursor-pointer focus:ring-1 focus:ring-primary w-full"
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <select
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
          required
          className="border border-border rounded-md px-3 py-2 bg-bg text-sm text-text outline-none cursor-pointer focus:ring-1 focus:ring-primary w-full"
        >
          <option value="">Select employee</option>
          {employees.map((emp) => (
            <option key={emp._id} value={emp._id}>
              {emp.name}
            </option>
          ))}
        </select>

        {/* 4. NEW INTERACTIVE DUE DATE CALENDAR INPUT ELEMENT */}
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required // Toggle off if you want deadlines to be completely optional 
          className="border border-border rounded-md px-3 py-2 bg-bg text-sm text-text outline-none cursor-pointer focus:ring-1 focus:ring-primary w-full"
        />
      </div>

      <button type="submit" className="bg-primary text-white rounded-md px-5 py-2 font-medium hover:bg-primary-hover transition-colors shadow-sm text-sm">
        Assign Task
      </button>
    </form>
  );
};

export default TaskForm;