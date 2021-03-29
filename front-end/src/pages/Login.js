import React, { useContext } from 'react';
// import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import TrybeerContext from '../context/TrybeerContext';
import login from '../api/axiosApi';
// import ErroPage from './ErroPage';

export default function Login() {
  // const { history } = props;
  const history = useHistory();
  const CINCO = 5;
  const { loginUser, setLoginUser } = useContext(TrybeerContext);
  const regexEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  const validEmail = regexEmail.test(loginUser.email);
  const validPassword = loginUser.password.length > CINCO;

  const handleLogin = async (dataUser) => {
    // console.log(props.location)
    // console.log(history)
    const user = await login(dataUser);
    localStorage.setItem('user', JSON.stringify(user));
    console.log(user.role);
    if (user.role === 'client') {
      history.push({ pathname: '/products' });
    } else if (user.role === 'administrator') {
      history.push({ pathname: '/admin/orders' });
    } else {
      // setLoginUser({ ...loginUser, erro: true });
      history.push({ pathname: '/register' });
    }
  };

  // if (loginUser.erro) {
  //   return (
  //     <ErroPage />
  //   );
  // }

  return (
    <section>
      <form>
        <label htmlFor="email">
          Email
          <input
            type="email"
            data-testid="email-input"
            name="email"
            onChange={
              (event) => setLoginUser({ ...loginUser, email: event.target.value })
            }
          />
        </label>
        <label htmlFor="password">
          Senha
          <input
            type="password"
            data-testid="password-input"
            onChange={ (event) => setLoginUser(
              { ...loginUser, password: event.target.value },
            ) }
          />
        </label>
        <button
          type="button"
          data-testid="signin-btn"
          disabled={ !validEmail || !validPassword }
          onClick={ () => handleLogin(loginUser) }
        >
          Entrar
        </button>
        <button
          type="button"
          data-testid="no-account-btn"
          onClick={ () => history.push('/register') }
        >
          Ainda não tenho conta
        </button>
      </form>
    </section>
  );
}

// Login.propTypes = {
//   history: PropTypes.shape().isRequired,
// };
