import React, { useState } from 'react';
import { Header } from '../components';

function CostumerCheckout() {
  return (
    <>
      <Header text="Finalizar Pedido" />
      <p>Aqui vão os cards pegos que provavelmente virão do localStorage</p>
      <p>{`Total: R$ ${amount}`}</p>

      <label htmlFor="street">
        Rua:
        <input type="text" name="street" />
      </label>

      <label htmlFor="number">
        Numero:
        <input type="number" name="number" />
      </label>
    </>
  );
}

export default CostumerCheckout;
