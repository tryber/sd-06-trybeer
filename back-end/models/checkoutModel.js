const connection = require('./connections');

const checkOrders = async (sale) => {
  const date = new Date();
  const trustedDate = `${date.getUTCFullYear()}/${date.getUTCMonth() + 1}/${date.getUTCDate()}`;
  // sale.saleDate = trustedDate;
  const { userId, totalPrice, deliveryAddress, deliveryNumber, status } = sale;
  const [{ insertId }] = await connection
    .execute('INSERT INTO sales (user_id,total_price,'
      + ' delivery_address ,delivery_number , sale_date , status) VALUES(?,?,?,?,?,?)',
      [userId, totalPrice, deliveryAddress, deliveryNumber, trustedDate, status]); 
  return insertId;
  // pinserir e pegar o id.
};
const insertSaleProducts = async (id, productId, quantity) => connection
    .execute('INSERT INTO sales_products (sale_id, product_id, quantity) VALUES(?,?,?)',
      [id, productId, quantity]);

const getIdByEmail = async (email) => connection
  .execute('SELECT id FROM users WHERE email=?', [email]);

const getProduct = async (prodId) => connection
  .execute('SELECT id, name, price FROM products WHERE id=?', [prodId]);
module.exports = { checkOrders, insertSaleProducts, getIdByEmail, getProduct };