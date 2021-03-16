const models = require('../models/users');

const getUser = async (email, password) => models.getUser(email, password);

const addUser = async (name, email, password, role) => models.addUser(name, email, password, role);

module.exports = {
  getUser,
  addUser,
};
