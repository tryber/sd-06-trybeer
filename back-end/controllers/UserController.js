const { Router } = require('express');
const jwt = require('jsonwebtoken');
const { getUserByEmail, addUser, updateUserName } = require('../models/User');
const { verifyValidToken } = require('../services/TokenValidator');

const UserController = new Router();

const SUCCESS = 200;
const CREATED = 201;
const BAD_REQUEST = 400;
const secret = 'theIncredibleSecret';
const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

UserController.post('/get-data', async (req, res) => {
  const { email, password } = req.body;
  const user = await getUserByEmail(email);
  
  if (!user || user.password !== password) {
    return res.status(BAD_REQUEST).json({ message: 'Email ou senha inválidos.' }); 
  }
  const token = jwt.sign({ data: [email, password] }, secret, jwtConfig);
  
  res.status(SUCCESS).json({ user, token });
});

UserController.post('/create', async (req, res) => {
  const { name, email, password, role } = req.body;
  const token = jwt.sign({ data: [email, password] }, secret, jwtConfig);
  const alreadyExists = await getUserByEmail(email);
  if (alreadyExists) {
    return res.status(BAD_REQUEST).json({ message: 'Email já cadastrado.' }); 
  }
  const userId = await addUser(name, email, password, role);
  const user = {
    name,
    email,
    token,
    role,
    id: userId,
  };
  
  res.status(CREATED).json(user);
});

UserController.put('/update', async (req, res) => {
  const { name, email } = req.body;
 
  await updateUserName(name, email);
  
  res.status(SUCCESS).send();
});

UserController.post('/decodeToken', async (req, res) => {
  const { token } = req.body;
  const decodedUser = verifyValidToken(token);
  const registeredUser = await getUserByEmail(decodedUser.email);
  
  if (!decodedUser || !registeredUser || decodedUser.password !== registeredUser.password) {
    return res.status(BAD_REQUEST).json({ message: 'Email ou senha inválidos.' }); 
  }

  res.status(SUCCESS).json(true);
});

module.exports = UserController;
