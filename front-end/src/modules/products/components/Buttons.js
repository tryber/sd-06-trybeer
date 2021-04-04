import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import GlobalContext from '../../../context/Context';
import { FaPlusCircle, FaMinusCircle } from 'react-icons/fa';

const Buttons = ({ index, product }) => {
  const { name, price, id, photo } = product;

  const { cartItems, setCartItems } = useContext(GlobalContext);

  const initialValue = -1;

  const position = cartItems.reduce((acc, item, idx) => {
    if (item.id === id) return idx;
    return acc;
  }, initialValue);

  const quantity = (position === initialValue) ? 0 : cartItems[position].quantity;

  const handleClick = (type) => {
    const operationsIncrements = {
      increment: 1,
      decrement: -1,
    };

    const increment = operationsIncrements[type];

    if (position === initialValue && type === 'increment') {
      return setCartItems((prev) => (
        [
          ...prev,
          { id, quantity: 1, price, name, photo },
        ]
      ));
    }

    if (position === initialValue && type === 'decrement') return true;

    if (cartItems[position].quantity === 1 && type === 'decrement') {
      return setCartItems((prev) => (
        [
          ...prev.slice(0, position),
          ...prev.slice(position + 1),
        ]
      ));
    }

    return setCartItems((prev) => (
      [
        ...prev.slice(0, position),
        {
          ...prev[position], quantity: prev[position].quantity + increment,
        },
        ...prev.slice(position + 1),
      ]
    ));
  };

  return (
    <div className="w-full flex justify-between items-center space-x-1">
      <button
        data-testid={ `${index}-product-minus` }
        className="text-secondary mr-2 w-6 h-6 flex items-center justify-center
          focus:outline-none rounded-full"
        type="button"
        name="decrement"
        onClick={ () => handleClick('decrement') }
        // disabled={ quantity === 0 }
      >
        <FaMinusCircle/>
      </button>
      <p data-testid={ `${index}-product-qtd` } className="mr-2">
        { quantity }
      </p>
      <button
        data-testid={ `${index}-product-plus` }
        className="text-secondary mr-2 w-6 h-6 flex items-center justify-center
          focus:outline-none rounded-full"
        type="button"
        name="increment"
        onClick={ () => handleClick('increment') }
      >
        <FaPlusCircle/>
      </button>
    </div>
  );
};

Buttons.propTypes = {
  index: PropTypes.number.isRequired,
  product: PropTypes.shape({
    price: PropTypes.number,
    name: PropTypes.string,
    photo: PropTypes.string,
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default Buttons;
