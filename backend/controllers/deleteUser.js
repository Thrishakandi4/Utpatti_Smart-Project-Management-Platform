const User = require("../models/UserModel");

const deleteUser = async(req, res) => {
    try {
        const userId = req.params.userId;
        const deletedUser = await User.findByIdAndDelete(userId);
        
        if(!deletedUser) {
            return res.json({message: "User not found"});
        }
        
        return res.json({message: "User deleted successfully"});
    }
    catch(err) {
        return res.json({message: err});
    }
}

module.exports = deleteUser;
