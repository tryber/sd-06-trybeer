import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../state/actions';

const Form = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [seePassword, setSeePassword] = useState(true);
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [passwordIsValid, setPasswordIsValid] = useState(false);
  const [passwordValidationLabel, setPasswordValidationLabel] = useState(false);
  const [emailValidationLabel, setEmailValidationLabel] = useState(false);

  const validColor = 'text-green-500';
  // const patternStrong = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,}$";
  const patternTrybe = /^[0-9]{6,}$/;
  const patternEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;

  const handleChange = ({ target }) => {
    const { name, value } = target;
    if (name === 'email') {
      setEmailIsValid(patternEmail.test(value));
      setEmailValidationLabel(!patternEmail.test(value));
    }

    if (name === 'password') {
      setPasswordIsValid(patternTrybe.test(value));
      setPasswordValidationLabel(!patternTrybe.test(value));
    }

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const dispatch = useDispatch();

  const login = useCallback(
    ({ email, password }) => dispatch(actions.postLogin({ email, password })), [dispatch],
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    login(form);
  };

  return (
    <form
      className="flex flex-col mt-10"
      onSubmit={ (event) => handleSubmit(event) }
    >
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col space-y-2">
          <label htmlFor="email-ipt" className="flex flex-col space-y-2">
            <p>Email*</p>
            <input
              id="email-ipt"
              type="text"
              name="email"
              data-testid="email-input"
              value={ form.email }
              onChange={ (target) => handleChange(target) }
              className="border rounded-md p-2 focus:outline-none
              focus:border-secondary-dark"
              placeholder="Enter your email..."
              required
              onKeyUp={ () => setEmailValidationLabel(false) }
            />
          </label>
          <p className={ emailValidationLabel ? 'text-xs text-red-500' : 'hidden' }>
            Email should be like name@domain.com
          </p>
        </div>
        <label htmlFor="password-ipt" className="flex flex-col space-y-2">
          <p>Secret*</p>
          <p className="hidden">Senha</p>
          <div className="flex space-x-2 items-center">
            <input
              id="password-ipt"
              data-testid="password-input"
              type={ !seePassword ? 'password' : 'text' }
              name="password"
              value={ form.password }
              onChange={ (target) => handleChange(target) }
              className="border rounded-md p-2 focus:outline-none
              focus:border-secondary-dark"
              placeholder="Enter your password..."
              required
              onKeyUp={ () => setPasswordValidationLabel(false) }
            />
            <button
              type="button"
              onClick={ () => setSeePassword((prev) => !prev) }
            >
              Icone
            </button>
          </div>
        </label>
        <ul className={ passwordValidationLabel ? 'text-xs text-red-500' : 'hidden' }>
          {/* <li
            className={ /[A-Za-z\d@$!%*?&]{8,}/.test(form.password)
              ? validColor : '' }
          >
            Minimun of 8 characters
          </li>
          <li
            className={ /(?=.*[A-Z])/.test(form.password) ? validColor : '' }
          >
            At least 1 uppercase letter
          </li>
          <li
            className={ /(?=.*[a-z])/.test(form.password) ? validColor : '' }
          >
            At least 1 lowercase letter
          </li>
          <li
            className={ /(?=.*[@$!%*?&])/.test(form.password) ? validColor : '' }
          >
            At least 1 special character
          </li>
          <li
            className={ /(?=.*\d)/.test(form.password) ? validColor : '' }
          >
            At least  number
          </li> */}
          <li
            className={ /^(?=.*[0-9]).{6,}$/.test(form.password) ? validColor : '' }
          >
            At least  6 numbers
          </li>
        </ul>
      </div>
      <div className="w-full mt-10 flex flex-col space-y-2">
        <button
          data-testid="signin-btn"
          className={ `rounded-md w-full p-2 ${(emailIsValid && passwordIsValid)
            ? 'bg-secondary' : 'bg-secondary-light'} focus:outline-none` }
          type="submit"
          disabled={ !emailIsValid || !passwordIsValid }
        >
          <p className="hidden">ENTRAR</p>
          <p className="hidden">Entrar</p>
          <p>Sign In</p>
        </button>
        <Link
          data-testid="no-account-btn"
          className="rounded-md border-secondary border w-full p-2
            text-center focus:outline-none"
          to="/register"
        >
          <p>Sign Up</p>
          <p className="hidden">Ainda não tenho conta</p>
        </Link>
        <p
          className="text-xs"
        >
          Forgot your passsword?
        </p>
      </div>
    </form>
  );
};

export default Form;
