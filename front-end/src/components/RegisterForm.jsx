import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../hooks/UseContext';
import { registerUser } from '../services/users';

function RegisterForm() {
  const [disabled, setDisabled] = useState(false);
  const [seller, setSeller] = useState(false);

  const history = useHistory();

  const {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
  } = useContext(UserContext);

  useEffect(() => {
    const emailRegex = /\S+@\S+\.\S+/;
    const six = 6;
    const twelve = 12;

    setDisabled(name.length >= twelve
      && emailRegex.test(email)
      && password.length >= six);
  }, [name, email, password]);

  const handleRegister = async (userName, userEmail, userPassword, userSeller) => {
    const result = await registerUser(userName, userEmail, userPassword, userSeller);

    if (result.role === 'administrator') return history.push('/admin/orders');
    if (result.role === 'client') return history.push('/products');
  };

  return (
    <form>
      <label htmlFor="nameInput">
        Nome
        <input
          id="nameInput"
          data-testid="signup-name"
          onChange={ (e) => {
            let { value } = e.currentTarget;
            value = value.replace(/\W|\d/gi, '');
            e.currentTarget.value = value;
            setName(e.currentTarget.value);
          } }
        />
      </label>
      <label htmlFor="emailInput">
        Email
        <input
          id="emailInput"
          data-testid="signup-email"
          onChange={ (e) => setEmail(e.target.value) }
        />
      </label>
      <label htmlFor="passwordInput">
        Senha
        <input
          id="passwordInput"
          type="password"
          data-testid="signup-password"
          onChange={ (e) => setPassword(e.target.value) }
        />
      </label>
      <label htmlFor="seller-checkbox">
        Quero Vender
        <input
          id="seller-checkbox"
          type="checkbox"
          data-testid="signup-seller"
          onChange={ () => setSeller(!seller) }
        />
      </label>
      <button
        type="button"
        disabled={ !disabled }
        id="signup-btn"
        data-testid="signup-btn"
        onClick={ () => handleRegister(name, email, password, seller) }
      >
        ENTRAR
      </button>
    </form>
  );
}

export default RegisterForm;
