const mongoose = require('mongoose')
const collection = "Cart"

const cartItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    name: String,
    price: Number,
    quantity: {
        type: Number,
        required: true,
        min: 1
    }
})

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    items: [cartItemSchema],
    date: {
        type: Date,
        default: Date.now
    },
    totalPrice: {
        type: Number,
        default: 0
    }
});

const cartModel = mongoose.model(collection, cartSchema)

module.export = {
    cartModel
}