import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';
import Button from '../../Components/Button';
import Input from '../../Components/Input';
import Menu from '../../Components/Menu';
import * as S from './style';

const updateUser = async (name, email, callback) => {
  try {
    const request = await Axios.put('http://localhost:3001/profile', { name, email });
    const data = await request.data;
    if (data !== 'nome do usuário atualizado') throw new Error();
    callback('Atualização concluída com sucesso');
  } catch (error) {
    alert('Ocorreu um erro', error);
  }
};

const fetchUser = async (setEmail, setName) => {
  const { token } = localStorage;
  const request = await Axios
    .get('http://localhost:3001/profile',
      { headers: { authorization: token } });
  const data = await request.data;
  setEmail(data.email);
  setName(data.name);
};

// eslint-disable-next-line max-lines-per-function
const Profile = () => {
  const history = useHistory();
  const [name, setName] = useState('');
  const [email] = useState('');
  useEffect(() => {
    if (!localStorage.token || localStorage.token === '') history.push('/');
  }, [history]);
  useEffect(() => {
    const MaxTime = 2500;
    setTimeout(() => setStatus(''), MaxTime);
  }, [status]);
  useEffect(() => { fetchUser(setEmail, setName); }, []);
  const handleName = ({ target }) => {
    setName(target.value);
    setDisabled(true);
  };
  return (
    <S.Container>
      <Menu><S.Title data-testid="top-title">Meu perfil</S.Title></Menu>
      <Input
        name="Nome"
        type="text"
        onChange={handleName}
        dataTestId="profile-name-input"
        value={name}
      />
      <Input
        readonly
        name="Email"
        type="email"
        dataTestId="profile-email-input"
        value={email}
      />
      <Button
        dataTestId="profile-save-btn"
        onClick={() => updateUser(name, email, setStatus)}
        disabled={!disabled}
      >
        Salvar
      </Button>
      <h2>{status}</h2>
    </S.Container>
  );
};

export default Profile;
