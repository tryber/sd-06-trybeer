const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

require('dotenv').config();

const log = require('./middlewares/log');
const { NOT_FOUND } = require('./schema/statusSchema');
const UserController = require('./controller/UserController');
const LoginController = require('./controller/LoginController');
const ProductsController = require('./controller/ProductsController');

const app = express();
const { options } = require('./swagger/SwaggerDocument');

// initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

const PORT = parseInt(process.env.PORT, 10) || 3001;

app.use(express.json());
app.use(cors());
app.use(log);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// serve swagger
// app.get('/api-docs', (req, res) => {
//   res.setHeader('Content-Type', 'application/json');
//   res.send(swaggerSpec);
// });
app.use('/user', UserController);
app.use('/login', LoginController);
app.use('/products', ProductsController);

app.all('*', (req, res) => res.status(NOT_FOUND).json({ message: 'Route not found' }));

app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
