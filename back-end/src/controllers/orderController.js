const orderRouter = require('express').Router();
const Service = require('../services/orderService');
const httpStatusCode = require('../utils/httpStatusCode');
// const httpResponse = require('../utils/httpResponses');
const { OK } = require('../utils/httpStatusCode');

// Create a user
orderRouter.post('/', async (req, res, next) => {
  const { userID, totalPrice, deliveryAddress, deliveryNumber, saleDate } = req.body;
  const createdSale = await Service.create({
    userID, totalPrice, deliveryAddress, deliveryNumber, saleDate });
  if (createdSale.error) {
    return next({ statusCode: httpStatusCode.BAD_REQUEST, errorMessage: createdSale.message });
  }
  res.status(OK).json({
    id: createdSale.insertId, userID, totalPrice, deliveryAddress, deliveryNumber, saleDate });
});

module.exports = orderRouter;
