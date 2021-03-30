const connection = require('./connections');

const allOrdersAdmin = async () => {
  try {
   const orders = await connection.execute('SELECT * FROM sales');
   return orders[0];
  } catch (e) {
    return 'erro interno';
  }
};

module.exports = allOrdersAdmin;