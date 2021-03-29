// import { bodyParser } from 'body-parser';
const express = require('express');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan'); 
const bodyParser = require('body-parser');
require('dotenv').config();

const error = require('./src/middlewares/error.js');
const loginRouter = require('./src/controllers/loginController.js');

const app = express();
const PORT = process.env.PORT || 3001;

// Para entregar arquivos estáticos como imagens, arquivos CSS, e arquivos JavaScript
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));  
app.use(morgan('dev'));

app.use('/login', loginRouter);

// app.use('/register');

// app.use('/products');

app.all('*', (_req, res) => {
  res
    .status(404)
    .json({ message: 'EndPoint não existe' });
});

app.use(error);

app.listen(PORT, () => console.log(`Server rodando na porta:  ${PORT}`));
