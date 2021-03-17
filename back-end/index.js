const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const userController = require('./controllers/userController');
const changeNameController = require('./controllers/changeNameController');

const app = express();
app.use(cors());

const userController = require('./controllers/userController');
const productController = require('./controllers/productController');
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/images', express.static(path.join(__dirname, '/images')));

app.use('/', userController);
app.use('/', userController, changeNameController);
app.use('/', productController);

const PORT = 3001;
app.listen(PORT, () => console.log(`Ouvindo na porta ${PORT}`));
