const jwt = require('jsonwebtoken');
require('dotenv/config');

module.exports = async (email) => {
  const jwtConfig = {
    expiresIn: '10d',
    algorithm: 'HS256',
  };
  const token = await jwt.sign({ data: email }, process.env.TOKEN_SECRET, jwtConfig);
  return token;
};
