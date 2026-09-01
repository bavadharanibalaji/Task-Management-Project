const TaskTable = ({ tasks, showAssignedTo, onStatusChange }) => {
  const priorityColor = {
    High: "text-danger",
    Medium: "text-warning",
    Low: "text-success",
  };

  return (
    <table className="w-full bg-surface border border-border rounded-lg overflow-hidden text-sm sm:text-base">
      <thead className="bg-bg border-b border-border">
        <tr>
          <th className="text-left p-3">Title</th>
          <th className="text-left p-3">Priority</th>
          <th className="text-left p-3">Status</th>
          {showAssignedTo && <th className="text-left p-3">Assigned To</th>}
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr key={task._id} className="border-b border-border last:border-0 hover:bg-bg/20 transition-colors">
            <td className="p-3">
              <p className="font-medium">{task.title}</p>
              <p className="text-text-muted text-xs sm:text-sm">{task.description}</p>
            </td>
            <td className={`p-3 font-medium ${priorityColor[task.priority] || "text-text"}`}>
              {task.priority}    
            </td>
            <td className="p-3">
              {onStatusChange ? (
                /* Interactive drop down view profile for Employee dashboard layouts */
                <select
                  value={task.status}
                  onChange={(e) => onStatusChange(task._id, e.target.value)}
                  className="border border-border rounded-md px-2 py-1 bg-bg text-sm outline-none cursor-pointer focus:ring-2 focus:ring-primary"
                >
                  <option value="Not Started">Not Started</option>
                   <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                </select>
              ) : (
                /* Static flat text fallback view profile for Admin dashboard layouts */
                <span className="inline-block px-2 py-1 rounded text-xs font-medium bg-white/5 border border-border">
                  {task.status}
                </span>
              )}
            </td>
            {showAssignedTo && (
              <td className="p-3 font-medium text-text">
                {task.assignedTo?.name || "Unassigned"}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TaskTable;