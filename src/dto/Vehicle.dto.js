class VehicleDTO {
    static getVehicleFrom = (vehicle) =>{
        return {
            patente:vehicle.patente,
            type:vehicle.type,
            model:vehicle.model,
            owner:vehicle.owner
        }
    }
    static getVehiclesFrom(vehicles) {
        return vehicles.map(vehicle => ({
            patente: vehicle.patente,
            type: vehicle.type,
            model: vehicle.model
        }));
    }
}

module.exports = {
    VehicleDTO
}