const loginDataValidator = (insertedEmail, insertedPassword) => {
  const minimumPasswordLength = 6;
  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const emailIsValid = emailRegex.test(insertedEmail);
  const passwordIsValid = insertedPassword.length >= minimumPasswordLength;

  return !emailIsValid || !passwordIsValid;
};

module.exports = {
  loginDataValidator,
};
