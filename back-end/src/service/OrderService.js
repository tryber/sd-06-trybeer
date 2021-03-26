const { OrderModel } = require('../model');

const getAllOrdersByIdUser = async (idUser) => OrderModel.getAllOrdersByIdUser(idUser);

const getOrdersByIdSale = async (idSale) => OrderModel.getOrdersByDetails(idSale);

module.exports = {
  getOrdersByIdSale,
 getAllOrdersByIdUser,
};
