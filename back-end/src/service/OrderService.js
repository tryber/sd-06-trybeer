const { OrderModel } = require('../model');

const getAllOrders = async () => OrderModel.getAllOrders();

const getOrdersById = async (id) => OrderModel.getOrdersById(id);

module.exports = {
  getOrdersById,
  getAllOrders,
};
