const { Router } = require('express')
const reservasController = require('../controllers/reservas.controller')
const spotController = require('../controllers/spots.controller.js')
const protect = require('../middlewares/auth.js')

const router = Router()

router.get('/all', reservasController.getAllReservas)
router.get('/:reservaId', reservasController.getReserva)
router.get('/spots', spotController.getSpots)
router.post('/:spotNumber/:userId/:patente', reservasController.reserveSpot)
router.put('/:reservationId/:userId', reservasController.updateReservation)
router.delete('/:reservationId', reservasController.deleteReservation)

module.exports = router