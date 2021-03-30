const { getAllProducts, getProductById } = require('../models/productModel');

const findAllProducts = async () => getAllProducts();
const getProductsById = async(id) => getProductById(id)

module.exports = {
  findAllProducts,
  getProductsById,
};
