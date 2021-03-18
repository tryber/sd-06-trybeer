import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import BeersAppContext from '../context/BeersAppContext';
import fetchApiJsonBody from '../service/fetchApi';
import funcValidations from '../service/funcValidations';

import '../style/LoginRegister.css';

const logo = require('../images/logo_provisorio.png');

function Login() {
  const {
    setUser,
  } = useContext(BeersAppContext);

  const [valid, setValid] = useState(true);
  const [inputValues, setInputValues] = useState({ email: '', password: '' });
  const [errMessage, setErrMessage] = useState('');

  const history = useHistory();

  const isValid = async () => {
    const email = funcValidations.validateEmail(inputValues.email);
    const password = funcValidations.validatePassword(inputValues.password);
    if (password && email) {
      setValid(false);
    } else {
      setValid(true);
    }
  };

  useEffect(() => {
    isValid();
  }, [inputValues.password, inputValues.emai]);

  const handleChange = ({ target }) => {
    setInputValues({ ...inputValues, [target.name]: target.value });
  };

  const handleClick = async () => {
    const ola = await fetchApiJsonBody('/login', inputValues);
    if (ola.err) {
      console.log('entrou no erro');
      setErrMessage(ola.err);
      return;
    }
    setUser(ola);
    if (ola.role === 'administrator') {
      console.log('entrou no admin');
      history.push('/admin/orders');
    } else if (ola.role === 'client') {
      console.log('entrou no client');
      history.push('products');
    }
  };

  return (
    <div className="login-register">
      <img src={ logo } className="img-logo-login" alt="logo" />
      <form>
        <label htmlFor="email">
          Email
          <br />
          <input
            data-testid="email-input"
            type="email"
            id="email"
            name="email"
            value={ inputValues.email }
            onChange={ handleChange }
          />
        </label>
        <br />
        <label htmlFor="pass">
          Senha
          <br />
          <input
            type="password"
            id="pass"
            name="password"
            value={ inputValues.password }
            onChange={ handleChange }
            data-testid="password-input"
          />
        </label>
        <br />
        <span>{ errMessage }</span>
        <button
          data-testid="signin-btn"
          id="enter"
          type="button"
          disabled={ valid }
          onClick={ handleClick }
        >
          ENTRAR
        </button>
        <br />
        <button
          data-testid="no-account-btn"
          id="sign-up"
          type="button"
          onClick={ () => history.push('/register') }
          className="bttn-text"
        >
          Ainda não tenho conta
        </button>
      </form>
    </div>
  );
}

export default Login;
