const User=require("../models/UserModel")
const countUsers=async(req,res)=>{
    try{
          const count=await User.countDocuments();
          return res.json({message:{count}});
    }
    catch(err)
    {
        return res.json({message:err});
    }
     


}
module.exports=countUsers;