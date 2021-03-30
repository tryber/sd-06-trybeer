const connection = require('./connections');

const userLogin = async (userEmail, userPassword) => {
  try {
    const [[{ id, name, email, password, role }]] = await connection
      .execute('SELECT * FROM users WHERE email=? and password=?', [userEmail, userPassword]);
    return (id, name, email, password, role);
  } catch (e) {
    return null;
  }
};

const userRegister = async (user) => {
  const { name, email, password, role } = user;
  try {
    await connection
      .execute('INSERT INTO users (name, email, password, role) VALUES (?,?,?,?)',
        [name, email, password, role]);
    return user;
  } catch (e) {
    return e.message;
  }
};

const findUserByEmail = async (email) => {
  try {
    const user = await connection
      .execute('SELECT *  FROM Trybeer.users WHERE email=?', [email]);
    return user;
  } catch (e) {
    return e.message;
  }
};
const userEditByEmail = async (name, email) => {
  try {
    await connection.execute('UPDATE users SET name=? WHERE email=?', [name, email]);
    return true;
  } catch (e) {
    return e.message;
  }
};

module.exports = {
  userLogin,
  userRegister,
  findUserByEmail,
  userEditByEmail,
};