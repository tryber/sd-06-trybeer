const validateEmail = (email) => {
  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  const minimumPasswordLength = 6;
  return password.length >= minimumPasswordLength;
};

const validateName = (name) => {
  const regex = /^([a-zA-Zà-úÀ-Ú]|\s+)+$/i;
  const regexValidation = regex.test(name);
  const minNameLength = 12;
  return name.length >= minNameLength && regexValidation;
};

const loginDataValidator = (
  email,
  password,
) => !validateEmail(email) || !validatePassword(password);

const signupDataValidator = (name, email, password) => {
  const isDataValid = !validateEmail(email) || !validatePassword(password)
  || !validateName(name);

  return isDataValid;
};

module.exports = {
  loginDataValidator,
  signupDataValidator,
};
