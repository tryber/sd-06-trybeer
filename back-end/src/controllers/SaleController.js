const { Router } = require('express');
const status = require('../utils/statusDictionary');

const SalesService = require('../services/SalesService');

const salesRouter = new Router();

salesRouter.get('/', async (_req, res) => {
  const sales = await SalesService.getAllSales();
  res.status(status.SUCCESS).json(sales);
});

module.exports = salesRouter;