const {productModel} = require('./models/Product.js')

class Product {
    get = (params) => {
        return productModel.find(params)
    }

    getByOne = (params) => {
        return productModel.findOne(params)
    }
    save = (doc) => {
        return productModel.create(doc)
    }
    update = (id, doc) => {
        return productModel.findOneAndUpdate({_id: id}, { $set: doc })
    }
    delete = (id) => {
        return productModel.findByIdAndDelete(id)
    }
}

module.exports = {
    Product
}