const express = require("express");
const protect = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/roleMiddleware");
const { getMyTasks, updateTaskStatus } = require("../controllers/employeeController");

const router = express.Router();

router.get("/tasks", protect, authorizeRoles("employee"), getMyTasks);
router.put("/tasks/:id/status", protect, authorizeRoles("employee"), updateTaskStatus);

module.exports = router;

