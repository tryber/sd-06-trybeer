import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './Login.css';
import api from '../services/api';
// import { useHistory } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const history = useHistory();

  const handleChangeEmail = (event) => {
    const { value } = event.target;
    setEmail(value);
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (regex.test(value)) {
      setIsEmailValid(true);
    } else {
      setIsEmailValid(false);
    }
  };

  const handleChangePassword = (event) => {
    const { value } = event.target;
    setPassword(value);
    const passwordLength = 6;

    if (value.length >= passwordLength) {
      setIsPasswordValid(true);
    } else {
      setIsPasswordValid(false);
    }
  };

  const handleClick = async () => {
    const response = await api.fetchLogin(email, password);
    localStorage.setItem('token', JSON.stringify(response.token));
    localStorage.setItem('user', JSON.stringify(response.user));
    if (response.user.role === 'client') {
      history.push('/products');
    } else {
      history.push('/admin/orders');
    }
  };

  return (
    <div className="login">
      <h1>Login</h1>
      <label htmlFor="email">
        Email
        <input
          className="user"
          placeholder="E-mail"
          type="email"
          id="email"
          data-testid="email-input"
          onChange={ handleChangeEmail }
        />
      </label>
      <label htmlFor="password">
        Senha
        <input
          className="boxsign"
          placeholder="Senha"
          type="password"
          id="password"
          data-testid="password-input"
          onChange={ handleChangePassword }
        />
      </label>
      <button
        className="go"
        type="button"
        data-testid="signin-btn"
        disabled={ !(isEmailValid && isPasswordValid) }
        onClick={ handleClick }
      >
        <span>Entrar</span>
      </button>
      <Link
        to="/register"
        data-testid="no-account-btn"
        className="cadastrar"
      >
        Ainda não tenho conta!
      </Link>
    </div>
  );
}
