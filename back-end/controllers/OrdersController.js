const { Router } = require('express');
const {
  saveOrder,
  saveOrderItems,
  getOrdersByUserId,
  getAllOrders,
  getOrderProductsById,
  changeStatus,
} = require('../models/Orders');

const OrdersController = new Router();
const SUCCESS = 200;
const BAD_REQUEST = 400;

OrdersController.post('/addOrder', async (req, res) => {
  const { cartWithId, user } = req.body;
  if (!cartWithId || !user) res.status(BAD_REQUEST).json({ message: 'Bad Request.' });

  const { id: userId, deliveryAddress, deliveryNumber } = user;
  const totalPrice = cartWithId.reduce((acc, curr) => acc + +curr.price, 0);
  
  const order = {
    userId,
    totalPrice,
    deliveryAddress,
    deliveryNumber,
  };
  
  const saleId = await saveOrder(order);

  await cartWithId.forEach(async ({ productId, quantity }) => {
    await saveOrderItems(saleId, productId, quantity);
  });
  res.status(SUCCESS);
});

OrdersController.get('/all', async (req, res) => {
  const orders = await getAllOrders();

  if (!orders) {
    return res.status(BAD_REQUEST).json({ message: 'Você não fez pedidos' }); 
  }

  res.status(SUCCESS).json(orders);
});

OrdersController.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  const orders = await getOrdersByUserId(userId);
  
  if (!orders) {
    return res.status(BAD_REQUEST).json({ message: 'Você não fez pedidos' }); 
  }

  res.status(SUCCESS).json(orders);
});

OrdersController.get('/products/:orderId', async (req, res) => {
  const { orderId } = req.params;

  const orderProducts = await getOrderProductsById(orderId);
  
  if (!orderProducts) {
    return res.status(BAD_REQUEST).json({ message: 'Pedido não existe.' }); 
  }

  res.status(SUCCESS).json(orderProducts);
});

OrdersController.put('/changeStatus/:id', async (req, res) => {
  const { id } = req.params;
 
  await changeStatus(id);
  
  res.status(SUCCESS);
});

module.exports = OrdersController;
