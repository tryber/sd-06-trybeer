import React, { useEffect, useState, useContext } from 'react';
import Input from '../Input';
import AppContext from '../../context/AppContext';

const Form = () => {
  const { validateRegister, setRegister } = useContext(AppContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSeller, setIsSeller] = useState(false);
  useEffect(() => {
    validateRegister(name, email, password);
    setRegister({ name, email, password, isSeller });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, email, password, isSeller]);
  return (
    <form>
      <Input
        type="text"
        name="Nome"
        value={ name }
        onChange={ ({ target }) => setName(target.value) }
        dataTestId="signup-name"
      />
      <Input
        type="email"
        name="Email"
        value={ email }
        onChange={ ({ target }) => setEmail(target.value) }
        dataTestId="signup-email"
      />
      <Input
        type="password"
        name="Senha"
        value={ password }
        onChange={ ({ target }) => setPassword(target.value) }
        dataTestId="signup-password"
      />
      <Input
        type="checkbox"
        name="Quero vender"
        value={ isSeller }
        onChange={ () => setIsSeller(!isSeller) }
        dataTestId="signup-seller"
      />
    </form>
  );
};

export default Form;
