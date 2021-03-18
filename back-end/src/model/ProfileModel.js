const connection = require('./connection');

const update = async (name, email) => {
  await connection.execute(
    'UPDATE Trybeer.users SET name=? WHERE email=?', [name, email],
  );
  return true;
};

module.exports = { update };
