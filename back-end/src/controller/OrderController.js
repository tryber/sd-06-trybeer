const rescue = require('express-rescue');

const { OrderService } = require('../service');

const getAllOrdersByIdUser = rescue(async (req, res) => {
  const { id } = req.params;
  console.log(req.headers.authorization);
  const orders = await OrderService.getAllOrdersByIdUser(id);  
  return res
    .status(200)
    .json(orders);
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
 getAllOrdersByIdUser,
};
