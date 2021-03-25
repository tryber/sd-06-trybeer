const { Router } = require('express');

const { OrderController } = require('../controller');
const { authorization } = require('../middleware');

const OrderRoute = Router();

OrderRoute.get('/:id', 
authorization,
  OrderController.getOrdersByIdSale);

OrderRoute.get('/all/:id',
  authorization,
  OrderController.getAllOrdersUserById);

module.exports = OrderRoute;
