import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import './login.css';
import logo from '../images/let-it-beer-logo.png';
import useInput from '../hooks/useInput';
import fetches from '../services/fetches';
import { emailValidation, passwordValidation } from '../utils/validations';

export default function Login() {
  const history = useHistory();
  const [email, setEmail] = useInput('');
  const [password, setPassword] = useInput('');

  const handleOnClik = async () => {
    fetches.fetchUserByEmail(email, password)
      .then((response) => {
        if (!response) return;
        localStorage.setItem('token', response[1]);
        if (response[0].role === 'client') history.push('/products');
        else history.push('/admin/orders');
      });
  };

  return (
    <div className="main-container">
      <div className="image-container">
        <img src={ logo } alt="let-it-beer logo" />
      </div>
      <form className="form-container">
        <fieldset className="form-group">
          <label htmlFor="email-input">
            Email
            <input
              className="form-control"
              id="email-input"
              value={ email }
              onChange={ setEmail }
              data-testid="email-input"
              type="text"
              placeholder="Digite seu email..."
            />
          </label>
        </fieldset>
        <fieldset className="form-group">
          <label htmlFor="password-input">
            Senha
            <input
              className="form-control"
              id="password-input"
              value={ password }
              onChange={ setPassword }
              data-testid="password-input"
              type="password"
              placeholder="Digite sua senha..."
            />
          </label>
        </fieldset>
        <button
          className="btn btn-secondary"
          onClick={ (e) => {
            e.preventDefault();
            handleOnClik();
          } }
          disabled={ !(emailValidation(email) && passwordValidation(password)) }
          data-testid="signin-btn"
          type="button"
        >
          Entrar
        </button>
        <div className="link-container">
          <Link
            className="link-content"
            to="/register"
            data-testid="no-account-btn"
          >
            Ainda não tenho conta
          </Link>
        </div>
      </form>
    </div>
  );
}
