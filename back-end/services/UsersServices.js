const { create, getUserByEmail } = require('../models/UsersModel');
const validateEmail = require('../utils/validateEmail');
const status = require('../utils/allStatusCode'); 

const UsersServices = async (req, res) => {
  const { name, email, password } = req.body;
  
  const validEmail = validateEmail(email);
 
  if (!name || !email || !validEmail || !password) {
    return res.status(status.BAD_REQUEST).json({ err: 'Invalid entries. Try again.' });
  }

  if (await getUserByEmail(email)) {
    return res.status(status.CONFLICT).json({ err: 'Email already registered' });
  }

  const user = await create(name, email, password);
  return res.status(status.CREATED).json({ user });
};

module.exports = UsersServices;