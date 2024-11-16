
class GenericRepository {
    constructor(dao) {
        this.dao = dao;
    }

    getAll = (params) =>{
        return this.dao.get(params);
    }
    
    getManyByIds = (ids) => {
        return this.dao.getManyByIds(ids)
    }

    getBy = (params) =>{
        return this.dao.getByOne(params);
    }

    create = (doc) =>{
        return this.dao.save(doc);
    }

    update = (id,doc) =>{
        return this.dao.update(id,doc);
    }

    delete = (id) =>{
        return this.dao.delete(id);
    }
}

module.exports = {
    GenericRepository
}