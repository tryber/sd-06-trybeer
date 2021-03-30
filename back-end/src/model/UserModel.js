const connection = require('./connection');

const getUserByEmail = async (email) => {
  const [result] = await connection.execute(
    'SELECT id, email, password, role FROM Trybeer.users WHERE email=?', [email],
  );  
  return result;
};

const registerUser = async (name, email, password, role) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO Trybeer.users (name, email, password, role) VALUES (?,?,?,?)',
    [name, email, password, role],
  );

  return {
    id: insertId,
    name,
    email,
    role,
  };
};

const updateUser = async (name, email) => {
  await connection.execute(
     'UPDATE Trybeer.users SET name=? WHERE email=?', [name, email],
   );
   return {
     message: 'Atualização concluída com sucesso',
   };
 };

module.exports = {
  getUserByEmail,
  registerUser,
  updateUser,
};
