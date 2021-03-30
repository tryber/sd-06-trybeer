const connection = require('../connection/connection');

// Find All Users
const getAll = async () => {
  const [users] = await connection.execute('SELECT * FROM Trybeer.users');

  return users;
};

// FindById
const findById = async (id) => {
  const [[users]] = await connection
    .execute('SELECT * FROM Trybeer.users WHERE id = ?', [id]);
  
  return users;
};

// VerifyUser
const verifyUser = async (email, password) => {
  const [users] = await connection
    .execute('SELECT * FROM Trybeer.users WHERE email = ? AND password = ?', [email, password]);

  return users;
};

// find email
const findByEmail = async (email) => {
  const [users] = await connection
  .execute('SELECT * FROM Trybeer.users WHERE email = ?', [email]);

  return users;
};

// Create new user
const createUser = async (name, email, password, role) => {
  const [users] = await connection
    .execute('INSERT INTO Trybeer.users (name, email, password, role) VALUES (?, ?, ?, ?)', 
    [name, email, password, role]);
  return users;
};

// Update name
const updateName = async (id, name) => {
  const [users] = await connection
    .execute('UPDATE Trybeer.users SET name = ? WHERE id = ?', [name, id]);

  return users;
};

module.exports = {
  getAll,
  findById,
  verifyUser,
  createUser,
  findByEmail,
  updateName,
};
