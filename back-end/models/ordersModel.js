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
    const [product] = await connection
    .execute('SELECT sale_id, product_id, quantity FROM sales_products WHERE sale_id=?', [saleId]);
    
    return product;
  } catch (e) {
    return 'erro interno';
  }
};

module.exports = { getOrder, getDetailOrder };