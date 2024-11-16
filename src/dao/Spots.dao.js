const {spotModel} = require('./models/Spot.js')
class Spot {
    getAvailableSpots = () => {
        return spotModel.find({ status: 'available' });
    }

    // Obtener un spot por su número
    getSpotByNumber = (spotNumber)=> {
        return spotModel.findOne({ spotNumber });
    }

    // Actualizar el estado de un spot (available/occupied)
    updateSpotStatus = (spotNumber, status)=> {
        return spotModel.findOneAndUpdate(
            { spotNumber },
            { $set: { status } },
            { new: true }
        );
    }

    // Crear un nuevo spot
    createSpot = (spotNumber)=> {
        const newSpot = new this.spotModel({ spotNumber });
        return newSpot.save();
    }
}

module.exports = {
    Spot
}