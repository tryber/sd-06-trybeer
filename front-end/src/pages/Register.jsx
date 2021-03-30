import React, { useState } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useHistory } from 'react-router-dom';
import useInput from '../hooks/useInput';
import { nameValidation,
  passwordValidation,
  emailValidation } from '../utils/validations';
import fetches from '../services/fetches';
import './login.css';

export default function Register() {
  const history = useHistory();
  const [email, setEmail] = useInput('');
  const [password, setPassword] = useInput('');
  const [name, setName] = useInput('');
  const [role, setRole] = useState('client');
  const [emailAlreadyExists, setEmailAlreadyExists] = useState('');

  const handleCheckbox = (e) => {
    const checkBox = e.target;
    if (checkBox.checked) setRole('administrator');
    else setRole('client');
  };

  const handleOnClik = async () => {
    const doesTheEmailExist = await fetches.fetchUserByEmail(email, password);
    console.log(doesTheEmailExist);
    if (doesTheEmailExist) return setEmailAlreadyExists('E-mail already in database.');
    const newUser = await fetches.createUser(email, name, password, role);
    console.log('newUser', newUser);
    if (role === 'client') {
      localStorage.setItem('token', newUser.userToken);
      history.push('/products');
    } else {
      localStorage.setItem('token', newUser.userToken);
      history.push('/admin/orders');
    }
  };

  return (
    <div className="main-container">
      <form className="form-container">
        <fieldset className="form-group name-field">
          <label htmlFor="name">
            Nome
            <input
              className="form-control"
              id="name"
              data-testid="signup-name"
              type="text"
              value={ name }
              onChange={ setName }
              placeholder="Digite seu nome..."
            />
          </label>
        </fieldset>
        <fieldset className="form-group">
          <label htmlFor="email">
            Email
            <input
              className="form-control"
              id="email"
              data-testid="signup-email"
              type="text"
              value={ email }
              onChange={ setEmail }
              placeholder="Digite seu email..."
            />
          </label>
        </fieldset>
        <fieldset className="form-group pass-input">
          <label htmlFor="password">
            Senha
            <input
              className="form-control"
              id="password"
              data-testid="signup-password"
              type="password"
              value={ password }
              onChange={ setPassword }
              placeholder="Digite sua senha..."
            />
          </label>
        </fieldset>
        <fieldset className="form-check">
          <FormControlLabel
            control={
              <Checkbox
                data-testid="signup-seller"
                onChange={ handleCheckbox }
                color="primary"
                name="sell-checkbox"
              />
            }
            label="Quero vender"
          />
        </fieldset>
        <button
          className="btn btn-secondary"
          id="signup"
          data-testid="signup-btn"
          type="button"
          disabled={
            !(emailValidation(email)
            && passwordValidation(password)
            && nameValidation(name))
          }
          onClick={ (e) => {
            e.preventDefault();
            handleOnClik();
          } }
        >
          Cadastrar
        </button>
        <span>{emailAlreadyExists}</span>
      </form>
    </div>
  );
}
