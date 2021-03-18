import React, { useState, useEffect } from 'react';
import { saveStorage, loadStorage } from '../service/localStorage';
import BeersAppContext from './BeersAppContext';

function Provider({ children }) {
  const [user, setUser] = useState(loadStorage('user', {}));
  const [
    productQuantity,
    setProductQuantity,
  ] = useState(loadStorage('productQuantity', []));

  useEffect(() => {
    saveStorage('productQuantity', productQuantity);
  }, [productQuantity]);

  useEffect(() => {
    saveStorage('user', user);
  }, [user]);

  const contextValue = {
    user,
    setUser,
    productQuantity,
    setProductQuantity,
  };

  return (
    <BeersAppContext.Provider value={ contextValue }>
      {children}
    </BeersAppContext.Provider>
  );
};

export default Provider;
