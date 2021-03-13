import React, { useEffect, useState } from 'react';

import { registerNewUser } from '../../Services/Apis';

import Container from './styles';

import Input from '../../Components/Input';
import Button from '../../Components/Button';

const handleSubmit = async (event,
  { name, email, password, isChecked, setEmailAlreadyExists }) => {
  event.preventDefault();

  const role = (isChecked) ? 'admin' : 'client';

  const result = await registerNewUser(name, email, password, role);

  if (result && result === 'E-mail already in database.') {
    setEmailAlreadyExists(true);
  } else if (result && result === 'OK') {
    window.location.href = (role === 'client') ? '/products' : '/admin/orders';
  }
};

const button = (isDisabled) => (
  <Button
    type="submit"
    width="400px"
    heigth="40px"
    color="green"
    fontSize="20px"
    disabled={ isDisabled }
    dataTestid="signup-btn"
  >
    Cadastrar
  </Button>
);

const form = (params) => {
  const { name, setEmail,
    setPassword, isDisabled, email, password, setName,
    isChecked, setIsChecked, emailAlreadyExists, setEmailAlreadyExists,
  } = params;
  const paramsRegistered = { name, email, password, isChecked, setEmailAlreadyExists };
  return (
    <form onSubmit={ (e) => handleSubmit(e, paramsRegistered) }>
      <h1>Register</h1>
      <Input
        id="name-input"
        label="Nome"
        dataTestid="signup-name"
        onChange={ ({ target }) => setName(target.value) }
      />
      {(emailAlreadyExists) ? <p>E-mail already in database.</p> : null}
      <Input
        id="email-input"
        label="Email"
        dataTestid="signup-email"
        onChange={ ({ target }) => setEmail(target.value) }
      />
      <Input
        id="password-input"
        label="Senha"
        dataTestid="signup-password"
        onChange={ ({ target }) => setPassword(target.value) }
      />
      <label
        htmlFor="check"
        className="label-checkBox"
      >
        <input
          className="input-checkBox"
          id="check"
          type="checkBox"
          checked={ isChecked }
          onChange={ ({ target }) => setIsChecked(target.checked) }
          data-testid="signup-seller"
        />
        Quero vender
      </label>
      {button(isDisabled)}
    </form>
  );
};

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const [emailAlreadyExists, setEmailAlreadyExists] = useState(false);

  const twelve = 12;

  useEffect(() => {
    const emailFormat = /\S+@\S+\.\S+/.test(email);
    const nameFormat = /^[A-Za-z ]+$/.test(name);
    const six = 6;
    const minPasswordLength = password.length >= six;
    if (emailFormat && nameFormat && minPasswordLength && name.length > twelve) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [name, email, password, emailAlreadyExists]);

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
    emailAlreadyExists,
    setEmailAlreadyExists,
  };

  return (
    <Container>
      {form(params)}
    </Container>
  );
};

export default Register;
