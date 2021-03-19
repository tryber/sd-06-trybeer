import React, { useState } from 'react';
import PropTypes from 'prop-types';
import LoginContext from './LoginContext';

function LoginProvider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validUser, setValidUser] = useState(true);

  const providerValue = {
    email,
    setEmail,
    password,
    setPassword,
    validUser,
    setValidUser,
  };

  return (
    <LoginContext.Provider
      value={ providerValue }
    >
      { children }
    </LoginContext.Provider>
  );
}

LoginProvider.propTypes = { children: PropTypes.element.isRequired };

export default LoginProvider;
