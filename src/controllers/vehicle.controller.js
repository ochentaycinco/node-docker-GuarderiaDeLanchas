const {VehicleDTO} = require ("../dto/Vehicle.dto.js");
const { vehicleService } = require("../services/index.js");
const {userService} = require('../services/index.js')

const getAllVehicles = async(req, res) =>{
    const {userId} = req.params.uid

    try {
        const user = await userService.getUserById(userId)
        if(!user) return res.status(404).send({error: "Error", message: "Usuario no encontrado"})
        
        const vehicles = await vehicleService.getBy({ owner: userId });

        res.status(200).send({status: "success", payload:vehicles})
    } catch (error) {
        res.status(500).send({message: "Ocurrio un error"})
        console.log(error)
    }
}

const getMyVehicle = async(req, res) => {
    const {userId, patente} = req.params
    try {
        const user = await userService.getUserById(userId)
        if(!user) return res.status(404).send({error:"Error", message: "User ID not found"})
        const vehicle = await vehicleService.getByPatente(patente)
        if(!vehicle) res.status(404).send({error: "Error", message: "Patente not registered on system"})
        if (vehicle.owner.toString() !== userId) {
            return res.status(403).send({ error: "Error", message: "Este vehículo no pertenece al usuario" });
        }

        res.send({status:"success",payload:vehicle})
    } catch (error) {
        res.status(500).send({error: "Erorr", message: "No se pudo encontrar"})
        console.log(error)   
    }
}

const addVehicle = async(req, res)=> {
    const userId = req.params.uid
    const {patente, type, model} = req.body
    if(!patente || !type || !model) return res.status(400).send({error:"Error", message: "Todos los datos son necesarios"})
    try {
        const existingVehicle = await vehicleService.getByPatente(patente);
        if (existingVehicle) return res.status(400).send({ error: "Error", message: "Patente ya registrada" })
        const user = await userService.getUserById(userId)
        if(!user) return res.send(200).send({error: "Error", message: "User not found"})
        const vehicle = {
            patente,
            type,
            model,
            owner: userId
        }
        const result = await vehicleService.create(vehicle)
        res.send({status:"success", payload:result})

    } catch (error) {
        res.status(500).send({error: "Erorr", message: "No se pudo añadir"})
        console.log(error)
    }
}

const updateVehicle = async(req, res)=>{
    const updateBody = req.body
    const {patente} = req.params   
    try {
        const vehicle = await vehicleService.getByPatente(patente)
        if(!vehicle) return res.status(400).send({status:"error", error:"Vehicle not found"})
        const result = await vehicleService.update(vehicle._id, updateBody);
        res.send({status:"Success", payload:result})
    } catch (error) {
       res.status(500).send({error: "Erorr", message: "No se pudo actualizar"})
       console.log(error)  
    }   
    
}

const deleteVehicle = async(req, res)=>{
    const {patente} = req.params 
    try {
        const vehicle = await vehicleService.getBy({patente})
        if(!vehicle) return res.status(400).send({status:"error", error:"Vehicle not found"})
        await vehicleService.delete(vehicle._id)
        res.status(200).send({status:"Success", message:"Vehicle deleted"})
    } catch (error) {
        res.status(500).send({error: "Erorr", message: "No se pudo eliminar"})
        console.log(error)
    }
    
}

module.exports = {  
    deleteVehicle,
    updateVehicle,
    addVehicle,
    getAllVehicles,
    getMyVehicle
}