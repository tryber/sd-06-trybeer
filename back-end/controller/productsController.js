const { Router } = require('express');
const { findAllProducts } = require('../service/productService');

const productsController = Router();

const SUCCESS = 200;

productsController.get('/', async (_req, res) => {
  const allproducts = await findAllProducts();
  return res.status(SUCCESS).json(allproducts[0]);
});

module.exports = productsController;
