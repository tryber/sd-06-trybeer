import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import TrybeerContext from '../context/TrybeerContext';

function TrybeerProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState({});

  const dataFromLocalStorage = (data) => {
    const foundData = JSON.parse(localStorage.getItem(data));

    if (!foundData) return null;

    if (data === 'user') {
      setUser(foundData);
      return foundData;
    }
    setCart(foundData);
    return foundData;
  };

  useEffect(() => {
    dataFromLocalStorage('user');
    dataFromLocalStorage('cart');
  }, []);

  // const updateUserName = (name) => {
  //   const user = [...user, name];
  //   localStorage.setItem('user', JSON.stringify(user));
  // }

  const setUserLogged = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const updateProductQuantity = (id, quantity, price) => {
    const product = { id, quantity, price };
    const cartWithoutProduct = cart.filter((item) => item.id !== id);
    const newCart = [...cartWithoutProduct, product];
    const cartBiggerThanZero = newCart.filter((item) => item.quantity > 0);
    setCart(cartBiggerThanZero);
    localStorage.setItem('cart', JSON.stringify(cartBiggerThanZero));
  };

  const contextValue = {
    cart,
    setCart,
    updateProductQuantity,
    // updateUserName,
    user,
    setUser,
    setUserLogged,
    dataFromLocalStorage,
  };

  return (
    <TrybeerContext.Provider value={ contextValue }>
      { children }
    </TrybeerContext.Provider>
  );
}

TrybeerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TrybeerProvider;
