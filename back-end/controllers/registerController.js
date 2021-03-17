const { Router } = require('express');
const registerService = require('../services/registerServices');
const { conflict, ok, created } = require('../utilities/variables');

const registerRouter = Router();

// Get all users
registerRouter.get('/get-all', async (req, res) => {
    const users = await registerService.getAll();
    res.status(ok).json(users);
});

// Create a user
registerRouter.post('/', async (req, res) => {
  const { name, email, password, role } = req.body;
  const user = await registerService.create(name, email, password, role);
  if (user.code === 'conflict') {
    return res.status(conflict).json({ message: user.message });
  }
  res.status(created).send({ name, email, role });
});

// Delete a user
registerRouter.delete('/delete-user/:id', async (req, res) => {
  const { id } = req.params;
  await registerService.exclude(id);
  res.status(ok).json('Response deleted successfully');
});

// Edit a user
registerRouter.put('/edit-user', async (req, res) => {
  const { prevName, nextName } = req.body;
  console.log(req.body);
  await registerService.edit(prevName, nextName);
  res.status(ok).send({ message: 'Atualização concluída com sucesso' });
});

module.exports = registerRouter;