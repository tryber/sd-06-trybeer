const validatePassword = require('./validatePassword');

const validateEmail = require('./validateEmail');

const validateLogin = async (req, res, next) => {
  try {
    await validateEmail(req, res);
    const response = await validatePassword(req, res);
    if (!response.valid) throw response;
    next();
  } catch (Err) {
    next(Err);
  }
};

module.exports = validateLogin;