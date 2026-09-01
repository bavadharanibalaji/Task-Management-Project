const User = require("../models/User");
const Task = require("../models/Task");
const sendEmail = require("../utils/sendEmail");

const getMyTasks = async (req, res) => {
  try {
    const { search = "", page = 1, limit = 5 } = req.query;

    const filter = {
      assignedTo: req.user.id,
      title: { $regex: search, $options: "i" },
    };

    const tasks = await Task.find(filter)
      .populate("assignedBy", "name email")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const totalTasks = await Task.countDocuments(filter);

    res.status(200).json({
      tasks,
      totalTasks,
      totalPages: Math.ceil(totalTasks / limit),
      currentPage: Number(page),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error});
  }
}

const updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    // Only valid status values are allowed
    const validStatuses = ["Not Started", "Pending", "Completed"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    // Find the task, and make sure it actually belongs to this employee
    const task = await Task.findOne({ _id: id, assignedTo: req.user.id });
    if (!task) {
      return res.status(404).json({ message: "Task not found or not assigned to you" });
    }

    task.status = status;
    await task.save();

    // Notify the admin who assigned this task
    const admin = await User.findById(task.assignedBy);
    const employee = await User.findById(req.user.id);
    if (admin) {
      await sendEmail(
        admin.email,
        "Task Status Updated",
        `${employee.name} updated the task "${task.title}" to status: ${status}.`
      );
    }

    res.status(200).json({ message: "Task status updated", task });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { getMyTasks, updateTaskStatus };