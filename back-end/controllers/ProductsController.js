const { Router } = require('express');
const { getProducts } = require('../models/Products');

const ProductsController = new Router();

const SUCCESS = 200;
const BAD_REQUEST = 400;

ProductsController.get('/', async (_req, res) => {
  const products = await getProducts();
  
  if (!products) {
    return res.status(BAD_REQUEST).json({ message: 'Produtos não encontrados.' }); 
  }
  
  res.status(SUCCESS).json(products);
});

module.exports = ProductsController;
