import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import TrybeerContext from '../context/TrybeerContext';
import formatedPrice from '../utils/formatedPrice';
import './ComponentsCSS/Cart.css';

const Cart = () => {
  const { cart, getTotalPriceCart } = useContext(TrybeerContext);
  const history = useHistory();

  const disabledButton = getTotalPriceCart() === null || getTotalPriceCart() === '0.00';

  useEffect(() => {
    getTotalPriceCart();
  }, [cart, getTotalPriceCart]);

  return (
    <div className="cart-container">
      <button
        data-testid="checkout-bottom-btn"
        type="button"
        onClick={ () => history.push('/checkout') }
        disabled={ disabledButton }
        className="cartButton"
      >
        Ver Carrinho
        {' - '}
        { formatedPrice(getTotalPriceCart()) }
      </button>
    </div>
  );
};

export default Cart;
