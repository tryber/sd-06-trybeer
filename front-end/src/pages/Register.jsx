import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
// import emailExists from '../utils/emailExists';
import useInput from '../hooks/useInput';
import { nameValidation,
  passwordValidation, emailValidation } from '../utils/validations';
import fetchUser from '../services/getUser';

export default function Register() {
  const history = useHistory();
  const [email, setEmail] = useInput('');
  const [password, setPassword] = useInput('');
  const [name, setName] = useInput('');
  const [role, setRole] = useState('client');
  const [emailAlreadyExists, setEmailAlreadyExists] = useState('');

  const handleCheckbox = () => {
    const checkBox = document.getElementById('sell');
    if (checkBox.checked) setRole('administrator');
    else setRole('client');
  };

  const handleOnClik = async () => {
    const doesTheEmailExist = await fetchUser(email, password);
    console.log(doesTheEmailExist);
    if (doesTheEmailExist) return setEmailAlreadyExists('E-mail already in database.');
    if (role === 'client') {
      history.push('/products');
    } else {
      history.push('/admin/orders');
    }
  };

  return (
    <div className="main-container">

    <form className="form-group">
      <fieldset>
        <label htmlFor="name">
          Nome
          <input className="form-control"
            id="name"
            data-testid="signup-name"
            type="text"
            value={ name }
            onChange={ setName }
            />
        </label>
      </fieldset>
      <fieldset>
        <label htmlFor="email">
          Email
          <input className="form-control"
            id="email"
            data-testid="signup-email"
            type="text"
            value={ email }
            onChange={ setEmail }
            />
        </label>
      </fieldset>
      <fieldset>
        <label htmlFor="password">
          Senha
          <input className="form-control"
            id="password"
            data-testid="signup-password"
            type="password" // estava como texto
            value={ password }
            onChange={ setPassword }
            />
        </label>
      </fieldset>
      <fieldset class="form-check">
        <label htmlFor="sell" >
          Quero Vender
          <input  className="form-check-label" 
            id="sell"
            data-testid="signup-seller"
            type="checkbox"
            onClick={ handleCheckbox }
            />
        </label>
        <button className="form-control"
          id="signup"
          data-testid="signup-btn"
          type="button"
          disabled={ !(emailValidation(email)
            && passwordValidation(password) && nameValidation(name)) }
            onClick={ (e) => {
              e.preventDefault();
              handleOnClik();
            } }
            >
          Cadastrar
        </button>
      </fieldset>
      <span>{ emailAlreadyExists }</span>
    </form>
  </div>
  );
}
