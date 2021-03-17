import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import LoginContext from '../context/LoginContext';
import FormLogin from '../components/pageLogin/FormLogin';
import visibilityBtnLogin from '../utils/visibilityBtnLogin';
import api from '../services/api';

function Login({ history }) {
  const [user, setUser] = useState({ email: '', password: '' });
  const [valid, setValid] = useState(true);
  const [errMsg, setErrMsg] = useState('');
  const [displayErr, setDisplayErr] = useState(false);

  useEffect(() => {
    visibilityBtnLogin(user, setValid);
  }, [user]);

  const handleChange = ({ target }) => {
    setUser({ ...user, [target.name]: target.value });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const loginValidate = await api.generateToken(user.email, user.password);
    // const userAdmin = user.email === 'tryber@trybe.com.br';
    // const userClient = user.email === 'bruno.batista@gmail.com';
    console.log(loginValidate.response);
    if (loginValidate.result) {
      // const { token, role } = loginValidate.response;
      setErrMsg(false);
      history.push('/admin/orders');
      // else history.push('/products');
      // localStorage.setItem('user', JSON.stringify({ email: user.email, token }));
    } else {
      setDisplayErr(true);
      setErrMsg(loginValidate.response.message);
    }
  };

  return (
    <LoginContext.Provider
      value={ {
        dataUser: user,
        isDisabled: valid,
        handleIputs: handleChange,
        handleButton: handleClick,
        router: history,
        messageError: errMsg,
        displayError: displayErr,
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
