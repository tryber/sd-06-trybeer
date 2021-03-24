import React from 'react';
// import CheckoutCards from '../components/CheckoutCards';
import Header from '../components/HeaderComponent';

function CostumerCheckout() {
  return (
    <>
      <Header text="Finalizar Pedido" data-testid="top-title" />
      <h1>Produtos</h1>
      <div>
        {/* {products.map((element, index) => (
          <div key={ element.id }>
            <CheckoutCards
              element={ element }
              index={ index }
            />
          </div>
        ))} */}
      </div>
      <p>{`Total: ${'amount'}`}</p>

      <p>Endereço</p>
      <form action="post">
        <label htmlFor="street">
          Rua:
          <input
            type="text"
            name="street"
            id="street"
            data-testid="checkout-street-input"
          />
        </label>
        <label htmlFor="number">
          Número da casa:
          <input
            type="text"
            name="number"
            id="number"
            data-testid="checkout-house-number-input"
          />
        </label>
        <button
          type="button"
          data-testid="checkout-finish-btn"
        >
          Finalizar Pedido
        </button>
      </form>
    </>
  );
}

export default CostumerCheckout;
