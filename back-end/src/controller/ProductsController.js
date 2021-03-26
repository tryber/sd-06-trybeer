const rescue = require('express-rescue');

const { ProductsService } = require('../service');

const listProducts = rescue(async (_req, res) => {
  const getAllProducts = await ProductsService.getAllProducts();
console.log(getAllProducts);
  return res
    .status(200)
    .json(getAllProducts);
});

module.exports = {
  listProducts,
};
