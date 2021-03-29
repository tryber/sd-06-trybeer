module.exports = {
  validName: (name) => /^[a-zA-Z ]+$/.test(name) && name.length > 11,
  validEmail: (email) => /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i.test(email),
  validPassword: (password) => password.length > 5,

};
