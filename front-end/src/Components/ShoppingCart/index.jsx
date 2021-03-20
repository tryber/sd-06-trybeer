import React, { useEffect, useState } from 'react';

const ShoppingCart = () => {
  const [cart, setCart] = useState([]);
  useEffect(() => {
    const shopping = JSON.parse(localStorage.products.getItem('products'));
    if (shopping) {
      setCart(shopping);
    }
  }, []);
  return (
    <div>
      {cart}
    </div>
  );
};

export default ShoppingCart;
