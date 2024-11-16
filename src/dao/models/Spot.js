const mongoose = require('mongoose');
const collection = 'Spots';

const spotSchema = new mongoose.Schema({
    spotNumber: {
        type: Number,
        required: true,
        unique: true
    },
    status: {
        type: String,
        enum: ['disponible', 'ocupado'],
        default: 'disponible'
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
});

const spotModel = mongoose.model(collection, spotSchema);

module.exports = {
    spotModel
};
