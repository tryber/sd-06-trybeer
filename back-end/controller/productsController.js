const { Router } = require('express');
// const jwt = require('jsonwebtoken');
// const { validateToken, SECRET } = require('../middlewares/helpers');
const { getAllProducts } = require('../models/productsModel');

const productsRouter = new Router();

productsRouter.get('/', async (req, res) => {
  const allProducts = await getAllProducts();

  res.status(200).json(allProducts);
});

module.exports = productsRouter;

// const multer = require('multer');

// const storage = multer.diskStorage({
//   destination: (req, file, callback) => {
//     callback(null, 'uploads');
//   },
//   filename: (req, file, callback) => {
//     callback(null, `${req.params.id}.jpeg`);
//   },
// });
// const upload = multer({ storage });
// recipesRouter.put('/:id/image', upload.single('image'),
//    validateToken, validateId, async (req, res) => {
//   const { id } = req.params;
//   const { email } = req.user;
//   const userAuthorization = await canUserEdit(id, email);
//   if (!userAuthorization) {
//     return res.status(NOTADMIN).json({ message: `${email} can't edit this recipe` });
//   }
//   const path = `localhost:3000/images/${req.file.filename}`;
//   const recipeUpdated = await updateImage(id, path);
//   res.status(SUCCESS).json(recipeUpdated);
// });