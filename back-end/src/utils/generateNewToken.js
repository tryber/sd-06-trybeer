const jwt = require('jsonwebtoken');
require('dotenv/config');

module.exports = async (email) => {
const secret = 'testando';

  const jwtConfig = {
    expiresIn: '10d',
    algorithm: 'HS256',
  };
  const token = await jwt.sign({ data: email }, secret, jwtConfig);
  return token;
};
