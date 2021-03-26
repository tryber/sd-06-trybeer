const connection = require('./connection');

const getAllOrders = async () => {
  const orders = await connection.execute(
    'SELECT * FROM Trybeer.sales;',
  );
  console.log(orders);
const saled = 'sale_date';
const total = 'total_price';
  const lista = [{ id: 1, [saled]: '2021-03-26 11:28:46', [total]: '2.20' }];
  return lista;
};

const getOrdersByIdSale = async (idSale) => {
  const [orders] = await connection.execute(
    `SELECT S.id AS saleId, P.name AS productName,
SP.quantity AS productQuantity,  P.price AS productPrice, 
S.total_price AS totalPrice, date_format(S.sale_date, '%d/%m') AS saleDate
FROM Trybeer.sales AS S
INNER JOIN Trybeer.sales_products AS SP ON S.id = SP.sale_id
INNER JOIN Trybeer.products AS P ON P.id = SP.product_id
WHERE S.id=?`, [idSale],
  );

  return orders;
};

module.exports = {
  getAllOrders,
  getOrdersByIdSale,
};
