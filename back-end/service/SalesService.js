const salesModel = require('../model/Sales');

// Return all sales
const getAll = async () => {
  const sales = await salesModel.getAll();
  return sales;
};

// Return Sale by UserID
const getByUserId = async (userId) => {
  const sales = await salesModel.getByUserId(userId);
  return sales;
};

// Return Sale Products by SaleID
const getSalesProductsBySaleId = async (saleId) => {
  const saleProducts = await salesModel.getSalesProductsBySaleId(saleId);
  return saleProducts;
};

// store request
const storeRequest = async (userId, totalPrice, address, number) => {
  const sales = await salesModel.storeRequest(userId, totalPrice, address, number);
  return sales;
};

// store sales products
const storeSaleProducts = async (saleId, productId, quantity) => {
  const sales = await salesModel.storeSaleProducts(saleId, productId, quantity);
  return sales;
};

// Update status
const updateStatus = async (id, status) => {
  const sale = await salesModel.updateStatus(id, status);
  return sale;
};

module.exports = {
  getAll,
  getByUserId,
  getSalesProductsBySaleId,
  storeRequest,
  storeSaleProducts,
  updateStatus,
};
