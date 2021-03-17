const rescue = require('express-rescue');
const { UserModel } = require('../model');

const { LoginService } = require('../service');

const generateToken = rescue(async (req, res) => {
  const { email } = req.body; 
  // const token = await LoginService.generateToken(email);
  const [user] = await UserModel.getUserByEmail(email); 
  return res.status(200).json({ user });
});

const userRole = rescue(async (req, res) => {
  const { email } = req.body;
  const [user] = await LoginService.userRole(email);
  return res.status(200).json(user);
});

module.exports = {
  generateToken,
  userRole,
};