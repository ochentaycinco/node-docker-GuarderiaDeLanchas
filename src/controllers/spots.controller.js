const { spotService } = require("../services/index.js")

const getSpots = async (req, res) => {
    try {
        const availableSpots = await spotService.getAvailableSpots()
        res.send({status:"success", payload: availableSpots})
    } catch (error) {
        res.status(500).send({error:"Error", message: "No se pudieron obtener las plazas disponibles"})
    }
}

const updateSpotStatus = async (req, res) => {
    const { spotNumber } = req.params;
    const { status } = req.body; 

    if (!status || !['ocupado', 'disponible'].includes(status)) {
        return res.status(400).send({ error: 'Error', message: 'Estado inválido' });
    }

    try {
        const result = await spotService.updateSpotStatus(spotNumber, status);
        res.send({ status: 'success', payload: result });
    } catch (error) {
        res.status(500).send({ error: "Error", message: "No se pudo actualizar el estado del lugar" });
    }
}

module.exports = {
    getSpots,
    updateSpotStatus
}