import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../../../components/Header/Header';
import { verifyAdmin } from '../../../store/LocalStorage/actions';
import './Profile.css';

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
    <div className="container">
      <Header title="TryBeer" user="admin" />
      <div className="perfil">
        <h1>Perfil</h1>
      </div>
      <div className="dados">
        <h4 data-testid="profile-name">{`Nome: ${nome}`}</h4>
        <h4 data-testid="profile-email">{`Email: ${emailAdmin}`}</h4>
      </div>
    </div>
  );
}
