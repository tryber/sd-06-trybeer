const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const userController = require('./controller/usercontroller');
const registerController = require('./controller/registerController');
const productsController = require('./controller/productsController');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/', userController);
app.use('/register', registerController);
app.use('/products', productsController);
app.use('/images', express.static(path.join(__dirname, 'images')));

const port = 3001;

//  app.get('/', (req, res) => res.send('esta comunicando'));
app.listen(port, () => console.log(`app listen on port ${port}`));