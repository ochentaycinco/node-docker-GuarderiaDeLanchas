const { Router } =require( 'express')
const userController = require('../controllers/user.controller.js')
const authController = require('../config/authController.js')
const protect = require('../middlewares/auth.js')
const router = Router()

router.get('/', userController.getAllUsers)
router.get('/:uid', userController.getUser)
router.post('/signup', authController.signUp)
router.post('/login', authController.login)
router.put('/:uid', protect, userController.updateUser)
router.delete('/:uid', protect, userController.deleteUser)

module.exports = router