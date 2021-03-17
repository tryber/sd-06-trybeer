const connection = require('./connection');

const getUserByEmail = async (email) => {
  const [result] = await connection.execute(
    'SELECT id, name, email, role FROM Trybeer.users WHERE email=?', [email],
  );

  return result;
};

module.exports = {
  getUserByEmail,
};
