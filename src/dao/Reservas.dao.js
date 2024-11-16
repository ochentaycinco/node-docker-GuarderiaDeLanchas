const { reservasModel } = require('./models/Reserva.js');

class Reserva {
    // Obtener todas las reservas con parámetros opcionales
    getAll = (params = {}) => {
        return reservasModel.find(params).populate('user vehicle');
    }

    // Obtener una reserva por ID
    getById = (id) => {
        return reservasModel.findById(id).populate('user vehicle');
    }

    // Obtener una reserva por número de spot
    getBySpot= (spotNumber) =>{
        return reservasModel.findOne({ spotNumber }).populate('user vehicle');
    }

    // Crear una nueva reserva
    save = (doc) =>{
        return reservasModel.create(doc);
    }

    // Actualizar una reserva por condiciones
    update = (conditions, updateDoc) =>{
        return reservasModel.findOneAndUpdate(conditions, { $set: updateDoc }, { new: true });
    }

    // Eliminar una reserva por condiciones
    delete = (conditions) => {
        return reservasModel.findOneAndDelete(conditions);
    }
}

module.exports = {
    Reserva
};
