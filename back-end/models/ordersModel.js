const connection = require('./connections');

const getOrder = async (userId) => {
  try {
    const [data] = await connection
      .execute('SELECT id, total_price, sale_date, delivery_address '
        + 'FROM sales WHERE user_id=?', [userId]);
    return data;
  } catch (e) {
    return 'erro interno';
  }
};

const getDetailOrder = async (saleId) => {
  try {
    const [product] = await connection.execute(
      'SELECT * FROM sales_products LEFT JOIN products ON products.id = sales_products'
        + '.product_id WHERE sale_id=?',
      [saleId],
      );
    console.log(product);
    return product;
  } catch (e) {
    return 'erro interno';
  }
};

module.exports = { getOrder, getDetailOrder };