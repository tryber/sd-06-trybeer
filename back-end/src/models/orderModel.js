const connection = require('../database/connection');

const create = async ({ userID, value, street, number, date }) => {
  try {
    await connection.execute(
      `INSERT INTO sales
        (user_id, total_price, delivery_address, delivery_number, sale_date, status)
        VALUES (?, ?, ?, ?, ?, ?)`,
      [userID, value, street, number, date, 'Pendente'],
    );
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  create,
};
