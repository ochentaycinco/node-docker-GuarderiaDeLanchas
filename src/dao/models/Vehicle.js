const mongoose = require('mongoose')
const collection = "Vehicles"

const schema = new mongoose.Schema({
    patente:{
        type:String,
        required:true,
        unique:true
    },
    type:{
        type:String,
        required:true
    },
    model:{
        type:String,
        required:true
    },
    owner:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"Users",
        required:true
    }
})

const vehicleModel = mongoose.model(collection, schema)
module.exports = {
    vehicleModel
}