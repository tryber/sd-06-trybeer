const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Rescue = require('express-rescue');
const { handleError } = require('./src/middlewares');
const routes = require('./src/routes');

const app = express();
// const port = process.env.API_PORT;
const port = 3001;

app.use(cors());
app.use(bodyParser.json());
app.use('/', Rescue(routes));
app.use(handleError);

app.listen(port, () => console.log(`API running on port ${port}`));
