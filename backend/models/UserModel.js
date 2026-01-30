const mongoose=require("mongoose");
const UserSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        minlength:2,
        maxlength:50
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    role:{
        type:String,
        required:true,
        enum:['Developer','Tester','Member']
    }
})
module.exports=mongoose.model("User",UserSchema);