const { getPassword } = require('../models/UsersService');

const validatePassword = async (req) => {  
  const { email, password } = req.body.user;
  console.log(email, password);
  const [user] = await getPassword(email);  
  if (password === user.password) return { valid: true };
  return { status: 400, message: 'email ou senha incorretos' };
};

module.exports = validatePassword;