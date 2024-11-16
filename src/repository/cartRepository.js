const { GenericRepository } = require('./genericRepository');

class CartRepository extends GenericRepository {
    constructor(dao) {
        super(dao);
    }
    clearCart(userId) {
        return this.update({ userId }, { items: [] });
    }
}


module.exports = {
    CartRepository
};
