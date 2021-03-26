const connection = require('./connection');

const getAllOrdersByIdUser = async (idUser) => {
  const [orders] = await connection.execute(
    `SELECT id, total_price, date_format(sale_date, '%d/%m') AS sale_date
FROM sales WHERE  user_id =?`, [idUser],
  );
  return orders;
};

const getOrdersByDetails = async (id) => {
  const [orders] = await connection.execute(
    `SELECT 
      SP.sale_id AS saleId,
      date_format(S.sale_date, '%d/%m')  AS saleDate,
      SP.quantity AS productQuantity,
      P.name AS productName,
      P.price AS productPrice,
      S.total_price AS totalPrice
    FROM Trybeer.sales AS S
    INNER JOIN Trybeer.sales_products AS SP ON S.id = SP.sale_id
    INNER JOIN Trybeer.products AS P ON P.id = SP.product_id
    WHERE SP.sale_id=?`, [id],
  );

  return orders;
};

module.exports = {
 getAllOrdersByIdUser,
  getOrdersByDetails,
};
