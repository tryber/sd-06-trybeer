const connection = require('./connection');

const getUserByEmail = async (email) => {
  const [[user]] = await connection.execute('SELECT * FROM users WHERE email=? LIMIT 1', [email]);

  return user;
};

module.exports = {
  getUserByEmail,
};
