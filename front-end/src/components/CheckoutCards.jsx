import React, { useState, useEffect } from 'react';
// import dataFalse from '../dataFalse';

function CheckoutCards({ index }) {
  const [products, setProducts] = useState([]);
  // const [totalPrice, setTotalPrice] = useState(0.00);

  // const sumPrices = (qnt, productPrice) => {

  // };

  useEffect(() => {
    const url = '/products';
    fetch(
      `http://localhost:3001${url}`, {
        headers: {
          'Content-Type': 'application/json',
          authorization: token,
        },
      },
    ).then((response) => response.json())
      .then((data) => setProducts(data));
  });

  return (
    <>
      <p>Produtos</p>
      <p data-testid={ `${index}-product-qtd-input` }>{products.qnt}</p>
      <p data-testid={ `${index}-product-total-value` }>{products.name}</p>
      <p data-testid={ `${index}-product-unit-price` }>{`R$: ${products.price}`}</p>
      <button type="button" data-testid={ `${index}-removal-button` }>Remover</button>
      <p data-testid="order-total-value">{`Total: R$ ${productPrice}`}</p>
    </>
  );
}

CheckoutCards.propTypes = {
  index: PropTypes.number.isRequired,
};

export default CheckoutCards;
