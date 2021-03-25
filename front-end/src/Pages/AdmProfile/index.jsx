import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Menu from '../../Components/Menu';
import * as S from './style';

const AdmProfile = () => {
  const history = useHistory();
  const token = localStorage.token;
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (!window.localStorage.token) {
      return history.push('/login');
    }
    const fetch = async () => {
      const res = await Axios.get('http://localhost:3001/profile', { headers: { authorization: token } });
      console.log(res)
      const { email, name } = res.data;
      setNome(name);
      setEmail(email);
    };
    fetch();
  }, [history, token]);

  return (
    <>
      <Menu><p data-testid="top-title">TryBeer</p></Menu>
      <S.Container>
        <S.lista>
          <h2>Perfil</h2>
          <h3 data-testid="profile-name">Nome:{nome}</h3>
          <h3 data-testid="profile-email">Email:{email}</h3>
        </S.lista>
      </S.Container>
    </>
  );
};

export default AdmProfile;
