const { Router } = require('express');
// const { createOne } = require('../models/UsersService');

const routerRegister = Router();

// routerRegister.post('/', async (req, res, next) => {
//   const { name, email, password, seller } = req.body;
//   const role = seller ? 'administrator' : 'client';
//   // try {    
//   //   const response = await createOne(name, email, password, role);
//   // } catch (err) {

//   // }
//   // console.log(response);
//   return res.status(200).json({ message: 'test' });
// });

module.exports = routerRegister;