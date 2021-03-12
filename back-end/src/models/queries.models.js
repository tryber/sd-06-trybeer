const connection = require('./connection');

const getAll = async (table) => {
  const [results] = await connection.query('SELECT * FROM ??', [table]);

  console.log(results);

  return results;
};

module.exports = {
  getAll,
};
