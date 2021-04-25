import React, { useContext } from 'react';
import ButtonsForm from './ButtonsForm';
import InputsForm from './InputsForm';
import RegisterContext from '../../context/RegisterContext';

function FormRegister() {
  const {
    change: handleChange,
    click: handleClick,
    user: newUser,
    isValid: valid,
  } = useContext(RegisterContext);

  return (
    <div>
      {InputsForm(newUser, handleChange)}
      {ButtonsForm(valid, handleClick)}
    </div>
  );
}

export default FormRegister;
