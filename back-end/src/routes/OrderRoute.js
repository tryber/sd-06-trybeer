const { Router } = require('express');

const { OrderController } = require('../controller');
//  { authorization } = require('../middleware');

const OrderRoute = Router();

OrderRoute.get('/:id', 
  OrderController.getOrdersByIdSale);

OrderRoute.get('/all/:id',  
  OrderController.getAllOrdersUserById);

module.exports = OrderRoute;
