const { OrderModel } = require('../model');

const getAllOrdersUserById = async () => OrderModel.getAllOrdersUserById();

const getOrdersByIdSale = async (idSale) => OrderModel.getOrdersByIdSale(idSale);

module.exports = {
  getOrdersByIdSale,
 getAllOrdersUserById,
};
