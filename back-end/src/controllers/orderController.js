const { Router } = require('express');
const Service = require('../services/orderService');

const orderRouter = Router();

orderRouter.post('/', async (req, res) => {
  const { userID, value, street, number, date } = req.body;
  await Service.create({ userID, value, street, number, date });
  res.status(200).json(userID, value, street, number, date);
});

module.exports = orderRouter;