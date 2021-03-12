import React, { useEffect, useState } from 'react';

import { registerUser } from '../../Services/Apis';

import Container from './styles';

import Input from '../../Components/Input';
import Button from '../../Components/Button';

const handleRedirect = (user) => {
  if (user.role === 'client') {
    window.location.href = '/client';
  } else {
    window.location.href = '/admin';
  }
};

const handleSubmit = async (event, { name, email, password, isChecked }) => {
  event.preventDefault();

  let role = '';

  if (isChecked === true) {
    role = 'admin';
  } else {
    role = 'client';
  }

  const user = await registerUser(name, email, password, role);
  handleRedirect(user);
};

const form = (params) => {
  const { name, setEmail,
    setPassword, isDisabled, email, password, setName, isChecked, setIsChecked,
  } = params;
  const paramsRegistered = { name, email, password, isChecked };
  return (
    <form onSubmit={ (e) => handleSubmit(e, paramsRegistered) }>
      <h1>Register</h1>
      <Input
        placeholder="Nome"
        heigth="40px"
        onChange={ ({ target }) => setName(target.value) }
        dataTestid="signup-name"
      />
      <Input
        placeholder="Email"
        heigth="40px"
        onChange={ ({ target }) => setEmail(target.value) }
        dataTestid="signup-email"
      />
      <Input
        placeholder="Senha"
        heigth="40px"
        onChange={ ({ target }) => setPassword(target.value) }
        dataTestid="signup-password"
      />
      <label htmlFor="check">
        <input
          id="check"
          type="checkBox"
          checked={ isChecked }
          onChange={ ({ target }) => setIsChecked(target.checked) }
          dataTestid="signup-seller"
        />
        Quero vender
      </label>
      <Button
        type="submit"
        width="400px"
        heigth="40px"
        color="green"
        fontSize="20px"
        disabled={ isDisabled }
        dataTestid="signup-btn"
      >
        CADASTRAR
      </Button>
    </form>
  );
};

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [isChecked, setIsChecked] = useState(false);

  const twelve = 12;

  useEffect(() => {
    const emailFormat = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/.test(email);
    const six = 6;
    const minPasswordLength = password.length >= six;
    if (emailFormat && minPasswordLength && name.length > twelve) {
      setIsDisabled(false);
    }
  }, [name, email, password]);

  const params = {
    name,
    setEmail,
    setPassword,
    isDisabled,
    email,
    password,
    setName,
    isChecked,
    setIsChecked,
  };

  return (
    <Container>
      {form(params)}
    </Container>
  );
};

export default Register;
