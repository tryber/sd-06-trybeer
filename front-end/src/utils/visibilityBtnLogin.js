const visibilityBtnLogin = async (user, setValid) => {
  const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  const email = emailRegex.test(user.email);
  const six = 6;
  const senha = user.password.length >= six;
  if (senha && email) {
    setValid(false);
  } else {
    setValid(true);
  }
};

export default visibilityBtnLogin;
