const {Users} = require("../dao/Users.dao.js");
const {Vehicle} = require('../dao/Vehicles.dao.js')
const {Reserva} = require('../dao/Reservas.dao.js')
const {Spot} = require('../dao/Spots.dao.js')
const {Product} = require('../dao/Products.dao.js')
const {Cart} = require('../dao/Cart.dao.js')
const {UserRepository} = require("../repository/userRepository.js");
const {VehicleRepository} = require("../repository/vehicleRepository.js");
const {ReservasRepository} = require('../repository/reservasRepository.js')
const {SpotRepository} = require('../repository/spotRepository.js');
const {ProductRepository} = require('../repository/productRepository.js')
const {CartRepository} = require('../repository/cartRepository.js')

const userService = new UserRepository(new Users())
const vehicleService = new VehicleRepository(new Vehicle())
const reservasService = new ReservasRepository(new Reserva())
const spotService = new SpotRepository(new Spot())
const productService = new ProductRepository(new Product())
const cartService = new CartRepository(new Cart())

module.exports = {
    userService,
    vehicleService,
    reservasService,
    spotService,
    productService,
    cartService
}