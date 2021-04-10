const Model = require('../models/orderModels');
const httpResponse = require('../utils/httpResponses');
// const validators = require('../utils/validationsEntries');

// Create a user
const create = async ({ userID, totalPrice, deliveryAddress, deliveryNumber, saleDate }) => {
  const saleCreated = await Model.createSale({
    userID, totalPrice, deliveryAddress, deliveryNumber, saleDate });
  if (!saleCreated || !saleCreated.insertId) return httpResponse.INVALID_DATA;
  
  return saleCreated;
};

module.exports = {
  create,
};
