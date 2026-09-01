const TaskTable = ({ tasks, showAssignedTo, onStatusChange }) => {
  const priorityColor = {
    High: "text-danger",
    Medium: "text-warning",
    Low: "text-success",
  };

  return (
    <table className="w-full bg-surface border border-border rounded-lg overflow-hidden text-sm ms:text-xl">
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
          <tr key={task._id} className="border-b border-border last:border-0">
            <td className="p-3">
              <p className="font-medium">{task.title}</p>
              <p className="text-text-muted text-sm">{task.description}</p>
            </td>
            <td className={`p-3 font-medium ${priorityColor[task.priority]}`}>
              {task.priority}    
            </td>
            <td className="p-3">
              {onStatusChange ? (
                <select
                  value={task.status}
                  onChange={(e) => onStatusChange(task._id, e.target.value)}
                  className="border border-border rounded-md px-2 py-1 bg-bg"
                >
                  <option value="Not Started">Not Started</option>
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                </select>
              ) : (
                task.status
              )}
            </td>
            {showAssignedTo && <td className="p-3">{task.assignedTo?.name}</td>}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TaskTable;