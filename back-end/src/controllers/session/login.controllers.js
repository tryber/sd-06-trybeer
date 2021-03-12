const { getAll } = require("../../models/queries.models");

module.exports = async (_req, res, next) => {
  try {
    await getAll('products');
    return res.status(200).json({ hello: 'World!' });
  } catch (err) {
    return next(err);
  }
};
