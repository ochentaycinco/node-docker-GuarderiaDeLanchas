class ProductDTO {
    static getProductFrom = (product) => {
        return {
            name:product.name,
            price:product.price||'',
            description:product.description||"",
            stock:product.stock||'',
            code:product.code||'',
            category:product.category||''
        }
    }
    static fromCartItem(cartItem) {
        return {
            productId: cartItem.productId._id,
            name: cartItem.productId.name,
            price: cartItem.productId.price,
            quantity: cartItem.quantity
        };
    }
}

module.exports = {
    ProductDTO
}