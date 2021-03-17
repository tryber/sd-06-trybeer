const jwt = require('jsonwebtoken');
const loginModels = require('../models/loginModels');

const secret = 'minhasenhasecreta';

const generateToken = (user) => {
  const token = jwt.sign({ data: user }, secret, { expiresIn: '7d', algorithm: 'HS256' });
  return token;
};

const validateLogin = async (email, password) => {
  const [user] = await loginModels.validateLogin(email, password);
  if (!user) return { error: true, code: 'not_found', message: 'User not found.' };

  const token = generateToken(email);
  const loggedInUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    token,
    role: user.role,
    
  };

  return loggedInUser;
};

module.exports = {
  validateLogin,
  generateToken,
};