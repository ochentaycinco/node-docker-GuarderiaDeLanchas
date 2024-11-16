const { Router } = require( 'express')
const vehicleController = require('../controllers/vehicle.controller.js')
const protect = require('../middlewares/auth.js')
const router = Router()

router.get('/:uid/vehicles', protect, vehicleController.getAllVehicles)
router.get('/users/:userId/:patente', protect, vehicleController.getMyVehicle)
router.post('/users/:uid/vehicles', protect, vehicleController.addVehicle)
router.put('/update/:patente', protect, vehicleController.updateVehicle)
router.delete('/:patente', protect, vehicleController.deleteVehicle)

module.exports = router