import React, { useState } from 'react';
import PropTypes from 'prop-types';

import AppContext from './AppContext';

function ProviderGeneral({ children }) {
  const [orders, setOrders] = useState([]);

  const contextValue = {
    orders,
    setOrders,
  };

  return (
    <AppContext.Provider value={ contextValue }>
      {children}
    </AppContext.Provider>
  );
}

ProviderGeneral.propTypes = {
  children: PropTypes.shape(Object).isRequired,
};

export default ProviderGeneral;
