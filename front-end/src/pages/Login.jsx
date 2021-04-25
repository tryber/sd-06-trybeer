import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import LoginContext from '../context/LoginContext';
import FormLogin from '../components/pageLogin/FormLogin';
import visibilityBtnLogin from '../utils/visibilityBtnLogin';

function Login({ history }) {
  const [user, setUser] = useState({ email: '', password: '' });
  const [valid, setValid] = useState(true);
  useEffect(() => {
    visibilityBtnLogin(user, setValid);
  }, [user]);

  const handleChange = ({ target }) => {
    setUser({ ...user, [target.name]: target.value });
  };

  const handleClick = (e) => {
    console.log(user.email);
    e.preventDefault();
    if (user.email === 'tryber@trybe.com.br') {
      history.push('/admin/orders');
    } else { history.push('/products'); }
    localStorage.setItem('user', JSON.stringify(user.email));
  };
  return (
    <LoginContext.Provider
      value={ {
        dataUser: user,
        isDisabled: valid,
        handleIputs: handleChange,
        handleButton: handleClick,
        router: history,
      } }
    >
      <div>
        <FormLogin />
      </div>
    </LoginContext.Provider>
  );
}

Login.propTypes = {
  history: PropTypes.objectOf(Object).isRequired,
};

export default Login;
