import React from 'react';
import Header from '../components/HeaderComponent';

function CostumerCheckout() {
  return (
    <div>
      <Header text="Finalizar Pedido" data-testid="top-title" />
      <h1>Produtos</h1>
      {/* <CheckoutCards /> */}
      <p>{`Total: ${'amount'}`}</p>

      <p>Endereço</p>
      <label htmlFor="street">
        Rua:
        <input type="text" data-testid="checkout-street-input" />
      </label>
      <label htmlFor="number">
        Número da casa:
        <input type="number" data-testid="checkout-house-number-input" />
      </label>
      <button type="button" data-testid="checkout-finish-btn">Finalizar Pedido</button>
    </div>
  );
}

export default CostumerCheckout;
