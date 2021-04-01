const CONTENT_TYPE = 'application/json';

const createToken = async (email, password) => {
  const res = await fetch('http://localhost:3001/user/get-data', {
    method: 'POST',
    headers: {
      'Content-Type': CONTENT_TYPE,
    },
    body: JSON.stringify({ email, password }),
  }).then((result) => result.json());

  if (res.message) return false;

  const { name, email: fetchedEmail, role, id } = res.user;
  const { token } = res;
  const formattedUser = { name, email: fetchedEmail, token, role, id };

  return formattedUser;
};

const addUser = async (name, email, password, check) => {
  const res = await fetch('http://localhost:3001/user/create', {
    method: 'POST',
    headers: {
      'Content-Type': CONTENT_TYPE,
    },
    body: JSON.stringify({
      name,
      email,
      password,
      role: (check ? 'administrator' : 'client') }),
  }).then((result) => result.json());
  if (res.message) return false;
  return res;
};

const getProducts = async () => {
  const res = await fetch('http://localhost:3001/products', {
    method: 'GET',
    headers: {
      'Content-Type': CONTENT_TYPE,
    },
  }).then((result) => result.json());

  if (res.message) return false;

  return res;
};

const validateUserToken = async (token) => {
  if (!token) return false;
  const validateUser = await fetch('http://localhost:3001/user/decodeToken', {
    method: 'POST',
    headers: {
      'Content-Type': CONTENT_TYPE,
    },
    body: JSON.stringify({ token }),
  }).then((result) => result.json());

  if (validateUser.message) return false;

  return true;
};

const updateUserName = async (name, email) => {
  const res = await fetch('http://localhost:3001/user/update', {
    method: 'PUT',
    headers: {
      'Content-Type': CONTENT_TYPE,
    },
    body: JSON.stringify({ name, email }),
  }).then((result) => result);
  return res;
};

const getOrdersByUserId = async (id) => {
  const res = await fetch(`http://localhost:3001/orders/${id}`)
    .then((result) => result.json());

  if (res.message) return [];
  return res;
};

const getAllOrders = async () => {
  const res = await fetch('http://localhost:3001/orders/all')
    .then((result) => result.json());

  if (res.message) return [];
  return res;
};

const addProductId = (cart, productList) => {
  const cartWithId = cart.map((product) => {
    product.productId = productList
      .find((productInList) => productInList.name === product.name).id;
    return product;
  });
  return cartWithId;
};

const sendOrder = async (cart, user, productList) => {
  const cartWithId = addProductId(cart, productList);
  await fetch('http://localhost:3001/orders/addOrder', {
    method: 'POST',
    headers: {
      'Content-Type': CONTENT_TYPE,
    },
    body: JSON.stringify({ cartWithId, user }),
  });
};

const getOrderProducts = async (id) => {
  const response = await fetch(`http://localhost:3001/orders/products/${id}`)
    .then((result) => result.json());

  if (response.message) return [];
  return response;
};

const changeStatus = async (id) => {
  await fetch(`http://localhost:3001/orders/changeStatus/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': CONTENT_TYPE,
    },
  });
};

const API = {
  createToken,
  addUser,
  getProducts,
  validateUserToken,
  updateUserName,
  getOrdersByUserId,
  sendOrder,
  getAllOrders,
  getOrderProducts,
  changeStatus,
};

module.exports = API;
