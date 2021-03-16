const connection = require('./connection');

const coll = 'users';

const getAll = async () => {
  const [users] = await connection.execute('SELECT * FROM Trybeer.users;');

  return users;
};

const getUser = async (email, password) => {
  const [user] = await connection.execute(
    `SELECT * FROM Trybeer.${coll} WHERE email = ? AND password = ?`, [email, password],
  );

  return user;
};

const addUser = async (name, email, password, role) => {
  await connection.execute(
    `INSERT INTO Trybeer.${coll} (name, email, password, role) VALUES(?, ?, ?, ?);`,
    [name, email, password, role],
  );

  const user = await getUser(email, password);

  return user;
};

module.exports = {
  getAll,
  getUser,
  addUser,
};
