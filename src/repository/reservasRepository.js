const { GenericRepository } = require("./genericRepository");

class ReservasRepository extends GenericRepository {
    constructor(dao) {
        super(dao);
    }

    // Crear una nueva reserva
    async createReservation(spotNumber,startDate, endDate, userId, patente, type) {
        return this.save({ spotNumber,startDate, endDate, userId, patente, type, status: 'ocupado' });
    }

    // Obtener todos los spots disponibles
    async getAvailableSpots() {
        return this.get({ status: 'disponible' });
    }

    // Obtener una reserva por número de spot
    async getBySpot(spotNumber) {
        return this.dao.getBySpot(spotNumber);
    }

    // Actualizar el estado de un spot
    async updateSpotStatus(spotNumber, newStatus) {
        return this.update({ spotNumber }, { status: newStatus });
    }

    // Eliminar una reserva por número de spot
    async deleteReservation(spotNumber) {
        return this.delete({ spotNumber });
    }

    // Actualizar una reserva existente
    async updateReservation(reservaId, { spotNumber, userId, patente, type }) {
        return this.update(reservaId, { spotNumber, userId, patente, type });
    }
}

module.exports = {
    ReservasRepository
};
