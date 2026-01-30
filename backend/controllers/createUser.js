const User=require("../models/UserModel");
const createUser=async(req,res)=>{
const {name,email,role}=req.body;
if(!name || !email || !role){
return res.status(400).json({message:"All fields are required"});
}
if(name.trim().length<2 || name.trim().length>50){
return res.status(400).json({message:"Name must be between 2 and 50 characters"});
}
const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if(!emailRegex.test(email)){
return res.status(400).json({message:"Invalid email format"});
}
if(!['Developer','Tester','Member'].includes(role)){
return res.status(400).json({message:"Invalid role"});
}
try{
const user=new User({name:name.trim(),email:email.toLowerCase().trim(),role});
await user.save();
return res.json({message:"User created successfully"});
}catch(err){
if(err.code===11000){
return res.status(400).json({message:"Email already exists"});
}
if(err.name==='ValidationError'){
const messages=Object.values(err.errors).map(e=>e.message);
return res.status(400).json({message:messages.join(", ")});
}
return res.status(500).json({message:"Server error",err:err.message});
}
}
module.exports=createUser