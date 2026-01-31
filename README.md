# Utpatti

Task management system using MERN stack. Kanban board for managing tasks through different phases.

## Links

- Live Demo: https://utpatti-smart-project-management.onrender.com/
- GitHub: https://github.com/Thrishakandi4/Utpatti_Smart-Project-Management-Platform

## What is it

A task management app where you can:
 Create users and assign tasks to them
 Move tasks through 4 phases (Backlog, In Progress, QA, Done)
 See task history
 Admin can view all tasks
 Users can see only their assigned tasks

## Tech Used

Frontend: React, React Router, Axios
Backend: Node.js, Express, MongoDB

## How to run

### Backend
```bash
cd backend
npm install
```

Make .env file:
```
db_uri=mongodb://localhost:27017/utpatti
PORT=5000
```

Run:
```bash
node server.js
```

### Frontend
```bash
cd frontend
npm install
npm start
```

## API

Users:
 POST /adduser - add user
 GET /getusers - get all users
 GET /countusers - count users
 PUT /updateuser/:userId - update
 DELETE /deleteuser/:userId - delete

Users (API routes used by frontend):
 POST /api/users - add user
 GET /api/users - get all users
 GET /api/users/count - count users
 PUT /api/users/:userId - update
 DELETE /api/users/:userId - delete

Tasks:
 POST /addtask - create task
 GET /gettasks - get all tasks
 GET /tasks - count tasks
 GET /inprogress - in progress count
 GET /donetasks - done count
 PUT /updatetask/:taskId - update task
 DELETE /deletetask/:taskId - delete task

Tasks (API routes used by frontend):
 POST /api/tasks - create task
 GET /api/tasks - get all tasks
 GET /api/tasks/count - count tasks
 GET /api/tasks/inprogress/count - in progress count
 GET /api/tasks/done/count - done count
 GET /api/tasks/count/Backlog - backlog count
 GET /api/tasks/count/QA - QA count
 PUT /api/tasks/:taskId - update task
 DELETE /api/tasks/:taskId - delete task

## Database

User: name, email, role
Task: title, description, assignedto, status, history
