import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TrybeerContext from './TrybeerContext';

const Provider = ({ children }) => {
  const [loginUser, setLoginUser] = useState({ email: '', password: '', erro: false });

  return (
    <TrybeerContext.Provider value={ { loginUser, setLoginUser } }>
      {children}
    </TrybeerContext.Provider>
  );
};

Provider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Provider;
