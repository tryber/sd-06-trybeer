const { Router } = require('express');

const { OrderController } = require('../controller');
// const { authorization } = require('../middleware');

const OrderRoute = Router();

OrderRoute.get('/:id', 
  OrderController.getOrdersByIdSale);

OrderRoute.get('/',
  OrderController.getAllOrders);

module.exports = OrderRoute;
