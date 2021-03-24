const { listAllOrders, getOrderByIdAdmin } = require('../models/AdminOrdersModel');
const { OK } = require('../utils/allStatusCode');

const allOrders = async (_req, res) => {
  const [ordersList] = await listAllOrders();
  return res.status(OK).json(ordersList);
};

const getOrder = async (req, res) => {
  const { id } = req.params;
  const [order] = await getOrderByIdAdmin(id);
  return res.status(OK).json(order);
};

module.exports = { allOrders, getOrder };