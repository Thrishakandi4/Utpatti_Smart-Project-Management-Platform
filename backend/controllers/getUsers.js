const Usermodel=require("../models/UserModel");
const getUsers=async(req,res)=>{
    try{
        const users=await Usermodel.find({});
        return res.json(users);
    }
    catch(err){
        return res.status(500).json({message:"Server error",err});
    }
}
module.exports=getUsers;