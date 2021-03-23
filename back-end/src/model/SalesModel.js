const connection = require('./connection');

const registerSale = async (params) => {
const paramsSql = 'user_id, total_price, delivery_address, delivery_number, sale_date, status';
const { userId, total, address, adNumber, date, status } = params;
  const [{ insertId }] = await connection.execute(
    `INSERT INTO Trybeer.sales (${paramsSql}) VALUES (?,?,?,?,?,?)`,
    [userId, total, address, adNumber, date, status],  
);
  return {
    ok: true,
    id: insertId,
  };
};

const regSalesProducts = async (params) => {
const fieldSalesP = 'sale_id, product_id, quantity';
const { idSale, idProduct, quantity } = params;
 await connection.execute(
    `INSERT INTO Trybeer.sales_products (${fieldSalesP}) VALUES (?,?,?)`,
    [idSale, idProduct, quantity],
  );
  return {
    ok: true,
  };
};

module.exports = { registerSale, regSalesProducts };
