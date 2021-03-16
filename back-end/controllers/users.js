const { Router } = require('express');
const services = require('../services/users');
const createToken = require('../auth/createToken');

const usersRouter = new Router();

usersRouter.post('/', async (req, res) => {
  const { email, password } = req.body;

  const [user] = await services.getUser(email, password);
  
  if (user) {
    const token = createToken({ email });
    return res.status(200).json({ token, role: user.role });
  }

  return res.status(404).json({ message: 'user not found' });
});

usersRouter.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;

  const [user] = await services.addUser(name, email, password, role);

  if (user) {
    const token = createToken({ email });
    return res.status(200).json({ token, role: user.role });
  }

  return res.status(404).json({ message: 'user not found' });
});

module.exports = {
  usersRouter,
};
