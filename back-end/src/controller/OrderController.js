const rescue = require('express-rescue');

const { OrderService } = require('../service');

const getAllOrders = rescue(async (req, res) => {
  const [orders] = await OrderService.getAllOrders();
  console.log(orders);
const saled = 'sale_date';
const total = 'total_price';
  const lista = [{ id: 1, [saled]: '2021-03-26 11:28:46', [total]: '2.20' }];
  return res
    .status(200)
    .json(lista);
});
const getOrdersByIdSale = rescue(async (req, res) => {
  const { id } = req.params;
console.log(id);
  const orders = await OrderService.getOrdersByIdSale(id); 
console.log(orders);

  return res
    .status(200)
    .json(orders);
});

module.exports = {
  getOrdersByIdSale,
  getAllOrders,
};
