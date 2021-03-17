const { LoginModel } = require('../model');
const { generateNewToken } = require('../utils');

const generateToken = async (email) => {
  const [user] = await LoginModel.getUserByEmail(email);
  const token = await generateNewToken(email);
  const result = { user, token };

  return result;
};

module.exports = {
  generateToken,
};
