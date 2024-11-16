const { GenericRepository } = require('./genericRepository.js');

class SpotRepository extends GenericRepository{
    constructor(dao){
        super(dao);
    }
    getAvailableSpots = () => {
        return this.getBy({ status: 'disponible' });
    }

    // Obtiene un spot por número
    getSpotByNumber = (spotNumber) => {
        return this.getBy({ spotNumber });
    }

    // Actualiza el estado de un spot
    updateSpotStatus = (spotNumber, status) => {
        return SpotModel.findOneAndUpdate(
            { spotNumber },
            { $set: { status } },
            { new: true }
        );
    }

    // Crear un nuevo spot
    createSpot = (spotNumber) => {
        const newSpot = new SpotModel({ spotNumber });
        return newSpot.save();
    }
}

module.exports = {
    SpotRepository
};
