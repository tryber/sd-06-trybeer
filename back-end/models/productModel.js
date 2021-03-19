const connection = require('./connections');

const getAllProducts = async () => {
  try {
    return await connection
      .execute('SELECT * FROM products');
  } catch (e) {
    return null;
  }
};

module.exports = getAllProducts;
