import React, { useState } from 'react';
import Input from '../Input';

const Form = () => {
  const [street, setStreet] = useState('');
  const [numberStreet, setNumberStreet] = useState('');
  return (
    <div>
      <span>Endereço</span>
      <form>
        <span>Rua:</span>
        <Input
          type="text"
          name="Rua"
          value={ street }
          onChange={ ({ target }) => setStreet(target.value) }
          dataTestId="checkout-street-input"
        />
        <span>Número da casa:</span>
        <Input
          type="text"
          name="Numero"
          value={ numberStreet }
          onChange={ ({ target }) => setNumberStreet(target.value) }
          dataTestId="checkout-street-input"
        />
      </form>
    </div>
  );
};

export default Form;
