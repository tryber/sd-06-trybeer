const { Router } = require('express');
const UserService = require('../service/UserService');
const { OK, CREATED } = require('../schema/statusSchema');

const UserController = new Router();

/**
 * @swagger
 * /user:
 *   get:
 *     tags:
 *       - Users
 *     description: Returns all Users
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of Users
 */
UserController.get('/', async (req, res) => {
  const users = await UserService.getAll();
  res.status(OK).json({ Users: users });
});

/**
 * @swagger
 * /user:
 *   post:
 *     tags:
 *       - Users
 *     description: Add new user
 *     parameters:
 *       - in: body
 *         name: 
 *     consumes:
 *       - application/json
 *     responses:
 *       201:
 *         description: User OK
 */
UserController.post('/', async (req, res) => {
  const { name, email, password, role } = req.body;
  await UserService.createNewUser(name, email, password, role);

  res.status(CREATED).json({ message: 'OK' });
});

// Update Product
UserController.put('/:id', UserService.verifyId, async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  await UserService.update(id, name);
  res.status(OK).json({ message: 'name updated!' });
});

module.exports = UserController;
