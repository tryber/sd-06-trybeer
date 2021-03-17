import React, { useState } from 'react';
import { Redirect } from 'react-router';
import MenuTop from '../components/MenuTop';
import api from '../services/api';

export default function Profile() {
  const user = JSON.parse(localStorage.getItem('user'));

  const [name, setName] = useState(user.name);
  const [isEnabled, setIsEnabled] = useState(true);
  const [message, setMessage] = useState('');

  const token = localStorage.getItem('token');
  if (!token) return <Redirect to="login" />;

  const handleClick = () => {
    api.fetchChangeName(name, user.email);
    localStorage.setItem('user', JSON.stringify({ ...user, name }));
    setMessage('Atualização concluída com sucesso');
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setName(value);
    if (value !== user.name) {
      setIsEnabled(false);
    } else {
      setIsEnabled(true);
    }
  };

  return (
    <div>
      <MenuTop title="Meu perfil" />
      <label htmlFor="email">
        Email
        <input
          data-testid="profile-email-input"
          className="inputProfile"
          type="text"
          id="email"
          name="email"
          value={ user.email }
          readOnly
        />
      </label>
      <label htmlFor="name">
        Name
        <input
          data-testid="profile-name-input"
          type="text"
          id="name"
          name="name"
          value={ name }
          onChange={ (e) => handleChange(e) }
        />
      </label>
      <button
        data-testid="profile-save-btn"
        type="button"
        disabled={ isEnabled }
        onClick={ handleClick }
      >
        Salvar
      </button>
      <div>{message}</div>
    </div>
  );
}
