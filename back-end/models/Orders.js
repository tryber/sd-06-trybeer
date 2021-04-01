const connection = require('./connection');

const saveOrder = async ({ userId, totalPrice, deliveryAddress, deliveryNumber }) => {
  const date = new Date();

  const [{ insertId }] = await connection.execute(
    `INSERT INTO sales (user_id, total_price, 
      delivery_address, delivery_number, sale_date, status) VALUES (?, ?, ?, ?, ?, ?)`,
    [userId, totalPrice, deliveryAddress, deliveryNumber, date, 'Pendente'],
  );

  return insertId;
};

const saveOrderItems = async (userId, productId, quantity) => {
  await connection.execute(
    'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
    [userId, productId, quantity],
  );
};

const salesFormatter = (sales) => (
  sales.map(({
    delivery_address: address,
    delivery_number: number,
    sale_date: date,
    total_price: total,
    user_id: userId,
    id,
    status,
  }) => ({
    address,
    number,
    date,
    total,
    user: userId,
    orderId: id,
    status,
  }))
);

const getOrdersByUserId = async (userId) => {
  const [sales] = await connection
    .execute('SELECT * FROM sales WHERE user_id=? ORDER BY id', [userId]);

  return salesFormatter(sales);
};

const getAllOrders = async () => {
  const [sales] = await connection.execute('SELECT * FROM sales ORDER BY id');
  
  return salesFormatter(sales);
};

const getOrderProductsById = async (orderId) => {
  const [orderProducts] = await connection.execute(`SELECT * FROM sales_products 
  INNER JOIN products ON sales_products.product_id = products.id 
  INNER JOIN sales ON sales_products.sale_id = sales.id WHERE sale_id = ?`, [orderId]);

  const formattedOrder = orderProducts.map(({
    id, name, price, status, quantity,
    sale_date: date, total_price: total,
  }) => ({
    id,
    name,
    price,
    quantity,
    date,
    total,
    status,
  }));

  return formattedOrder;
};

const changeStatus = async (id) => {
  await connection.execute(
    'UPDATE sales SET status="Entregue" WHERE id=?', [id],
  );
};

module.exports = {
  saveOrder,
  saveOrderItems,
  getOrdersByUserId,
  getAllOrders,
  getOrderProductsById,
  changeStatus,
};
