const { Router } = require('express');

const { OrderController } = require('../controller');
const { authorization } = require('../middleware');

const OrderRoute = Router();

OrderRoute.get('/:id',
  authorization,
  OrderController.getOrdersById);

OrderRoute.get('/:id',
  authorization,
  OrderController.getAllOrders);

module.exports = OrderRoute;
