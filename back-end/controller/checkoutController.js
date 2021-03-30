const { Router } = require('express');
const { OrdersDone, salesProduct, getIdByMail } = require('../service/checkoutService');
const { checkAuthorization } = require('../middleware/checkAuthorization');

const checkoutController = Router();

const SUCCESS = 200;

checkoutController.post('/', checkAuthorization, async (req, res) => {
  const { sale, productsList } = req.body;
  const { email } = req.payload;
  const [[{ id: userId }]] = await getIdByMail(email);
  sale.userId = userId;
  const insertId = await OrdersDone(sale);
  
  productsList.map(async (product) => {
    const { product_id, quantity } = product;
    await salesProduct(insertId, product_id, quantity);
  });
  res.status(SUCCESS).json({ message: 'Compra realizada com sucesso!' });
});

module.exports = checkoutController;