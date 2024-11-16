const mongoose = require('mongoose');
const collection = 'Reservas';

const reservasSchema = new mongoose.Schema({
    spotNumber: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Spots',
        required: true 
    },
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Users', 
        required: true
    },
    vehicle: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Vehicles', 
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['reservado', 'disponible', 'cancelado'], // Estado de la reserva
        default: 'available'
    },
    type: {
        type: String,
        enum: ['Spot', 'Arreglo'],
        required: true
    }
});

const reservasModel = mongoose.model(collection, reservasSchema);

module.exports = {
    reservasModel
};
