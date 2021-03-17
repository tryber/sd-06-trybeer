import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import TrybeerContext from '../context/TrybeerContext';

import {
  validateNewUser,
  registerNewUSer,
} from '../services/UserRegisterService';

import Input from '../components/Register/Input';
import AlreadyRegisterdMessage from '../components/Register/AlreadyRegisterdMessage';
import TopBar from '../components/TopBar';

const formsInputs = [
  { title: 'Nome', id: 'signup-name', type: 'text', callback: '' },
  { title: 'Email', id: 'signup-email', type: 'email', callback: '' },
  { title: 'Senha', id: 'signup-password', type: 'password', callback: '' },
  { title: 'Quero vender', id: 'signup-seller', type: 'checkbox', callback: '' },
];

function UserRegister() {
  const { newUser, setNewUser } = useContext(TrybeerContext);
  const [enableButton, setEnableButton] = useState(true);
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);
  const history = useHistory();

  return (
    <div>
      <div>
        <TopBar />
        <h1>User Register</h1>
      </div>
      <form>
        {formsInputs.map((input, index) => {
          const { title, id, type, callback } = input;
          input.callback = () => validateNewUser(newUser, setNewUser, setEnableButton);

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
        <button
          disabled={ enableButton }
          type="button"
          data-testid="signup-btn"
          onClick={ () => registerNewUSer(history, newUser, setAlreadyRegistered) }
        >
          Cadastrar
        </button>
        { alreadyRegistered ? <AlreadyRegisterdMessage /> : null }
      </form>
    </div>
  );
}

export default UserRegister;
