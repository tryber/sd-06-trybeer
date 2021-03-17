import React, { useState } from 'react';

const Buttons = () => {
  const [quantity, setQuantity] = useState(0);

  const handleClick = (event) => {
    const { name } = event.target;
    if (name === '+') setQuantity(quantity + 1);
    if (name === '-' && quantity > 0) setQuantity(quantity - 1);
  };
  return (
    <>
      <button type="button" name="-" onClick={ (e) => handleClick(e) }>-</button>
      <p>{quantity}</p>
      <button type="button" name="+" onClick={ (e) => handleClick(e) }>+</button>
    </>
  );
};

export default Buttons;
