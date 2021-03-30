const { Router } = require('express');
const { getAllOrders, getOrderAdminById, AdminOrdersUpdate } = require('../service/adminOrderService');
const { checkAuthorization } = require('../middleware/checkAuthorization');

const adminOrdersController = Router();

const SUCCESS = 200;

adminOrdersController.get('/', checkAuthorization, async (_req, res) => {
  const allOrders = await getAllOrders();
  res.status(SUCCESS).send(allOrders);
});
adminOrdersController.get('/:id', checkAuthorization, async (req, res) => {
  const { id } = req.params;
  const data = await getOrderAdminById(id);
  res.status(SUCCESS).json(data);
});
adminOrdersController.put('/:id', async (req, res) => {
const { id } = req.params;
const { status } = req.body;
await AdminOrdersUpdate(status, id);
res.status(201).end();
})
module.exports = adminOrdersController;
