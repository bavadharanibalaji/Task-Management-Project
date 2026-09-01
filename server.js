const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectedDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const employeeRoutes = require("./routes/employeeRoutes");

dotenv.config();
connectedDB();

const app = express();
app.use(cors({ origin: 'https://task-management-project-tawny-omega.vercel.app', credentials: true}));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/employee",employeeRoutes);

app.get("/", (req,res)=>{
    res.send("Taskmanagement API is running...")
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`server running on the PORT ${PORT}`)
});