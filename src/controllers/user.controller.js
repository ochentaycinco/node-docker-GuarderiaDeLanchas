const { UserDTO } = require("../dto/User.dto.js");
const { userService } = require ("../services/index.js");

const getAllUsers = async(req, res) =>{
    const users = await userService.getAll()
    res.status(200).send({status: "success", payload:users})
}

const getUser = async(req, res)=> {
    const userId = req.params.uid
    const user = await userService.getUserById(userId)
    if(!user) return res.status(400).send({status:"error", message:"User not found"})
    res.send({status:"success", payload:user})
}

const updateUser = async(req, res)=>{
    const updateBody = req.updateBody
    const userId = req.params.uid
    const user = await userService.getUserById(userId)
    if(!user) return res.status(400).send({status:"error", error:"User not found"})
    const result = await userService.update(userId, updateBody);
    res.send({status:"Success", payload:result})
}

const deleteUser = async(req, res)=>{
    const userId = req.params.uid
    const result = await userService.delete(userId)
    res.status(200).send({status:"Success", message:"User deleted"})
}

module.exports = {
    getAllUsers,
    getUser,
    updateUser,
    deleteUser,
}