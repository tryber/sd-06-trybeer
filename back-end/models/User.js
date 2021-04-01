const connection = require('./connection');

const getUserByEmail = async (email) => {
  const [[user]] = await connection.execute('SELECT * FROM users WHERE email=? LIMIT 1', [email]);

  return user;
};

const addUser = async (name, email, password, role) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO users (name, email, password, role) VALUES(?, ?, ?, ?) ',
    [name, email, password, role],
  );

  return insertId;
};

const updateUserName = async (name, email) => {
  await connection.execute(
    'UPDATE users SET name=? WHERE email=?', [name, email],
  );
};

module.exports = {
  getUserByEmail,
  addUser,
  updateUserName,
};
