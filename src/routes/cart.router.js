const {Router} = require('express')
const cartController = require('../controllers/cart.controller.js')
const router = Router()

router.get('/:userId', cartController.getCart)
router.post('/add/:userId', cartController.addToCart)
router.put('/', cartController.removeFromCart)
router.delete('/:userId', cartController.clearCart)

module.exports = router