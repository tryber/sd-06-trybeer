const visibilityBtnRegister = async (newUser, setValid) => {
  const regexEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i.test(newUser.email);
  const validNome = /^[a-záàâãéèêíïóôõöúçñ ]+$/i.test(newUser.name);
  const six = 6;
  const senha = newUser.senha.length >= six;
  const doze = 12;
  const nome = newUser.name.length >= doze;
  if (validNome && regexEmail && senha && nome) {
    setValid(false);
  } else {
    setValid(true);
  }
};

export default visibilityBtnRegister;
