// const jwt = require('jsonwebtoken');
const { create, 
  insertSaleProduct, 
  getAll, 
  getById, 
  changeStatus,
} = require('../models/Sales');

// const secret = 'T1f7C0e8E1p9I8h8M';
const STATUS_OK = 200;
const STATUS_INTERNAL_SERVER_ERROR = 500;

const createSale = async (req, res, _next) => {
  try { 
    // const token = req.headers.authorization;
    // const decoded = jwt.verify(token, secret);
    // const { id: userId } = decoded.data;
    const userId = req.user.id;
    const { products, total, deliveryAddress, deliveryNumber } = req.body;
    const saleId = await create(userId, total, deliveryAddress, deliveryNumber);
    await Promise.all(products.map(async ({ id, quantity }) => {
      await insertSaleProduct(saleId, id, quantity);
    }));
    res.status(STATUS_OK).json({ message: `Sale ${saleId} created!` });
  } catch (error) {
    console.log(error.message);
    return res.status(STATUS_INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
  }
};

const getAllSales = async (req, res, _next) => {
  const sales = await getAll();
  const formatedSales = sales.map((sale) => ({
    id: sale.id,
    deliveryAddress: sale.delivery_address,
    deliveryNumber: sale.delivery_number,
    totalPrice: sale.total_price,
    saleDate: sale.sale_date,
    status: sale.status,
}));
  return res.status(STATUS_OK).json(formatedSales);
};

const getSaleById = async (req, res, _next) => {
  const { id } = req.params;
  const sale = await getById(id);
  return res.status(STATUS_OK).json(sale);
};

const changeSaleStatus = async (req, res, _next) => {
  const { id } = req.params;
  await changeStatus(id);
  return res.status(STATUS_OK).json({ status: 'Entregue' });
};

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
  changeSaleStatus,
};