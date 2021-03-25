const { OrderModel } = require('../model');

const getAllOrders = async (id) => OrderModel.getAllOrders(id);

const getOrdersByIdSale = async (idSale) => OrderModel.getOrdersByIdSale(idSale);

module.exports = {
  getOrdersByIdSale,
 getAllOrders,
};
