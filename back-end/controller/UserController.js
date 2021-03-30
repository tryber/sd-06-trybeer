const { Router } = require('express');
const jwt = require('jsonwebtoken');
const { verifyLogin, SECRET } = require('../middlewares/authToken');
const {
  getAll,
  emailExist,
  createNewUser,
  verifyId,
  findById,
  update,
} = require('../service/UserService');
const { OK, CREATED } = require('../schema/statusSchema');

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const UserController = new Router();

// Get All Users
UserController.get('/', async (_req, res) => {
  const users = await getAll();
  res.status(OK).json({ Users: users });
});

// Create New User
UserController.post('/', emailExist, async (req, res) => {
  const { name, email, password, role } = req.body;
  const newUser = await createNewUser(name, email, password, role);
  const user = await findById(newUser.insertId);
  const token = jwt.sign({ data: user }, SECRET, jwtConfig);

  res.status(CREATED).json({ token });
});

// Get Profile
UserController.get('/profile', verifyLogin, async (req, res) => {
  const { authorization } = req.headers;

  jwt.verify(authorization, SECRET, (_err, decoded) => {
    const dec = decoded.data[0];
    console.log('Usuario decodificado', dec);
    if (!decoded.data[0]) return res.status(OK).json(decoded.data);
    
    res.status(OK).json(dec);
  });
});

// Update
UserController.put('/:id', verifyId, verifyLogin, async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  await update(id, name);
  const user = await findById(id);
  const token = jwt.sign({ data: user }, SECRET, jwtConfig);
  res.status(OK).json({ token });
});

module.exports = UserController;
