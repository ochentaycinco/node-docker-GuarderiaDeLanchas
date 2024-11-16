const { userService, vehicleService, spotService } = require('../services/index.js');
const { reservasService } = require('../services/index.js');

// Obtener lugares disponibles
const getAllReservas = async (req, res) => {
    try {
        const result = await reservasService.getAll();
        if(!result) return res.status(404).send({status:"Error", message:"No se encontraron reservas"})
        res.send({ status: 'success', payload: result });
    } catch (error) {
        res.status(500).send({ error: 'Error', message: 'No se pudieron obtener las reservas' });
    }
};

const getReserva = async (req, res) => {
    const reservaId = req.params.reservaId
    try {
        const reserva = reservasService.getBy({_id:reservaId})
        if(!reserva) return res.status(404).send({status:"Error", message:"Reserva no encontrada"})
        res.send({status:"success", payload: reserva})
    } catch (error) {
        res.status(500).send({ error: 'Error', message: 'Ocurrió un error; Chekialo'})
    }
}

const reserveSpot = async (req, res) => {
    const { spotNumber, userId, patente } = req.params;
    const { type,startDate, endDate } = req.body;

    if (!type || !['spot', 'arreglo'].includes(type)) {
        return res.status(400).send({ error: 'Error', message: 'Tipo de reserva inválido' });
    }

    try {
        const user = await userService.getUserById(userId);
        if (!user) return res.status(404).send({ error: "Error", message: "User not found" });

        const vehicle = await vehicleService.getByPatente(patente);
        if (!vehicle) return res.status(404).send({ error: "Error", message: "Vehicle not found" });

        const spot = await spotService.getSpotByNumber(spotNumber);
        if (!spot || spot.status === 'ocupado') {
            return res.status(400).send({ error: 'Error', message: `El spot ${spotNumber} ya está ocupado. Elige otro.` });
        }

        const result = await reservasService.createReservation(spotNumber,startDate, endDate, userId, vehicle._id, type);

        await spotService.updateSpotStatus(spotNumber, 'ocupado');

        if (!user.reservas) {
            user.reservas = [];
        }
        user.reservas.push(result._id);
        await userService.update(userId, { reservas: user.reservas });

        res.send({ status: 'success', payload: result });
    } catch (error) {
        res.status(500).send({ error: 'Error', message: 'No se pudo reservar el lugar' });
        console.log(error);
    }
};

const updateReservation = async (req, res) => {
    const { reservationId, userId } = req.params;
    const { patente, type, spotNumber } = req.body;

    if (!patente || !type) {
        return res.status(400).send({ error: 'Error', message: 'Todos los datos son necesarios' });
    }

    try {
        const user = await userService.getUserById(userId)
        if(!user) return res.status(404).send({error:"Error", message: "User not found"})
        const reserva = await reservasService.getBy({_id:reservationId})
        if(!reserva) return res.status(404).send({error:"Error", message:"Reserva no encontrada"})
        
        const newSpot = await spotService.getSpotByNumber(spotNumber);
        if (!newSpot || newSpot.status === 'ocupado') {
            return res.status(400).send({ error: 'Error', message: `El spot ${spotNumber} ya está ocupado. Elige otro.` });
        }
        //actualizo status si se cambia el numero de spot 
        if (spotNumber !== reserva.spotNumber) {
            await spotService.updateSpotStatus(reserva.spotNumber, 'disponible');

            await spotService.updateSpotStatus(spotNumber, 'ocupado');
        }
        
        const result = await reservasService.updateReservation(reservationId, {spotNumber, user, patente, type});
        res.send({ status: 'success', payload: result });
    } catch (error) {
        res.status(500).send({ error: 'Error', message: 'No se pudo actualizar la reserva' });
    }
};

const deleteReservation = async (req, res) => {
    const { reservationId } = req.params;

    try {
        const reserva = await reservasService.getBy({_id:reservationId})
        if(!reserva) return res.status(404).send({error:"Error", message: "Reserva no encontrada"})
        const result = await reservasService.delete(reserva);
        res.send({ status: 'success', payload: result });
    } catch (error) {
        res.status(500).send({ error: 'Error', message: 'No se pudo eliminar la reserva' });
    }
};

module.exports = {
    getAllReservas,
    getReserva,
    reserveSpot,
    updateReservation,
    deleteReservation
};
