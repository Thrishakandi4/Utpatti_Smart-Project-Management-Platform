const Task=require("../models/TaskModel");
const doneTask=async(req,res)=>{
    try{
        const count=await Task.countDocuments({status:'Done'});
        return res.json({message:{count}});
    }
    catch(err)
    {
        return res.json({message:err});
    }
}
module.exports=doneTask;