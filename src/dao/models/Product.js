const mongoose = require('mongoose')
const collection = "Products"
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: String,
    stock: {
        type: Number,
        default: 0,
        min: 0
    },
    code:{ 
        type: Number,
        required: true,
        unique: true
    },
    category: {
        type: String,
        enum: ["Accesorios","Repuestos","Equipamiento","Otro"],
        required: true
    }
})

const productModel = mongoose.model(collection, productSchema)

module.exports = {
    productModel
}