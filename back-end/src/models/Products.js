const connection = require('./connection');

const getAll = async () => {
  const [products] = await connection 
    .execute('SELECT * FROM products');
  return products;
};

const createProduct = async (name, price, urlImage) => {
  await connection
    .execute(`INSERT INTO products
    (name, price, url_image)
    VALUES (?, ?, ?)`,
    [name, price, urlImage]);
};

module.exports = {
  getAll,
  createProduct,
};
