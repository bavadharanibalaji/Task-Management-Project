const express = require("express");
const protect = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/roleMiddleware");
const {getEmployees, createTask, getAllTasks, getDashboardStats,} = require("../controllers/adminController");

const router = express.Router();

router.get("/employees", protect, authorizeRoles("admin"), getEmployees);
router.post("/tasks", protect, authorizeRoles("admin"), createTask);
router.get("/tasks", protect, authorizeRoles("admin"), getAllTasks);
router.get("/dashboard-stats", protect, authorizeRoles("admin"), getDashboardStats);

module.exports = router