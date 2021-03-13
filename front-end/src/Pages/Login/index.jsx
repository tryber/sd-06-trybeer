import React, { useState, useEffect } from 'react';

import { loginUser } from '../../Services/Apis';

import Container from './styles';

import Input from '../../Components/Input';
import Button from '../../Components/Button';

const handleRedirect = () => {
  const userRole = localStorage.getItem('user');

  const role = JSON.parse(userRole);

  if (role.role === 'client') {
    window.location.href = '/products';
  } else {
    window.location.href = '/admin/orders';
  }
};

const saveLocalStorage = (res) => {
  localStorage.setItem('user', JSON.stringify(res));
};

const handleSubmit = async (event, email, password) => {
  event.preventDefault();
  console.log('entrei na handle submit');
  const user = await loginUser(email, password);
  console.log(user, 'nosso usuario');
  saveLocalStorage(user);

  handleRedirect();
};

const userRegistered = () => {
  window.location.href = '/register';
};

const form = ({ setEmail, setPassword, isDisabled, email, password }) => (
  <form onSubmit={ (e) => handleSubmit(e, email, password) }>
    <h1>Login</h1>
    <Input
      id="email"
      label="Email"
      dataTestid="email-input"
      onChange={ ({ target }) => setEmail(target.value) }
    />
    <Input
      id="senha"
      label="Senha"
      dataTestid="password-input"
      onChange={ ({ target }) => setPassword(target.value) }
    />
    <Button
      type="submit"
      width="400px"
      heigth="40px"
      color="green"
      fontSize="20px"
      disabled={ isDisabled }
      dataTestid="signin-btn"
    >
      ENTRAR
    </Button>
    <Button
      type="button"
      width="400px"
      heigth="40px"
      fontSize="16px"
      dataTestid="no-account-btn"
      onClick={ userRegistered }
    >
      Ainda não tenho conta
    </Button>
  </form>
);

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    const emailFormat = /\S+@\S+\.\S+/.test(email);
    const six = 6;
    const minPasswordLength = password.length >= six;
    if (emailFormat && minPasswordLength) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [email, password]);

  const params = {
    setEmail, setPassword, isDisabled, email, password,
  };

  return (
    <Container>
      {form(params)}
    </Container>
  );
};

export default Login;
