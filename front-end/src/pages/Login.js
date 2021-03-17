import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import TrybeerContext from '../context/TrybeerContext';

import Input from '../components/Register/Input';

const formsInputs = [
  { title: 'Email', id: 'email-input', type: 'email', callback: '' },
  { title: 'Senha', id: 'password-input', type: 'password', callback: '' },
];

const {
  userValidation, redirectPath, handleUserNotRegistered,
} = require('../services/loginService');

function Login() {
  const { user, setUser } = useContext(TrybeerContext);
  const [enableButton, setEnableButton] = useState(true);
  const history = useHistory();

  return (
    <form>
      {formsInputs.map((input, index) => {
        const { title, id, type, callback } = input;
        input.callback = () => userValidation(user, setUser, setEnableButton);

        return (
          <Input
            key={ index }
            title={ title }
            id={ id }
            type={ type }
            callback={ callback }
          />
        );
      })}
      <div>
        <button
          disabled={ enableButton }
          type="button"
          data-testid="signin-btn"
          onClick={ () => redirectPath(history, user) }
        >
          Entrar
        </button>
        <button
          type="button"
          data-testid="no-account-btn"
          onClick={ () => handleUserNotRegistered(history) }
        >
          Ainda não tenho conta
        </button>
      </div>
    </form>
  );
}

export default Login;
