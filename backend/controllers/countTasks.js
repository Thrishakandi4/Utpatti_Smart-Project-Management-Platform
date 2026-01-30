const Task=require("../models/TaskModel");
const countTasks=async(req,res)=>{
    try{
        const count=await Task.countDocuments();
        return res.json({message:{count}});
    }
    catch(err)
    {
        return res.json({message:err});
    }
}
module.exports=countTasks;