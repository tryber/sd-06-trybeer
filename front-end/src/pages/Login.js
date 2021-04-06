import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { verifyEmailAndPassword } from '../utils/verifications';
import fetchFunctions from '../api/fetchFunctions';
import TrybeerContext from '../context/TrybeerContext';
import './PagesCSS/Login.css';

function Login() {
  const history = useHistory();
  const { setUserLogged } = useContext(TrybeerContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [isInvalidUser, setIsInvalidUser] = useState(false);

  useEffect(() => {
    setIsDisabled(!verifyEmailAndPassword(email, password));
  }, [email, password]);

  const handleSignUp = async (event) => {
    event.preventDefault();
    const loggedUser = await fetchFunctions.post('login', { email, password });

    if (loggedUser.token) {
      await setUserLogged(loggedUser);
      if (loggedUser.role === 'administrator') return history.push('/admin/orders');
      return history.push('/products');
    }
    return setIsInvalidUser(true);
  };

  const handleRegister = (event) => {
    event.preventDefault();
    history.push('/register');
  };

  return (
    <section className="my-container">
      <div className="my-row">
        <h1>TryBeer</h1>
        <h4>Encontre aqui a sua cerveja!</h4>
        <form onSubmit={ handleSignUp }>
          <input
            type="text"
            placeholder="E-mail"
            name="email"
            value={email}
            data-testid="email-input"
            className="form-control mt-0 y-3 p-4"
            onChange={ (e) => setEmail(e.target.value) }
          />
          <input
            type="password"
            placeholder="Senha"
            name="password"
            value={password}
            data-testid="password-input"
            className="form-control my-3 p-4"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            data-testid="signin-btn"
            disabled={ isDisabled }
            className="btn1 mt-3 mb-0"
          >
            Entrar
                    </button>
          <button
            type="button"
            data-testid="no-account-btn"
            onClick={ handleRegister }
            className="btn1 mt-3 mb-5"
          >
            Ainda não tenho conta
                    </button>
          <p>
            { isInvalidUser ? 'Invalid entries. Try again.' : '' }
          </p>
        </form>
      </div>
    </section>
  );
}

Login.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

export default Login;
