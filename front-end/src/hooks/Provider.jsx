import React, { /* useEffect, */ useState } from 'react';
import propTypes from 'prop-types';
import UserContext from './UseContext';
// import User from '../services/users';

const Provider = ({ children }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loginRequest, setLoginRequest] = useState('');

  // const api = async () => {
  //   const login = await User(email, password);
  //   await setLoginRequest(login);
  // };

  // useEffect(() => {
  //   api();
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const contextValue = {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    loginRequest,
    setLoginRequest,
  };

  return (
    <UserContext.Provider value={ contextValue }>
      { children }
    </UserContext.Provider>
  );
};

Provider.propTypes = {
  children: propTypes.node.isRequired,
};

export default Provider;
