const User = require("../models/User");
const Task = require("../models/Task");
const sendEmail = require("../utils/sendEmail");

const getEmployees = async (req, res) => {
  try {
    const employees = await User.find({ role: "employee" }).select("-password");
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const createTask = async (req, res) => {
  try {
    const { title, description, priority, assignedTo } = req.body;

    const task = await Task.create({
      title,
      description,
      priority,
      assignedTo,
      assignedBy: req.user.id, 
    });

  
    const employee = await User.findById(assignedTo);
    if (employee) {
      await sendEmail(
        employee.email,
        "New Task Assigned",
        `Hello, ${employee.name}, a new task "${title}" has been assigned to you with priority: ${priority}.`
      );
    }

    res.status(201).json({ message: "Task created!", task });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getAllTasks = async (req, res) => {
  try {
    const { search = "", page = 1, limit = 5 } = req.query;

    const filter = {
      title: { $regex: search, $options: "i" },
    };

    const tasks = await Task.find(filter)
      .populate("assignedTo", "name email")   
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
    res.status(500).json({ message: "Server error", error });
  }
};

const getDashboardStats = async (req, res) => {
  try {
    const stats = await Task.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    const formattedStats = {
      "Not Started": 0,
      "Pending": 0,
      "Completed": 0,
    };
    stats.forEach((item) => {
      formattedStats[item._id] = item.count;
    });

    res.status(200).json(formattedStats);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { getEmployees, createTask, getAllTasks, getDashboardStats };
