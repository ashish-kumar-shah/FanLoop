const User = require('../../Models/User')

 const authenticatUser = async(req,res)=>{
   try {
       const id = req.user;
       
       
       const user = await User.findById(id).select("-password");
       res.status(200).json({ user, authentication: true });
   } catch (error) {
        console.log(error);
        res.status(404).json({msg: "User not found" , authentication:false});
   }
}
module.exports = { authenticatUser };