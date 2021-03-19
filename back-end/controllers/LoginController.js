const { Router } = require('express');
const jwt = require('jsonwebtoken');
const { getUserByEmail } = require('../models/Login');

const LoginController = new Router();

const SUCCESS = 200;
const BAD_REQUEST = 400;
const secret = 'theIncredibleSecret';
const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

LoginController.post('/', async (req, res) => {
  const { email, password } = req.body;
  const user = await getUserByEmail(email);
  
  if (!user || user.password !== password) {
    return res.status(BAD_REQUEST).json({ message: 'Email ou senha inválidos.' }); 
  }
  const token = jwt.sign({ data: [email, password] }, secret, jwtConfig);
  
  res.status(SUCCESS).json({ user, token });
});

module.exports = LoginController;
