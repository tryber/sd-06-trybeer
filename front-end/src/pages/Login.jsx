import React from 'react';
import '../styles/login.css';
// import '../App.css';
import { Link, useHistory } from 'react-router-dom';
import useInput from '../hooks/useInput';
import fetchUser from '../services/getUser';
import { emailValidation, passwordValidation } from '../utils/validations';

export default function Login() {
  const history = useHistory();
  const [email, setEmail] = useInput('');
  const [password, setPassword] = useInput('');
  const handleOnClik = async () => {
    fetchUser(email, password)
      .then((response) => {
        if(!response) return; // mudei aqui
        console.log(response); // fazer if pra quando for vazio
        localStorage.setItem('token', response[1]);
        if (response[0].role === 'client') {
          history.push('/products');
        } else history.push('/admin/orders');
      });
  };
  return (
    <div className="main-container">
      <form className="login-form">
        <fieldset>
          <label htmlFor="email-input">
            Email
            <input className="form-control"
              id="email-input"
              value={ email }
              onChange={ setEmail }
              data-testid="email-input"
              type="text"
            />
          </label>
        </fieldset>
        <div className="form-group">
          <label htmlFor="password-input">
            Senha
            <input className="form-control"
              id="password-input"
              value={ password }
              onChange={ setPassword }
              data-testid="password-input"
              type="password"
            />
          </label>
        </div>
        <button className="form-group btn btn-primary btn-lg btn-block"
          onClick={ (e) => {
            e.preventDefault();
            handleOnClik();
          } }
          disabled={ !(emailValidation(email) && passwordValidation(password)) }
          data-testid="signin-btn"
          type="button"
        >
          ENTRAR
        </button>
        <div>
        <Link to="/register" data-testid="no-account-btn" className="btn btn-outline-primary btn-sm">Ainda não tenho conta</Link>
        </div>
      </form>
    </div>
  );
}
