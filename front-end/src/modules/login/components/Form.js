import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as API from '../../../utils';
import Buttons from './Buttons';
import EmailInput from './EmailInput';
import PasswordInput from './PasswordInput';

const patternEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
const patternPassword = /^[0-9]{6,}$/;

const patterns = { email: patternEmail, password: patternPassword };

function Form() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errorForm, setErrorForm] = useState({ email: true, password: true });
  const [errorMsg, setErrorMsg] = useState('');
  const [seePassword, setSeePassword] = useState(true);
  const history = useHistory();

  const handleChangeInput = ({ target }) => {
    const { name, value } = target;
    const validation = patterns[name].test(value);
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrorForm((prev) => ({ ...prev, [name]: !validation }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await API.post('/login', form);
    if (response.message) return setErrorMsg(response.message);
    localStorage.setItem('user', JSON.stringify(response));
    const { role } = response;
    history.push(role === 'client' ? '/products' : '/admin/orders');
  };

  return (
    <form className="flex flex-col mt-10" onSubmit={ handleSubmit }>
      <div className="flex flex-col space-y-4">
        { EmailInput(handleChangeInput, form.email) }
        { PasswordInput(handleChangeInput, form.password,
          seePassword, setSeePassword) }
        { Buttons(errorMsg, errorForm) }
      </div>
    </form>
  );
}

export default Form;
