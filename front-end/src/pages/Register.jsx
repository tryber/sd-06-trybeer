import React, { useState } from 'react';
import InputRegister from '../components/InputRegister';
import register from '../methods/register';
import { RegisterSchema } from '../validationsSchemas/register';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [seller, setSeller] = useState(false);

  const handleClick = async () => {
    try {
      await RegisterSchema.validate({ name, email, password });
      const response = await register(name, email, password, seller);
      console.log(response);
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <>
      <h1>Pagina de Registro</h1>
      <InputRegister
        name="name"
        setValue={ setName }
        value={ name }
        label="Nome"
      />
      <InputRegister
        name="email"
        setValue={ setEmail }
        value={ email }
        label="Email"
        type="email"
      />
      <InputRegister
        name="password"
        setValue={ setPassword }
        value={ password }
        label="Senha"
        type="password"
      />
      <InputRegister
        name="seller"
        setValue={ setSeller }
        checked={ seller }
        label="Quero vender"
        type="checkbox"
      />
      <button type="button" onClick={ async () => handleClick() }>registrar</button>
    </>
  );
}

export default Register;
