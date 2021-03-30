const { Router } = require('express');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../middlewares/authToken');

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const userService = require('../service/UserService');
const { OK, UNAUTHORIZED } = require('../schema/statusSchema');

const LoginController = new Router();

LoginController.get('/', async (req, res) => {
  res.status(OK).json({ Login: 'Teste OK' });
});

// // Post Login
LoginController.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userService.verifyUser(email, password);
    const { role } = user[0];
    const token = jwt.sign({ data: user }, SECRET, jwtConfig);

    res.status(OK).json({ token, role });
  } catch (e) {
    res.status(UNAUTHORIZED).json({ message: 'Incorrect email or password' });
  }
});

module.exports = LoginController;
