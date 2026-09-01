import { useState } from "react";
import { UserPlus } from "lucide-react";


const TaskForm = ({ employees, onSubmit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [assignedTo, setAssignedTo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, description, priority, assignedTo });
    setTitle("");
    setDescription("");
    setPriority("Medium");
    setAssignedTo("");
  };

  return (
    <form onSubmit={handleSubmit} className=" border border-primary/30 rounded-lg p-4 mb-6">
      <div className="flex items-center gap-2 mb-3">
        <UserPlus size={20} className="text-primary" />
        <h2 className="font-display font-semibold ms:xl">Assign New Task</h2>
      </div>

      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="w-full border border-border rounded-md px-3 py-2 mb-3 bg-surface"
      />

      <textarea
        placeholder="Task description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        className="w-full border border-border rounded-md px-3 py-2 mb-3 bg-surface"
      />

      <div className="flex gap-3 mb-3">
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="border border-border rounded-md px-3 py-2 bg-surface flex-1"
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <select
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
          required
          className="border border-border rounded-md px-3 py-2 bg-surface flex-1"
        >
          <option value="">Select employee</option>
          {employees.map((emp) => (
            <option key={emp._id} value={emp._id}>
              {emp.name}
            </option>
          ))}
        </select>
      </div>

      <button type="submit" className="bg-primary text-white rounded-md px-4 py-2 hover:opacity-90">
        Assign Task
      </button>
    </form>
  );
};

export default TaskForm;