// const { LoginModel } = require('../model');
const { generateNewToken } = require('../utils');

const generateToken = async (email) => {
  // const [user] = await LoginModel.generateToken(email);

  const token = await generateNewToken(email);
  const result = { token };

  return result;
};

module.exports = {
  generateToken,
};
