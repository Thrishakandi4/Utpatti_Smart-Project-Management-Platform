const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");
const createUsers=require("./controllers/createUser");
require("dotenv").config();

const countUser=require("./controllers/countUsers");
const getUsers=require("./controllers/getUsers");
const createTask=require("./controllers/createTask");
const getTasks = require("./controllers/getTasks");
const countTasks =require("./controllers/countTasks");
const inprogressCount= require("./controllers/inprogresscount");
const doneTask=require("./controllers/doneCount");
const deleteUser=require("./controllers/deleteUser");
const deleteTask=require("./controllers/deleteTask");
const updateUser=require("./controllers/updateUser");
const updateTask=require("./controllers/updateTask");



const app=express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.db_uri)
.then(()=>console.log("Connected to DataBase"))
.catch(err=>console.error("Connection Error"))

app.post("/adduser",createUsers);
app.get("/countusers",countUser);
app.get("/getusers",getUsers);
app.post("/addtask",createTask);
app.get("/gettasks",getTasks);
app.get("/tasks",countTasks);
app.get("/inprogress",inprogressCount);
app.get("/donetasks",doneTask);
app.delete("/deleteuser/:userId",deleteUser);
app.put("/updateuser/:userId",updateUser);
app.put("/updatetask/:taskId",updateTask);

// API routes (for frontend)
app.post("/api/users", createUsers);
app.get("/api/users", getUsers);
app.get("/api/users/count", countUser);
app.post("/api/tasks", createTask);
app.get("/api/tasks", getTasks);
app.get("/api/tasks/count", countTasks);
app.get("/api/tasks/inprogress/count", inprogressCount);
app.get("/api/tasks/done/count", doneTask);
app.get("/api/tasks/count/Backlog", countTasks); // For Backlog count
app.get("/api/tasks/count/QA", countTasks); // For QA count
app.delete("/api/users/:userId", deleteUser);
app.put("/api/users/:userId", updateUser);
app.put("/api/tasks/:taskId", updateTask);
app.delete("/api/tasks/:taskId", deleteTask);

const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});


