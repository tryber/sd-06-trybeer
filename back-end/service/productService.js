const getAllProducts = require('../models/productModel');

const findAllProducts = async () => getAllProducts();

module.exports = findAllProducts;
