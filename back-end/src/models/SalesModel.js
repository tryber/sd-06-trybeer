const connection = require('./connection');

const createSale = async (payload) => {
  const { user_id: userId, 
    total_price: totalPrice, 
    delivery_address: deliveryAddress, 
    delivery_number: deliveryNumber, 
    sale_date: saleDate, 
    status } = payload;
  
  const [response] = await connection
    .execute(`INSERT INTO sales
      (user_id, total_price, delivery_address, delivery_number, sale_date, status) 
      VALUES (?, ?, ?, ?, ?, ?)`, 
    [userId, 
      totalPrice, 
      deliveryAddress, 
      deliveryNumber, 
      saleDate, 
      status]);
  return response;
};

const getAllSales = async () => {
  const [sales] = await connection.execute('SELECT * FROM sales');
  return sales;
};

module.exports = {
  getAllSales,
  createSale,
};
