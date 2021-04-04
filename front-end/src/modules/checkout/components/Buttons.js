import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import GlobalContext from '../../../context/Context';
import RemoveConfirmation from './RemoveConfirmation';
import { FaPlusCircle, FaMinusCircle } from 'react-icons/fa';

const Buttons = ({ index, item }) => {
  const { name, price, id, photo } = item;
  const { cartItems, setCartItems } = useContext(GlobalContext);
  const [open, setOpen] = useState(false);

  const initialValue = -1;

  const position = cartItems.reduce((acc, product, idx) => {
    if (product.id === id) return idx;
    return acc;
  }, initialValue);

  const quantity = (position === initialValue) ? 0 : cartItems[position].quantity;

  function handleRemove() {
    return setCartItems((prev) => (
      [
        ...prev.slice(0, position),
        ...prev.slice(position + 1),
      ]
    ));
  }

  const handleRemoveConfirmation = () => setOpen(true);

  const handleClick = (type) => {
    const operationsIncrements = {
      increment: 1,
      decrement: -1,
    };

    const increment = operationsIncrements[type];

    if (position === initialValue) {
      return setCartItems((prev) => (
        [
          ...prev,
          { id, quantity: 1, price, name, photo },
        ]
      ));
    }

    if (cartItems[position].quantity === 1 && type === 'decrement') {
      return handleRemoveConfirmation();
      // return handleRemove();
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
    <div className="flex items-center space-x-1">
      <RemoveConfirmation
        item={ item }
        open={ open }
        setOpen={ setOpen }
        handleRemove={ handleRemove }
      />
      <button
        data-testid={ `${index}-product-minus` }
        className="text-secondary mr-2 w-6 h-6 flex items-center justify-center rounded-full"
        type="button"
        name="decrement"
        onClick={ () => handleClick('decrement') }
        disabled={ quantity === 0 }
      >
        <FaMinusCircle/>
      </button>
      <p data-testid={ `${index}-product-qtd-input` } className="mr-2">
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
  item: PropTypes.shape({
    price: PropTypes.number,
    name: PropTypes.string,
    photo: PropTypes.string,
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default Buttons;
