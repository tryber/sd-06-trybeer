import React, { useContext } from 'react';
import LoginContext from '../../context/LoginContext';
import InputsForm from './InputsForm';
import ButtonsForm from './ButtonsForm';

function FormLogin() {
  const {
    dataUser: user,
    handleIputs: handleChange,
    handleButton: handleClick,
    isDisabled: valid,
    router: history,
  } = useContext(LoginContext);

  return (
    <div>
      { InputsForm(user, handleChange) }
      { ButtonsForm(valid, handleClick, history) }
    </div>
  );
}

export default FormLogin;
