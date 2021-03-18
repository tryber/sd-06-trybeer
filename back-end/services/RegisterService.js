const { createRegister, getUserByEmail } = require('../models/RegisterModel');
const {
  validateEmail,
  validateName,
  validatePassword,
} = require('../utils/funcValidations');
const { OK, BAD_REQUEST } = require('../utils/allStatusCode');
const { createToken } = require('../utils/createToken');

const objMessage = (message, status) => ({ message, status });

const RegisterValidation = async (body) => {
  const { name, email, password, role } = body;

  // console.log('body', body); // Retirar
  switch (false) {
    case validateEmail(email):
    case validatePassword(password):
    case validateName(name):
    case role:
      return objMessage('All fields must be filled', BAD_REQUEST);
    default: return null;
  } 
};

const emailIsExists = async (email) => {
  const [retorno] = await getUserByEmail(email);
  if (retorno.length === 0) return objMessage('E-mail already in database.', BAD_REQUEST);
  return null;
};

const RegisterServices = async (req, res) => {
  const { body } = req;
  
  const error = RegisterValidation(body);
  if (error) {
    const { message, status } = error;
    return res.status(status).json({ err: message });
  }

  const error2 = await emailIsExists(body.email);
  if (error2) {
    const { message, status } = error2;
    return res.status(status).json({ err: message });
  }

  const user = await createRegister(body);

  const { password, name, ...userWithoutPassword } = user;
  const { id, ...userWithoutId } = userWithoutPassword;
  const token = createToken(userWithoutPassword);

  res.status(OK).json({ ...userWithoutId, token });
};

module.exports = RegisterServices;
