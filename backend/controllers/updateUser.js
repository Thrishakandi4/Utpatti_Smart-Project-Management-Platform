const User = require("../models/UserModel");

const updateUser = async(req, res) => {
    try {
        console.log("Update request received:", req.params.userId);
        console.log("Update data:", req.body);
        
        const userId = req.params.userId;
        const {name, email, role} = req.body;
        
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {name, email, role},
            {new: true}
        );
        
        console.log("Updated user:", updatedUser);
        
        if(!updatedUser) {
            return res.json({message: "User not found"});
        }
        
        return res.json({message: "User updated successfully", user: updatedUser});
    }
    catch(err) {
        console.log("Error updating user:", err);
        return res.json({message: err.message});
    }
}

module.exports = updateUser;
