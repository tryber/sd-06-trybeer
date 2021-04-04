import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import GlobalContext from '../../../context/Context';
import { FaCartArrowDown } from 'react-icons/fa';

function CartButton() {
  const [show, setShow] = useState(false);
  const { cartItems } = useContext(GlobalContext);

  let total = cartItems.reduce((acc, curr) => {
    const result = (acc + curr.quantity * curr.price);
    return result;
  }, 0);

  total = total.toFixed(2).replace('.', ',');

  return (
    <div>
      <Link
          className={ `items-center space-x-2
            bg-secondary rounded-bl-md rounded-tl-md p-2 justify-center top-20 right-0 fixed ${cartItems.length > 0 ? 'hidden md:flex' : 'hidden'} ${show ? 'w-1/5' : 'w-min' }` }
          to="/checkout"
          data-testid="checkout-bottom-btn"
          disabled={ total <= 0 }
          onMouseEnter={ () => setShow(true) }
          onMouseLeave={ () => setShow(false) }
        >
          <FaCartArrowDown />
          <p className={ show ? '' : 'hidden' }>Ver Carrinho</p>
          <p
            className={ show ? '' : 'hidden' }
            data-testid="checkout-bottom-btn-value"
          >
            { `R$ ${total}` }
          </p>
        </Link>
      { cartItems.length > 0 && (
        <Link
          className="fixed bottom-0 md:relative flex items-center w-full space-x-2
            bg-secondary rounded-md p-2 justify-center"
          to="/checkout"
          data-testid="checkout-bottom-btn"
          disabled={ total <= 0 }
        >
          <p>Ver Carrinho</p>
          <p data-testid="checkout-bottom-btn-value">
            { `R$ ${total}` }
          </p>
        </Link>
      )}
      { cartItems.length === 0 && (
        <button
          type="button"
          className="fixed bottom-0 md:relative flex items-center w-full space-x-2
          bg-red-100 rounded-md p-2 justify-center"
          data-testid="checkout-bottom-btn"
          disabled
        >
          <p>Ver Carrinho</p>
          <p data-testid="checkout-bottom-btn-value">
            { `R$ ${total}` }
          </p>
        </button>
      ) }
    </div>
  );
}

export default CartButton;
