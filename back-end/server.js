const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

const routes = require('./src/main.routes');

const app = express();

const PORT = process.env.PORT || 3001;

app.use(cors());

app.use(bodyParser.json());

app.use(routes);

app.listen(PORT, () => console.log(`On na port ${PORT}`));
