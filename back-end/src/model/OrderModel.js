const connection = require('./connection');

const getOrdersById = async (id) => {
  const orders = connection.execute(
    `SELECT 
      SP.sale_id AS saleId,
      S.sale_date AS saleDate,
      SP.quantity AS productQuantity,
      P.name AS productName,
      P.price AS productPrice,
      S.total_price AS totalPrice,
      S.status AS productStatus
    FROM Trybeer.sales AS S
    INNER JOIN Trybeer.sales_products AS SP ON S.id = SP.sale_id
    INNER JOIN Trybeer.products AS P ON P.id = SP.product_id
    WHERE SP.sale_id=?`, [id],
  );

  return orders;
};

const updateStatusOrder = async (status, id) => {
  await connection.execute(
  'UPDATE Trybeer.sales SET status=? WHERE id=?', [status, id],
  );
  
  return {
    message: 'Atualizado com sucesso!',
  };
};

const getAllOrders = async () => {
  const orders = connection.execute(
    'SELECT * FROM Trybeer.sales;',
  );
  return orders;
};

const getAllOrdersByUser = async (id) => {
  const orders = connection.execute(
    'SELECT * FROM Trybeer.sales WHERE user_id=?;', [id],
  );

  return orders;
};

module.exports = {
  getAllOrdersByUser,
  updateStatusOrder,
  getOrdersById,
  getAllOrders,
};
