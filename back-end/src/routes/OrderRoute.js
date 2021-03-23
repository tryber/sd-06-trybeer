const { Router } = require('express');

const { OrderController } = require('../controller');
const { authorization } = require('../middleware');

const OrderRoute = Router();

OrderRoute.post('/client',
  OrderController.getOrdersById);

OrderRoute.get('/',
  authorization,
  OrderController.getAllOrders);

module.exports = OrderRoute;
