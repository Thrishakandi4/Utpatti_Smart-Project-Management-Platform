const Task=require("../models/TaskModel")
const createTask=async(req,res)=>{
const{title,description,assignedto,status}=req.body;
if(!title || !assignedto || !status){
return res.status(400).json({message:"All fields are required"})
}
if(title.trim().length<3 || title.trim().length>100){
return res.status(400).json({message:"Title must be between 3 and 100 characters"});
}
if(description && description.length>500){
return res.status(400).json({message:"Description too long (max 500 characters)"});
}
if(!['Backlog','In Progress','QA','Done'].includes(status)){
return res.status(400).json({message:"Invalid status"});
}
try{
const task=new Task({title:title.trim(),description:description?description.trim():"",assignedto,status,history:[{phase:status}]});
await task.save();
return res.json({message:"Task Created"})
}catch(err){
return res.status(500).json({message:"Server error",err});
}
}
module.exports=createTask;