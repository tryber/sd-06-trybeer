import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Header, ProductsCards } from '../components';
import BeersAppContext from '../context/BeersAppContext';
// import fetchApiJsonBody from '../service/fetchApi';

import '../style/CostumerProducts.css';

// const dataFalse = require('../dataFalse');

function CostumerProducts() {
  const history = useHistory();
  const {
    user: { token },
    productQuantity,
  } = useContext(BeersAppContext);

  if (!token) history.push('/login');

  const [amount, setAmount] = useState(0.00);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const totalPrice = productQuantity.reduce((total, element) => {
      const unityPrice = element.qnt * element.price;
      return total + unityPrice;
    }, 0);
    setAmount(totalPrice.toFixed(2));
  }, [productQuantity]);

  useEffect(() => {
    const url = '/products';
    fetch(
      `http://localhost:3001${url}`, {
        headers: {
          'Content-Type': 'application/json',
          authorization: token,
        },
      },
    ).then((response) => response.json()
      .then((data) => {
        setProducts(data);
      }));
  }, []);

  // const priceAmount = (price, qnt) => {
  //   setAmount(price * qnt);
  // };

  const clickRedirect = () => history.push('/checkout');

  const commaAmount = amount.toString().replace('.', ',');

  // const buttonValid = () => {
  //   if (amount === 0.00) return true;
  //   return false;
  // };

  // console.log();

  return (
    <div className="product-page">
      <Header text="TryBeer" id="top-title" />
      <div className="product-list">
        {products.map((element, index) => (
          <div key={ element.id }>
            <ProductsCards
              element={ element }
              index={ index }
            />
          </div>
        ))}
      </div>
      <div className="product-bottom">
        <button
          type="button"
          onClick={ clickRedirect }
          data-testid="checkout-bottom-btn"
          className="bttn-product"
          disabled={ Math.trunc(amount) === 0 }
        >
          Ver Carrinho
          {' '}
          <span
            data-testid="checkout-bottom-btn-value"
            className="value-product"
          >
            { `R$ ${commaAmount}` }
          </span>
        </button>
      </div>
    </div>
  );
}

export default CostumerProducts;
