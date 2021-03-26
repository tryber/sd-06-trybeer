const { OrderModel } = require('../model');

// const getAllOrders = async () => OrderModel.getAllOrders();

const getOrdersByIdSale = async (id) => OrderModel.getOrdersByDetails(id);

module.exports = {
  getOrdersByIdSale,
  // getAllOrders,
};
