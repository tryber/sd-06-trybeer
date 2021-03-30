const { Router } = require('express');

const createToken = require('../auth/createToken');
const { checkAuthorization } = require('../middleware/checkAuthorization');
const { userLogin, userEditByEmail, findUserByEmail } = require('../service/userService');

const userController = Router();

userController.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const payload = { email, password };
  const token = await createToken(payload);
  const role = await userLogin(email, password);
  res.status(200).json({ userLogin: { role, token } });
});
userController.put('/profile', async (req, res) => {
  const { email, name } = req.body;
  await userEditByEmail(name, email);

  res.status(201).json('nome do usuário atualizado');
});
userController.get('/profile', checkAuthorization, async (req, res) => {
  const { email } = req.payload;
  const [[user]] = await findUserByEmail(email);
  res.status(200).json({ name: user.name, email });
});

module.exports = userController;