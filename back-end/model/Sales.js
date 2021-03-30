const connection = require('../connection/connection');

// Find All sales
const getAll = async () => {
  const [sales] = await connection.execute('SELECT * FROM Trybeer.sales');

  return sales;
};

// Find Sales by ID
const getById = async (userId) => {
  const [[sale]] = await connection
    .execute(`SELECT s.id AS saleId,
      s.sale_date AS saleDate,
      s.total_price AS saleTotal,
      s.status AS saleStatus
      FROM Trybeer.sales s
      WHERE id = ?`, [userId]);
  return sale;
};

// Find All sales by UserID
const getByUserId = async (userId) => {
  const [sales] = await connection
    .execute(`SELECT s.id AS saleId,
      s.sale_date AS saleDate,
      s.total_price AS saleTotal,
      s.status AS saleStatus
      FROM Trybeer.sales s
      WHERE user_id = ? ORDER BY id`, [userId]);
  return sales;
};

// Find All Sale Products by SaleID
const getSalesProductsBySaleId = async (saleId) => {
  const sale = await getById(saleId);
  const [products] = await connection
    .execute(`SELECT p.id AS productId,
      p.name AS productName,
      p.price AS productPrice,
      sp.quantity AS quantity
      FROM Trybeer.sales_products AS sp
      JOIN Trybeer.products AS p
      ON p.id = sp.product_id
      WHERE sp.sale_id = ?`, [saleId]);
    const saleProducts = { sale, products };
  return saleProducts;
};

// Store request
const storeRequest = async (userId, totalPrice, address, number) => {
  const [sales] = await connection
    .execute(
      `INSERT INTO Trybeer.sales
      (user_id, total_price, delivery_address, delivery_number, sale_date, status)
      VALUES (?, ?, ?, ?, CURRENT_DATE(), 'Pendente')`, [userId, totalPrice, address, number],
    );
  return sales;
};

const storeSaleProducts = async (saleId, productId, quantity) => {
  const [sales] = await connection
    .execute('INSERT INTO Trybeer.sales_products VALUES (?, ?, ?)', [saleId, productId, quantity]);

  return sales;
};

// Update name
const updateStatus = async (id, status) => {
  const [sale] = await connection
    .execute('UPDATE Trybeer.sales SET status = ? WHERE id = ?', [status, id]);

  return sale;
};

module.exports = {
  getAll,
  getById,
  getByUserId,
  getSalesProductsBySaleId,
  storeRequest,
  storeSaleProducts,
  updateStatus,
};