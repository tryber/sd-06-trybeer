const connection = require('./connection');
// const obj = { id: 1, sale_date: '26/03', total_price: 2.20 };

const getAllOrders = async () => {
  const orders = await connection.execute(
    'SELECT * FROM Trybeer.sales;',
  );
  return orders;
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
