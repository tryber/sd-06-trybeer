const { Router } = require('express');

const { OrderController } = require('../controller');
// const { authorization } = require('../middleware');

const OrderRoute = Router();

OrderRoute.get('/', 
  OrderController.getOrdersByIdSale);

OrderRoute.get('/:id',
  OrderController.getAllOrdersUserById);

module.exports = OrderRoute;
