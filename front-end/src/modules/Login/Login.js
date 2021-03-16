import React, { useEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import api from '../../axios/api';
import Button from '../../design-components/Button';
import LoginInputs from './components/LoginInputs';
import Logo from '../../assets/images/Logo.png';
import ContextBeer from '../../context/ContextBeer';
import loginValidation from '../../utils/loginValidation';

function Login() {
  const history = useHistory();
  console.log(history);
  const {
    loginEmail,
    loginPassword,
    isDisabled,
    setIsDisabled,
  } = useContext(ContextBeer);

  useEffect(() => {
    loginValidation(loginEmail, loginPassword, setIsDisabled);
  }, [loginEmail, loginPassword, setIsDisabled]);

  const onClick = () => {
    const token = api
      .post('/login', { email: loginEmail, password: loginPassword })
      .then((response) => {
        localStorage.setItem('user', JSON.stringify(response.data));
        if (response.data.role === 'administrator') history.push('/admin/orders');
        if (response.data.role === 'client') history.push('/products');
      })
      .catch((err) => console.error(err));
    return token;
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4
      sm:px-6 lg:px-8"
    >
      <div className="max-w-md w-full space-y-8">
        <img className="mx-auto h-64 w-64 w-auto" src={ Logo } alt="Workflow" />
        <form className="mt-8 space-y-6" action="#" method="POST">
          <input type="hidden" name="remember" value="true" />
          <LoginInputs />
          <Button
            onClick={ () => onClick() }
            isDisabled={ isDisabled }
            bgColor="indigo-600"
            testId="signin-btn"
          >
            Entrar
          </Button>
          <Link to="/register">
            <Button bgColor="indigo-400" testId="no-account-btn">
              Ainda não tenho conta
            </Button>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
