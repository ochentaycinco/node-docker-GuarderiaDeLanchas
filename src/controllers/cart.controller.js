const { ProductDTO } = require('../dto/Product.dto.js');
const {cartService, userService, productService} = require('../services/index.js')

const getCart = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await userService.getUserById(userId)
        res.status(200).send({ message: "Success", payload: user.carrito });
    } catch (error) {
        res.status(400).send({ error: "Error", message: "Error retrieving cart" });
        console.log(error);
    }
};

const addToCart = async (req, res) => {
    const { userId } = req.params
    const {productId, quantity } = req.body;
    try {
        const user = await userService.getUserById(userId)
        const product = await productService.getProdById(productId)
        const itemIndex = user.carrito.findIndex(item => item.productId.equals(productId))
        if(itemIndex > -1) {
            user.carrito[itemIndex].quantity += quantity
        }else{
            user.carrito.push({
                productId: product._id, 
                quantity,
                name: product.name,
                price: product.price
            })
        }
        await user.save()
        res.status(200).send({ message: "Product added to cart", payload: user.carrito });
    } catch (error) {
        res.status(400).send({ error: "Error", message: "Error adding product to cart" });
        console.log(error);
    }
};

const removeFromCart = async (req, res) => {
    const { userId, productId } = req.params
    try {
        const user = await userService.getUserById(userId);
        const itemIndex = user.carrito.findIndex(item => item.productId.equals(productId))
        if(itemIndex === -1) {
            return res.status(400).send({message: "El producto no existe en tu carrito"})
        }
        const removedItem = user.carrito.items[itemIndex]
        cart.totalPrice -= removedItem.price * removedItem.quantity;
        cart.items.splice(itemIndex, 1)
        await cart.save();
        res.status(200).send({ message: "Product removed from cart", payload: user.carrito });
    } catch (error) {
        res.status(400).send({ error: "Error", message: "Error removing product from cart" });
        console.log(error);
    }
};

const clearCart = async (req, res) => {
    const { userId } = req.params;
    try {
        await cartService.clearCart(userId);
        res.status(200).send({ message: "Cart cleared" });
    } catch (error) {
        res.status(400).send({ error: "Error", message: "Error clearing cart" });
        console.log(error);
    }
};

module.exports = {
    getCart,
    addToCart,
    removeFromCart,
    clearCart
}