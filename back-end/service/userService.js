const useModel = require('../models/useModel');

const userLogin = async (userEmail, userPassword) => {
  const useLogin = await useModel.userLogin(userEmail, userPassword);
  return useLogin;
};

const userRegister = async (user) => {
  const userCreate = await useModel.userRegister(user);
  return userCreate;
};

const findUserByEmail = async (email) => {
  const userCreate = await useModel.findUserByEmail(email);
  return userCreate;
};
const userEditByEmail = async (name, email) => {
  const userEdit = await useModel.userEditByEmail(name, email);
  return userEdit;
};

module.exports = {
  userLogin,
  userRegister,
  findUserByEmail,
  userEditByEmail,
};
