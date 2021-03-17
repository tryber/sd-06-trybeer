const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
require('express-async-errors');
const path = require('path');

const loginController = require('./controllers/loginControllers');
const registerController = require('./controllers/registerController');
const productsController = require('./controllers/productsControllers');
const validateToken = require('./middlewares/validateToken');
const log = require('./middlewares/logger');
const error = require('./middlewares/error');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(log);

app.use('/login', loginController);

app.use('/register', registerController);

app.use('/products', validateToken, productsController);

app.use('/images', express.static(path.resolve(__dirname, 'images')));

app.use(error);

app.all('*', (_req, res) => res.status(404).json({ message: 'Endpoint não existe' }));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
