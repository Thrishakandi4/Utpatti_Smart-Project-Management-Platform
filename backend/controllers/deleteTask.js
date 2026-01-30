const Task = require("../models/TaskModel");

const deleteTask = async(req, res) => {
    try{
        const {taskId} = req.params;
        const deletedTask = await Task.findByIdAndDelete(taskId);
        
        if(!deletedTask) {
            return res.status(404).json({message: "Task not found"});
        }
        
        return res.json({message: "Task deleted successfully"});
    }
    catch(err){
        return res.status(500).json({message: err.message});
    }
}

module.exports = deleteTask;
