const connection = require('./connection');

const findUser = async (email) => {
  const [[user]] = await connection 
    .execute('SELECT * FROM users WHERE email=?', 
    [email]);
  return user;
};

const createUser = async (name, email, password, role) => {
  await connection
    .execute(`INSERT INTO users
    (name, email, password, role)
    VALUES (?, ?, ?, ?)`,
    [name, email, password, role]);
};

const updateUser = async (name, email) => {
  const updatedUser = await connection
    .execute(`
    UPDATE users
    SET name = (?)
    WHERE email = (?)`,
    [name, email]);
  return updatedUser;
};

module.exports = {
  findUser,
  createUser,
  updateUser,
};
