const emailValidation = (email) => {
  const isEmailValid = /[A-Za-z0-9]+@[A-Za-z]+[A-z]*(\.\w{2,3})+/.test(email);
  return isEmailValid;
};

const passwordValidation = (password) => {
  const MINIMUM_PASSOWRD_LENGTH = 5;
  const isPasswordValid = password.length > MINIMUM_PASSOWRD_LENGTH;
  return isPasswordValid;
};

const nameValidation = (name) => {
  const MINIMUM_NAME_LENGTH = 11;
  const isNameValid = name.length > MINIMUM_NAME_LENGTH
    && (/^[A-Za-z'\s]+$/.test(name));
  return isNameValid;
};

const isTheNewNameDifferent = (oldName, newName) => {
  if (oldName === newName) return false;
  return true;
};

const isTotalNotPriceZero = (total) => {
  if (total === '0,00') {
    return false;
  }
  return true;
};

const streetValidation = (userStreet) => {
  const isStreetFilled = userStreet.length > 0;
  return isStreetFilled;
};

const houseNumberValidation = (number) => {
  const ishouseNumberFilled = number.length > 0;
  return ishouseNumberFilled;
};

module.exports = {
  emailValidation,
  passwordValidation,
  nameValidation,
  isTheNewNameDifferent,
  isTotalNotPriceZero,
  streetValidation,
  houseNumberValidation,
};
