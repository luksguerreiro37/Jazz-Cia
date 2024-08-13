const express = require('express');
const router = express.Router();
const OrdersController = require('../controllers/Orders.controller');
const isAdminAuthenticated = require('../middlewares/isAdminAuthenticated');
const isClientAuthenticated = require('../middlewares/isClientAuthenticated');
const isAuthenticated = require('../middlewares/isAuthenticated');

router.get('/', isAdminAuthenticated, OrdersController.getAllOrders);

router.post('/', isClientAuthenticated, OrdersController.createOrder);

router.delete('/:orderId', isAuthenticated, OrdersController.deleteOrder);

router.patch('/:orderId/status', isAdminAuthenticated, OrdersController.updateOrderStatus);

module.exports = router;
