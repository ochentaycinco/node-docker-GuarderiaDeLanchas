const { cartModel } = require('./models/Cart.js');

class Cart {
    get = (params) => {
        return cartModel.find(params);
    }

    getByOne = (params) => {
        return cartModel.findOne(params);
    }

    save = (cart) => {
        return cartModel.create(cart);
    }

    update = (cartId, doc) => {
        return cartModel.findOneAndUpdate({ _id: cartId }, { $set: doc }, { new: true });
    }

    delete = (id) => {
        return cartModel.findByIdAndDelete(id);
    }}

module.exports = {
    Cart
};
