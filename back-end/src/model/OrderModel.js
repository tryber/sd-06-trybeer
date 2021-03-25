const connection = require('./connection');

const getAllOrdersUserById = async (idUser) => {
  const orders = connection.execute(
    `SELECT  id, date_format(sale_date, '%d/%m') AS saleDate,
 total_price FROM Trybeer.sales WHERE user_id=?`, [idUser],
  );

  return orders;
};

const getOrdersByIdSale = async (idSale) => {
  const orders = connection.execute(
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
 getAllOrdersUserById,
  getOrdersByIdSale,
};
