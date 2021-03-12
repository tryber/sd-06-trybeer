const mysql = require('mysql2/promise');
// const config = require('./config');
require('dotenv').config();


const config = {
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  host: process.env.HOSTNAME,
  database: 'Trybeer',
};

const connection = mysql.createPool({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database,
});

module.exports = connection;
