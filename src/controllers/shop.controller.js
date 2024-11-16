const {productService, userService, cartService} = require('../services/index.js')
const {ProductDTO} = require('../dto/Product.dto.js')

const addProduct = async (req,res) => {
    const {name, price,description,stock, code, category} = req.body
    if(!name||!price||!description||!stock||!code||!category) return res.status(400).send({status:"error",error:"Todos los campos son necesarios"})
    const product = ProductDTO.getProductFrom({name, price,description,stock, code, category})
    const result = await productService.create(product)
    res.status(200).send({status:"success", payload:result})
}

const getProducts = async(req, res) => {
    const {name, min, max} = req.query
    try {
        let filters = {}
        if(name) {
            filters.name = new RegExp(name, 'i')
        }
        if(min !== undefined || max !== undefined) {
            filters.price = {}
            if (min !== undefined) filters.price.$gte = Number(min);
            if (max !== undefined) filters.price.$lte = Number(max);
        }
        const products = await productService.getAll(filters)
        if(products.lenght === 0 || products == {}) {
            return res.status(400).send({message: "No se encontraron resultados para la busqueda"})
        }
        res.status(200).send({message:"Success", payload: products})
    } catch (error) {
        res.status(400).send({error: "Error",message:"Error"})
        console.log(error)
    }
}

const getByCategory = async(req, res) => {
    const {category} = req.params
    try {
        const products = await productService.getByCategory(category)
        if (!products || products.length === 0) {
            return res.status(404).send({ message: "No hay productos para esta categoría" });
        }
        res.status(200).send({status:"success", payload: products})
    } catch (error) {
        res.status(400).send({error: "Error",message:"Error"})
        console.log(error)
    }
}


const viewProduct = async (req, res) => {
    const {productId} = req.params
    try {
        const product = productService.getBy({productId})
        if(!product) return res.status(404).send({error: "Error", message: "No se encontró el producto"})
        res.status(200).send({message: "Success", payload: product})
    } catch (error) {
        res.status(400).send({error: "Error",message:"Error"})
        console.log(error)
    }
}

const addToCart = async (req, res) => {
    const {productId, userId, quantity} = req.body
    try {
        const user = await userService.getUserById(userId)
        if(!user) return res.status(404).send({error: "Error", message: "No se encontró el usuario"})
        const product = await productService.getBy({productId})
        if(!product) return res.status(404).send({error: "Error", message: "No se encontró el producto"})
        await cartService.addToCart(userId, productId, quantity);
        res.status(200).send({ message: "Product added to cart" });
    } catch (error) {
        res.status(400).send({error: "Error",message:"Error"})
        console.log(error)
    }
}

const viewCart = async (req, res) => {
    const { userId } = req.params;
    try {
        const cart = await cartService.getUserCart(userId);
        res.status(200).send({ message: "Success", payload: cart });
    } catch (error) {
        res.status(400).send({ error: "Error", message: "Error retrieving cart" });
        console.log(error);
    }
};

const removeFromCart = async (req, res) => {
    const { userId, productId } = req.body;
    try {
        await cartService.removeFromCart(userId, productId);
        res.status(200).send({ message: "Product removed from cart" });
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
    getProducts,
    getByCategory,
    clearCart,
    removeFromCart,
    viewCart,
    addToCart,
    viewProduct,
    addProduct
}
