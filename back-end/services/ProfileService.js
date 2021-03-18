const tokenValidation = require('../utils/tokenValidation');
const { OK } = require('../utils/allStatusCode');

const ProfileService = async (req, res) => {
  const { authorization } = req.headers;
  const payload = tokenValidation(authorization);
  const { name, email, role, id } = payload;
  res.status(OK).json({ name, email, role, id });
};

module.exports = ProfileService;