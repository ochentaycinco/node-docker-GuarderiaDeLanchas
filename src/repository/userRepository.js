
const {GenericRepository} = require("./genericRepository.js");

class UserRepository extends GenericRepository{
    constructor(dao){
        super(dao);
    }
    
    getUserByEmail = (email) =>{
        return this.getBy({email});
    }
    getUserById = (id) =>{
        return this.getBy({_id:id}).populate('vehicles')
    }
    
    
}

module.exports = {
    UserRepository
}