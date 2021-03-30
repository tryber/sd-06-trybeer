const connection = require('./connection');

const paramsSql = 'user_id, total_price, delivery_address, delivery_number, sale_date, status';

const registerSale = async (params) => {
  const [{ insertId }] = await connection.execute(
    `INSERT INTO Trybeer.sales (${paramsSql}) VALUES (?,?,?,?,?,?)`,
    [
    params.userId, 
    params.total, 
    params.address,
    params.adNumber, 
    params.date,
    params.status],
  );

  return {
    ok: true,
    id: insertId,
  };
};

const regSalesProducts = async (params) => {
const fieldSalesP = 'sale_id, product_id, quantity';
 await connection.execute(
    `INSERT INTO Trybeer.sales_products (${fieldSalesP}) VALUES (?,?,?)`,
    [params.idSale, params.idProduct, params.quantity],
  );
  return {
    messasge: 'Compra realizada com sucesso!',
  };
};

module.exports = { registerSale, regSalesProducts };
