import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../../../components/Header/Header';
import { verifyAdmin } from '../../../store/LocalStorage/actions';
import './Profile.css';
import profileIcon from './profileIcon.png';

export default function Profile() {
  const [nome, setNome] = useState('');
  const [emailAdmin, setEmailAdmin] = useState('');
  const history = useHistory();

  useEffect(() => {
    const { email, name } = verifyAdmin(history);
    setNome(name);
    setEmailAdmin(email);
  }, [history]);

  return (
    <div className="container page-with-menu-admin">
      <Header title=".comCerveja" user="admin" />
      <div className='allContent'>
        <div className="perfil">
          <h1 className='admin-title'>Perfil</h1>
      <img className="logo-perfil-admin" src={profileIcon} alt='logo perfil' />
        </div>
        <div className="dados">
          <h4 data-testid="profile-name">{`Nome: ${nome}`}</h4>
          <h4 data-testid="profile-email">{`Email: ${emailAdmin}`}</h4>
        </div>
      </div>
    </div>
  );
}
