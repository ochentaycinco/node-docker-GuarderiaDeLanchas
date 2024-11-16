const { GenericRepository } = require("./genericRepository");

class ProductRepository extends GenericRepository{
    constructor(dao){
        super(dao)
    }
    getByCategory = (category) => {
        return this.getAll({category:category})
    }
    getProdById = (id) => {
        return this.getBy({_id:id})
    }
}

module.exports = {
    ProductRepository
}