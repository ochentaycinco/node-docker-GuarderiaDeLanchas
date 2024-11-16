const {Router} = require('express')
const shopController = require('../controllers/shop.controller.js')
const router = Router()

router.get('/', shopController.getProducts)
router.get('/:category', shopController.getByCategory)
router.get('/product/:productId', shopController.viewProduct)
router.post('/add', shopController.addProduct)

module.exports = router