import React, { useState } from 'react';
import PropTypes from 'prop-types';
import UserContext from './UserContext';

function UserProvider({ children }) {
  const [user, setUser] = useState({});
  const [validUser, setValidUser] = useState(true);

  const providerValue = {
    user,
    setUser,
    validUser,
    setValidUser,
  };

  return (
    <UserContext.Provider
      value={ providerValue }
    >
      { children }
    </UserContext.Provider>
  );
}

UserProvider.propTypes = { children: PropTypes.element.isRequired };

export default UserProvider;
