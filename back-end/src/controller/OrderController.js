const rescue = require('express-rescue');

const { OrderService } = require('../service');

const getAllOrders = rescue(async (req, res) => {
  const orders = await OrderService.getOrdersById(); 

  return res
    .status(200)
    .json(orders);
});

const getOrdersById = rescue(async (req, res) => {
  const { id } = req.params;

  const orders = await OrderService.getAllOrders(id);

  return res
    .status(200)
    .json(orders);
});

module.exports = {
  getOrdersById,
  getAllOrders,
};
