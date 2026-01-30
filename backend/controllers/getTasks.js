const Task=require("../models/TaskModel");
const getTasks=async(req,res)=>{
    try{
          const result=await Task.find({});
          return res.json(result);
    }
    catch(err)
    {
        return res.status(500).json({message:"Server error",err});
    }
     

}
module.exports=getTasks;
