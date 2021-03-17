const { Router } = require('express');
const productsServices = require('../services/productsServices');
const { ok } = require('../utilities/variables');

const controllerRouter = Router();

// Get all users
controllerRouter.get('/get-all', async (req, res) => {
   const products = await productsServices.getAll();
   res.status(ok).json(products);
});

module.exports = controllerRouter;