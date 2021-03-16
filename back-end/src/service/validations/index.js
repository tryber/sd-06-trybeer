const jwt = require('jsonwebtoken');
const userModel = require('../../model/usersModel');

const secret = 'secretToken';
const UNAUTHORIZED = 401;
const BAD_REQUEST = 400;
const ALREADY_EXISTS = 200;

const invalidEntries = {
  payload: { message: 'Invalid entries. Try again.' },
  status: BAD_REQUEST,
};

const userAlredyRegistered = {
  payload: { message: 'A user with this email already exists.' },
  status: ALREADY_EXISTS,
};

const notAdmin = {
  payload: { message: 'Only administrators can add products.' },
  status: UNAUTHORIZED,
};

const notValidSale = {
  payload: { message: 'The sale is missing product name or price or image.' },
  status: BAD_REQUEST,
};

const loginValidation = async (email, userPass) => {
  if (!email) return invalidEntries;

  const [result] = await userModel.getUserByEmail(email);
  if (result) {
    const { password } = result;

    if (password === userPass) return result;
  }

  return invalidEntries;
};

const newUserValidation = async (email) => {
  if (!email) return invalidEntries;

  const [result] = await userModel.getUserByEmail(email);
  if (!result) return true;

  return userAlredyRegistered;
};

const tokenValidation = async (token) => {
  const result = jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      const wrongTokenInfo = {
        payload: { message: err.message },
        status: UNAUTHORIZED,
      };
      return wrongTokenInfo;
    }

    const { id } = decoded;
    return id;
  });

  if (!result.payload) {
    const checkUser = await userModel.getById(result);
    const { id: dbId } = checkUser;
    
    if (dbId === result) return true;
  }

  return result;
};

const adminValidation = async (email) => {
  if (!email) return notAdmin;

  const [result] = await userModel.getUserByEmail(email);

  if (result) {
    const { role } = result;

    if (role === 'administrator') return result;
  }

  return notAdmin;
};

const addressValidation = (reqBody) => {
  const { address, num } = reqBody;

  if (!address || !num) return notValidSale;
  return true;
};

const saleValidation = async (reqBody) => {
  const { userId, price, status } = reqBody;

  if (!userId || !price || !status) return notValidSale;
  return true;
};

module.exports = {
  loginValidation,
  newUserValidation,
  tokenValidation,
  adminValidation,
  addressValidation,
  saleValidation,
};
