import React, { useEffect, useState } from 'react';
import { Header, ProductsCards } from '../components';

import '../style/CostumerProducts.css';

const dataFalse = require('../dataFalse');

function CostumerProducts() {
  // const [amount, setAmount] = useState(0.00);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // const url = `Bancodedados`;
    // fetch(url).then(res => setProducts(res.json()))
    setProducts(dataFalse);
  }, []);
  // const priceAmount = (price, qnt) => {
  //   setAmount(price * qnt);
  // };

  // const clickRedirect = () => {
  //   usuarioLogado ? history.push('/cliuente/checkout') : history.push('/login')
  // };

  return (
    <div>
      <Header text="TryBeer" id="top-title" />
      <div>
        {products.map((element, index) => (
          <div key={ element.id }>
            <ProductsCards
              element={ element }
              index={ index }
            />
          </div>
        ))}
      </div>
      {/*
      <button
        type="button"
        onClick={ clickRedirect }
        data-testid="checkout-bottom-btn"
      >
        Ver Carrinho
      </button>
      <p data-testid="checkout-bottom-btn-value">{ `R$: ${amount}` }</p>
      */}
    </div>
  );
}

export default CostumerProducts;
