const { UserModel } = require('../model');
const { generateNewToken } = require('../utils');

const generateToken = (email) => generateNewToken(email);

const userRole = async (email) => {
 await UserModel.getUserByEmail(email);
};

module.exports = {
  generateToken,
  userRole,
};
