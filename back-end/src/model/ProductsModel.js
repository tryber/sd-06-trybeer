const connection = require('./connection');

const getAllProducts = async () => {
 const [listProducts] = await connection.execute('SELECT * from Trybeer.products');
  return listProducts;
};

module.exports = {
  getAllProducts,
};