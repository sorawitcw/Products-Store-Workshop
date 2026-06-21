const express = require('express')
const router = express.Router()
const orderController = require('../controllers/order.controller')
const { verifyToken } = require('../middlewares/verify.middleware')

router.post('/', verifyToken, orderController.createOrder)
router.get('/',  orderController.getAllOrders)
router.get('/:id',  orderController.getOrderById)
router.get('/customer/:customerId', orderController.getOrdersByCustomer)

module.exports = router
