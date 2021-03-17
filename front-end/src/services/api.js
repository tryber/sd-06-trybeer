const axios = require('axios');

const url = 'http://localhost:3001';

const generateToken = async (email, password) => axios
  .post(`${url}/login`, {
    email,
    password,
  })
  .then((res) => res.data)
  .catch((err) => err.response.data);

const registerUser = async (name, email, password, role) => axios
  .post(`${url}/register`, {
    name,
    email,
    password,
    role,
  })
  .then((res) => ({ response: res.data, result: true }))
  .catch((err) => ({ response: err.response.data, result: false }));

const updateNameOfUser = async (name) => axios
  .put(`${url}/user`, {
    name,
  })
  .then((res) => res.data)
  .catch((err) => err.response.data);

module.exports = {
  generateToken,
  registerUser,
  updateNameOfUser,
};
