# Task Management System (MERN Stack)

A full-stack Task Management System with role-based access for Admin and Employee, built using MongoDB, Express, React, and Node.js.

## Live Demo

- Frontend: https://task-management-project-tawny-omega.vercel.app
- Backend API: https://task-management-project-k3j1.onrender.com

## Features

### Authentication
- Separate login and registration for Admin and Employee
- JWT-based authentication
- Passwords hashed with bcrypt

### Admin Module
- View list of all employees
- Assign tasks to employees with priority (High / Medium / Low)
- Email notification sent to employee when a task is assigned
- Dashboard with task statistics (Not Started, Pending, Completed)
- View all tasks in a searchable, paginated table

### Employee Module
- View tasks assigned to them
- Update task status (Not Started, Pending, Completed)
- Email notification sent to Admin when status is updated

### UI
- Light and dark theme toggle
- Responsive layout with sidebar navigation
- Clean, professional design

## Tech Stack

**Frontend:** React, React Router, Tailwind CSS, Axios, Lucide React
**Backend:** Node.js, Express, MongoDB, Mongoose
**Auth:** JSON Web Tokens (JWT), bcrypt
**Email:** Nodemailer

## Folder Structure

task-management-system/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── adminController.js
│   │   └── employeeController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── roleMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   └── Task.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── adminRoutes.js
│   │   └── employeeRoutes.js
│   ├── utils/
│   │   └── sendEmail.js
│   ├── server.js
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── context/
    │   ├── pages/
    │   ├── services/
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── tailwind.config.js
    ├── vite.config.js
    └── package.json

## Getting Started

### Prerequisites
- Node.js installed
- MongoDB (local or MongoDB Atlas)
- A Gmail account with an App Password (for email notifications)

### Backend Setup

\`\`\`bash
cd backend
npm install
cp .env.example .env
\`\`\`

Fill in \`.env\` with your own values:

\`\`\`
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
\`\`\`

Run the backend:

\`\`\`bash
npm run dev
\`\`\`

Server runs at \`http://localhost:5000\`

### Frontend Setup

\`\`\`bash
cd frontend
npm install
\`\`\`

Update \`src/services/api.js\` with your backend URL if needed:

\`\`\`javascript
const api = axios.create({
  baseURL: "http://localhost:5000/api",
});
\`\`\`

Run the frontend:

\`\`\`bash
npm run dev
\`\`\`

App runs at \`http://localhost:5173\`

## API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register a new user |
| POST | /api/auth/login | Login and receive JWT token |

### Admin (requires Admin role)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/admin/employees | Get list of all employees |
| POST | /api/admin/tasks | Create and assign a task |
| GET | /api/admin/tasks | Get all tasks (search + pagination) |
| GET | /api/admin/dashboard-stats | Get task counts by status |

### Employee (requires Employee role)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/employee/tasks | Get tasks assigned to logged-in employee |
| PUT | /api/employee/tasks/:id/status | Update status of a task |

## How Authentication Works

1. User registers with name, email, password, and role (admin/employee)
2. Password is hashed with bcrypt before saving to database
3. On login, the server verifies credentials and returns a JWT containing the user's id and role
4. Frontend stores the token and sends it in the \`Authorization: Bearer <token>\` header on every request
5. Backend middleware verifies the token and checks the role before allowing access to protected routes

## Deployment

- Backend deployed on Render (Web Service)
- Frontend deployed on Vercel

Environment variables for the backend are configured directly in the Render dashboard, not committed to GitHub.

## Author

Built as a task completion project for a MERN Stack Developer role.