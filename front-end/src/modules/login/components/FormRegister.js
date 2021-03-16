import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../state/actions';

const Form = () => {
  const [form, setForm] = useState({ email: '', password: '', name: '', role: 'client' });
  const [seePassword, setSeePassword] = useState(true);
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [passwordIsValid, setPasswordIsValid] = useState(false);
  const [nameIsValid, setNameIsValid] = useState(false);
  const [passwordValidationLabel, setPasswordValidationLabel] = useState(false);
  const [emailValidationLabel, setEmailValidationLabel] = useState(false);
  const [nameValidationLabel, setNameValidationLabel] = useState(false);

  const validColor = 'text-green-500';
  const invalidLabel = 'text-xs text-red-500';

  // const patternStrong = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,}$";
  const patternTrybe = /^[0-9]{6,}$/;
  const patternEmail = /^[a-zA-Z0-9.]+@[a-zA-Z0-9]+\.[a-zA-Z]+(\.[a-zA-Z]+)?$/i;
  const patternName = /^[a-zA-Z\s]{12,}$/;

  const error = useSelector((state) => state.login.error);

  const handleChangeCheckbox = ({ target }) => {
    const { name } = target;
    const value = target ? 'administrator' : 'client';

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;

    if (name === 'name') {
      setNameIsValid(patternName.test(value));
      setNameValidationLabel(!patternName.test(value));
    } else if (name === 'email') {
      setEmailIsValid(patternEmail.test(value));
      setEmailValidationLabel(!patternEmail.test(value));
    } else {
      setPasswordIsValid(patternTrybe.test(value));
      setPasswordValidationLabel(!patternTrybe.test(value));
    }

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const dispatch = useDispatch();

  const createAccount = useCallback(({ email, password, name, role }) => dispatch(
    actions.postRegister({ email, password, name, role }),
  ), [dispatch]);

  const handleSubmit = (event) => {
    event.preventDefault();
    createAccount(form);
  };

  return (
    <form
      className="flex flex-col mt-10"
      onSubmit={ (event) => handleSubmit(event) }
    >
      <div className="flex flex-col space-y-4">
        <label htmlFor="name-ipt" className="flex flex-col space-y-2">
          <p>Name*</p>
          <p className="hidden">Nome</p>
          <input
            id="name-ipt"
            type="text"
            name="name"
            data-testid="signup-name"
            value={ form.name }
            onChange={ (target) => handleChange(target) }
            className="border rounded-md p-2 focus:outline-none
            focus:border-secondary-dark"
            placeholder="Enter your name..."
            required
            onKeyUp={ () => setNameValidationLabel(false) }

          />
          <p className={ !nameValidationLabel ? invalidLabel : 'hidden' }>
            Name should be composed just by letters
          </p>
        </label>
        <div className="flex flex-col space-y-2">
          <label htmlFor="email-ipt" className="flex flex-col space-y-2">
            <p>Email*</p>
            <input
              id="email-ipt"
              type="text"
              name="email"
              data-testid="signup-email"
              value={ form.email }
              onChange={ (target) => handleChange(target) }
              className="border rounded-md p-2 focus:outline-none
              focus:border-secondary-dark"
              placeholder="Enter your email..."
              required
              onKeyUp={ () => setEmailValidationLabel(false) }
            />
          </label>
          <p className={ !emailValidationLabel ? invalidLabel : 'hidden' }>
            Email should be like name@domain.com
          </p>
        </div>
        <label htmlFor="password-ipt" className="flex flex-col space-y-2">
          <p>Secret*</p>
          <p className="hidden">Senha</p>
          <div className="flex space-x-2 items-center">
            <input
              id="password-ipt"
              data-testid="signup-password"
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
        <ul className={ passwordValidationLabel ? invalidLabel : 'hidden' }>
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
        <label htmlFor="role-ipt" className="flex space-x-2 items-center">
          <input
            id="role-ipt"
            type="checkbox"
            data-testid="signup-seller"
            name="role"
            value={ form.role !== 'client' }
            onChange={ (target) => handleChangeCheckbox(target) }
            className="border p-2"
          />
          <p>Want to sell?</p>
          <p className="hidden">Quero vender</p>
        </label>
      </div>
      <p className={ `bg-red-500 rounded-md p-5 mt-4 ${error !== '' ? '' : 'hidden'}` }>
        E-mail already in database.
      </p>
      <div className="w-full mt-10 flex flex-col space-y-2">
        <button
          data-testid="signup-btn"
          className={ `rounded-md w-full p-2 ${(emailIsValid && passwordIsValid
            && nameIsValid) ? 'bg-secondary' : 'bg-secondary-light'}
            focus:outline-none` }
          type="submit"
          disabled={ !emailIsValid || !passwordIsValid || !nameIsValid }
        >
          Create Account
          <p className="hidden">Cadastrar</p>
        </button>
        <Link
          className="rounded-md border-secondary border w-full p-2 text-center"
          to="/login"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
};

export default Form;
