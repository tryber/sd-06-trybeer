const axios = require('axios');

const baseUrl = 'http://localhost:3001';

const generateToken = async (email, password) => axios
  .post(`${baseUrl}/login`, {
    email,
    password,
  })
  .then((res) => ({ response: res.data, result: true }))
  .catch((err) => ({ response: err.response.data, result: false }));

const registerUser = async (name, email, password, role) => axios
  .post(`${baseUrl}/user`, {
    name,
    email,
    password,
    role,
  })
  .then((res) => ({ response: res.data, result: true }))
  .catch((err) => ({ response: err.response.data, result: false }));

const updateNameOfUser = async (name, email) => axios
  .put(`${baseUrl}/user`, {
    name,
    email,
  })
  .then((res) => ({ response: res.data, result: true }))
  .catch((err) => err.response.data);

const getAllProducts = async (token) => axios
  .get(`${baseUrl}/products`, {
    headers: {
      authorization: token,
    },
  })
  .then((res) => res.data)
  .catch((err) => err.response.data);

const getAllOrders = async (token) => axios
  .get(`${baseUrl}/admin/orders`, {
    headers: {
      authorization: token,
    },
  })
  .then((res) => res.data)
  .catch((err) => err.response.data);

const getOrdersByIdUser = async (id, token) => axios
  .get(`${baseUrl}/orders/${id}`, {
    headers: {
      authorization: token,
    },
  })
  .then((res) => res.data)
  .catch((err) => err.response.data);

const getOrderById = async (id, token) => axios
  .get(`${baseUrl}/orders/${id}`, {
    headers: {
      authorization: token,
    },
  })
  .then((res) => res.data)
  .catch((err) => err.response.data);

const regSalesProducts = async (params) => {
  const { idSale, idProduct, quantity } = params;
  return axios.post(`${baseUrl}/sales/products`, {
    idSale, idProduct, quantity })
    .then((res) => ({ response: res.data, result: true }))
    .catch((err) => ({ response: err.response.data, result: false }));
};

const registerSales = async (params) => {
  const { userId, total, address, adNumber, date, status } = params;
  return axios.post(`${baseUrl}/sales`, {
    userId, total, address, adNumber, date, status,
  })
    .then((res) => ({ response: res.data, result: true }))
    .catch((err) => ({ response: err.response, result: false }));
};

module.exports = {
  generateToken,
  registerUser,
  updateNameOfUser,
  getAllProducts,
  getAllOrders,
  regSalesProducts,
  registerSales,
  getOrdersByIdUser,
  getOrderById,
};
