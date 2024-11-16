const {GenericRepository} = require("./genericRepository.js");

class VehicleRepository extends GenericRepository {
    constructor(dao) {
        super(dao)
    }
    getByPatente = (patente) =>{
        return this.getBy({patente})
    
    }
    

}

module.exports = {
    VehicleRepository
}