const { Router } = require('express');
const { getOrders, getDetailOrders } = require('../service/orderService');
const { getIdByMail } = require('../service/checkoutService');
const { checkAuthorization } = require('../middleware/checkAuthorization');

const orderController = Router();

const SUCCESS = 200;

orderController.get('/', checkAuthorization, async (req, res) => {
  const { email } = req.payload;
  const [[{ id: userId }]] = await getIdByMail(email);
  const userOrder = await getOrders(userId);
  // const getOrder = await getDetailOrders(userOrder.id);
  res.status(SUCCESS).json(userOrder);
});

orderController.get('/:id', async (req, res) => {
  const { id } = req.params;
  const reqOrder = await getDetailOrders(id);
  res.status(SUCCESS).json(reqOrder);
});

module.exports = orderController;