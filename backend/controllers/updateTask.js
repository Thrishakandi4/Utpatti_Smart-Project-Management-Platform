const Task = require("../models/TaskModel");
const updateTask = async(req, res) => {
try {
const taskId = req.params.taskId;
const {status} = req.body;
if (!taskId.match(/^[0-9a-fA-F]{24}$/)) {
return res.status(400).json({message: "Invalid task ID"});
}
const task = await Task.findById(taskId);
if(!task) {
return res.status(404).json({message: "Task not found"});
}
if(status && status !== task.status){
task.status = status;
task.history.push({phase:status,changedAt:new Date()});
}
await task.save();
return res.json({message: "Task updated successfully", task: task});
    }
    catch(err) {
        console.error("Error updating task:", err.message);
        return res.status(500).json({message: err.message});
    }
}

module.exports = updateTask;
