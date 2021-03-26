const rescue = require('express-rescue');

const { OrderService } = require('../service');
const { OrderModel } = require('../model');

const getAllOrdersByIdUser = rescue(async (req, res) => {
  const { id } = req.params;
  const orders = await OrderModel.getAllOrdersByIdUser(id);  
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
