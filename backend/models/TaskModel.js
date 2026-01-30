const mongoose=require("mongoose");
const TaskSchema=mongoose.Schema({
title:{type:String},
description:{type:String},
assignedto:{type:String},
status:{type:String,enum:["Backlog","In Progress","QA","Done"],default:"Backlog"},
history:[{phase:{type:String},changedAt:{type:Date,default:Date.now}}]
})
module.exports=mongoose.model("Task",TaskSchema);
