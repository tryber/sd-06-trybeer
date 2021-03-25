const rescue = require('express-rescue');

const { OrderService } = require('../service');

const getAllOrdersUserById = rescue(async (req, res) => {
 const { id } = req.params;
  console.log(id);
  const [orders] = await OrderService.getAllOrdersUserById(id); 

  return res
    .status(200)
    .json(orders);
});

const getOrdersByIdSale = rescue(async (req, res) => {
  const { id } = req.params; 
  const [orders] = await OrderService.getOrdersByIdSale(id);  
  return res
    .status(200)
    .json(orders);
});

module.exports = {
  getOrdersByIdSale,
 getAllOrdersUserById,
};
