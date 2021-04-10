const connection = require('../database/connection');

// Create a user
const createSale = async ({ userID, totalPrice, deliveryAddress, deliveryNumber, saleDate }) => {
  try {
    const [sale] = await connection.execute(
      `INSERT INTO sales
        (user_id, total_price, delivery_address, delivery_number, sale_date, status)
        VALUES (?, ?, ?, ?, ?, ?)`,
      [userID, totalPrice, deliveryAddress, deliveryNumber, saleDate, 'Pendente'],
    );
    return sale;
  } catch (err) {
    console.error(err);
    return null;
  }
};

module.exports = { createSale };
