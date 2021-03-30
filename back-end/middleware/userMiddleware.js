const checkEmail = (req, _res, _next) => {
  const { email } = req.body;
  const check = /^([a-z\d.-]+)@([a-z\d-]+)\.([a-z]{3,8})?$/.test(email);
  return check;
};

module.exports = {
  checkEmail,
};