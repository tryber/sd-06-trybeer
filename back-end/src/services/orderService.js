const Model = require('../models/orderModel');

const create = async ({ userID, value, street, number, date }) => {
  const orders = await Model.create({ userID, value, street, number, date });
  return orders;
};

module.exports = { create };
