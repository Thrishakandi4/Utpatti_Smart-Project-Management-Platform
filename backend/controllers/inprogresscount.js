const Task=require("../models/TaskModel");
const inprogressCount=async(req,res)=>{
    try{  
        const count=await Task.countDocuments({status:'In Progress'});
        return res.json({message:{count}});
    }
    catch(err)
    {
           return res.json({message:err});
    }
}
module.exports=inprogressCount;