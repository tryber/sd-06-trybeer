const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');

const { UserRoute, LoginRoute, ProfileRoute } = require('./routes');
const { error } = require('./middleware');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/login', LoginRoute);
app.use('/register', UserRoute);
app.use('/profile', ProfileRoute);
app.use(error);

module.exports = app;
