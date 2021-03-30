const allOrdersAdmin = require('../models/adminOrderModel');

const getAllOrders = async () => allOrdersAdmin();

module.exports = getAllOrders;