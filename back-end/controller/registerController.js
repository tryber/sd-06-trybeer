const { Router } = require('express');

const { userRegister } = require('../service/userService');

const registerController = Router();

registerController.post('/', async (req, res) => {
  const user = req.body;
  const reg = await userRegister(user);
  res.status(200).json(reg);
});

module.exports = registerController;