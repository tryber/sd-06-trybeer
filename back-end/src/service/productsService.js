const productsModel = require('../model/productsModel');

const getAll = async ({ limit, page, sort, q }) => {
  const result = await productsModel.getAll({ limit, page, sort, q });

  return result;
};

module.exports = {
  getAll,
};
