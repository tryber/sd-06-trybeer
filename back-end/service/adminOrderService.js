const { allOrdersAdmin, getOrdersAdminById, adminOrderUpdateById } = require('../models/adminOrderModel');

const getAllOrders = async () => allOrdersAdmin();
const getOrderAdminById = async (id) => getOrdersAdminById(id);
const AdminOrdersUpdate = async (status, id) => adminOrderUpdateById(status, id);

module.exports = {
  getAllOrders,
  getOrderAdminById,
  AdminOrdersUpdate,
};