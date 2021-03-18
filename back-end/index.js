const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const LoginController = require('./controllers/LoginController');
const RegisterController = require('./controllers/RegisterController');
const ProfileController = require('./controllers/ProfileController');
const VerifyAuthorization = require('./middlewares/VerifyAuthotization');
const connection = require('./database/connection');

require('dotenv').config();

const app = express();

const PORT = 3000;

app.use(cors());

app.use((req, _res, next) => {
  console.log({
    data: new Date(),
    method: req.method,
    router: req.originalUrl,
  });
  next();
});

app.use(bodyParser.json());

app.get('/eai', async (_req, res) => {
  const [retornoSql] = await connection.execute('SELECT * FROM products');
  res.json(retornoSql);
});

app.use('/login', LoginController);

app.use('/register', RegisterController);

app.use('/profile', VerifyAuthorization, ProfileController);

app.use((err, _req, res, _next) => {
  console.error({ err });
  res.status(500).json({ erro: 'erro interno' });
});

app.listen(PORT, () => console.log('running port', PORT));