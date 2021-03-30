import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Axios from 'axios';
import MenuAdmin from '../../Components/MenuAdmin';
import * as S from './style';

const AdminProfile = () => {
  const history = useHistory();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const fetchAdmin = async () => {
    const { token } = localStorage;
    const request = await Axios
      .get('http://localhost:3001/profile',
        { headers: { authorization: token } });
    const data = await request.data;
    setEmail(data.email);
    setName(data.name);
  };
  useEffect(() => { fetchAdmin(); }, []);
  useEffect(() => {
    if (!window.localStorage.token) {
      history.push('/login');
    }
  });
  return (
    <S.Container>
      <S.WrapperMenu>
        <MenuAdmin />
      </S.WrapperMenu>
      <S.WrapperProfile>
        <S.Profile>
          <h1>Admin Profile</h1>
          <p data-testid="profile-name">
            <span>Nome:</span>
            {' '}
            { name }
          </p>
          <p data-testid="profile-email">
            <span>Email:</span>
            {' '}
            { email }
          </p>
        </S.Profile>
      </S.WrapperProfile>
    </S.Container>
  );
};

export default AdminProfile;
