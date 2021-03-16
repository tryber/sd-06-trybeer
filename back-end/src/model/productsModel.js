const connection = require('./connection');

const getAll = async ({ sort = 'name', page = 1, limit = 2, q = '' }) => {
  const offset = (page - 1) * limit;
  const ordenation = sort[0] === '-' ? 'DESC' : 'ASC';
  const sortColumn = (sort[0] === '-') ? sort.substring(1) : sort; 

  const query = (q !== '')
    ? `SELECT * FROM Trybeer.products WHERE name LIKE %${q}% ORDER BY ${sortColumn}
    ${ordenation} LIMIT ${limit} OFFSET ${offset}`
    : `SELECT * FROM Trybeer.products ORDER BY ${sortColumn}
    ${ordenation} LIMIT ${limit} OFFSET ${offset}`;

  const [products] = await connection.execute(query);
  const [productsNumber] = await connection
    .execute('SELECT COUNT(*)as count FROM Trybeer.products');

  const rows = products.map((product) => ({
    name: product.name, id: product.id, price: product.price, photo: product.url_image,
  }));

  const { count } = productsNumber[0];
  return ({ rows, count });
};

module.exports = {
  getAll,
};
