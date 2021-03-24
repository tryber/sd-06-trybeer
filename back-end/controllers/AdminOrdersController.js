const { Router } = require('express');
const { getOrder, allOrders } = require('../services/AdminOrdersService');

const AdminOrdersController = new Router();

AdminOrdersController.get('/', allOrders);
AdminOrdersController.get('/:id', getOrder);

module.exports = AdminOrdersController;