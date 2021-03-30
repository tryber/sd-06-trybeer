const { checkOrders, insertSaleProducts, getIdByEmail } = require('../models/checkoutModel');

const OrdersDone = async (sale) => checkOrders(sale);
// pegar valor id
/* const insertSales = (saleInfo, products) => {
  const result = OrdersDone(sale);// pode ter o id.
  const saleId = findLastSale(); // pegaria a ultima venda.
  insertSaleProducts(saleId, products);
} */
const salesProduct = async (id, productId, quantity) => insertSaleProducts(id, productId, quantity);

const getIdByMail = async (email) => getIdByEmail(email);

const getProduct = async (prodId) => getProduct(prodId);

module.exports = { OrdersDone, salesProduct, getIdByMail, getProduct };