const { OrderModel } = require('../model');

const getAllOrdersUserById = async (idUser) => OrderModel.getAllOrdersUserById(idUser);

const getOrdersByIdSale = async (idSale) => OrderModel.getOrdersByIdSale(idSale);

module.exports = {
  getOrdersByIdSale,
 getAllOrdersUserById,
};
