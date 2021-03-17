const { Router } = require('express');

const loginServices = require('../services/loginServices');

const loginRouter = Router();

loginRouter.post('/', async (req, res) => {
  const { email, password } = req.body;
  const user = await loginServices.validateLogin(email, password);
  if (user.error && user.code === 'not_found') {
    return res.status(404).json({ message: user.message });
  } 
  res.status(200).json(user);
});

module.exports = loginRouter;