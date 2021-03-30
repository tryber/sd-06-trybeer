const connection = require('./connections');

const allOrdersAdmin = async () => {
  try {
   const orders = await connection.execute('SELECT * FROM sales');
   return orders[0];
  } catch (e) {
    return 'erro interno';
  }
};
const getOrdersAdminById = async (id) => {
  try {
   const orders = await connection.execute('SELECT SP.sale_id, SP.quantity,'
   +' P.name, P.price, S.total_price, S.status FROM sales_products AS SP  '
   +'INNER JOIN products As P ON P.id = SP.product_id INNER JOIN sales AS S'
   +' ON S.id = SP.sale_id where SP.sale_id =?;', [id]);
   return orders[0];
  } catch (e) {
    return 'erro interno';
  }
};
const adminOrderUpdateById = async (status, id) => {
  try {
    await connection.execute('UPDATE sales SET status=? WHERE id=?', [status, id]);
    return true;
  } catch (e) {
    return e.message;
  }
};

module.exports = {
  allOrdersAdmin,
  getOrdersAdminById,
  adminOrderUpdateById,
 };