const mongoose = require('mongoose')
const collection = "Users"

const schema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,

    },
    reservas: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Reservas'
    },
    vehicles: [{type: mongoose.SchemaTypes.ObjectId, ref:"Vehicles"}],
    carrito: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Cart"
    }
})

const userModel = mongoose.model(collection, schema)
module.exports = {
    userModel
}