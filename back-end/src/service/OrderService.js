const { OrderModel } = require('../model');

// const getAllOrders = async () => OrderModel.getAllOrders();

const getOrdersByIdSale = async (idSale) => OrderModel.getOrdersByIdSale(idSale);

module.exports = {
  getOrdersByIdSale,
  // getAllOrders,
};
