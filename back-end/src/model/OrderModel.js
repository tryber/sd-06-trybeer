const connection = require('./connection');

const getAllOrders = async () => {
  const [orders] = connection.execute(
    'SELECT * FROM Trybeer.sales;',
  );

  return orders;
};

const getOrdersById = async (id) => {
  const [orders] = await connection.execute(
    `SELECT  S.user_id AS userId, S.id AS saleId, P.name AS productName,
SP.quantity AS productQuantity,  P.price productPrice, 
S.total_price AS totalPrice, date_format(S.sale_date, '%y/%m') AS saleDate
FROM Trybeer.sales AS S
INNER JOIN Trybeer.users AS U ON U.id = S.user_id
INNER JOIN Trybeer.sales_products AS SP ON S.id = SP.sale_id
INNER JOIN Trybeer.products AS P ON P.id = SP.product_id
WHERE U.id=?`, [id],
  );

  return orders;
};

module.exports = {
  getAllOrders,
  getOrdersById,
};
