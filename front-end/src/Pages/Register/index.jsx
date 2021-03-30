import Axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router';
import AppContext from '../../context/AppContext';
import * as S from './style';
import RegisterForm from '../../Components/RegisterForm';
import Button from '../../Components/Button';

const handleClick = async (name, email, password, isSeller) => {
  try {
    const role = (isSeller) ? 'admin' : 'client';
    const data = await Axios.post('http://localhost:3001/register', { name, email, password, role });
    console.log(data);
    if (typeof data.data === 'string') throw new Error();
    const getToken = await Axios.post('http://localhost:3001/login', { email, password });
    const token = await getToken.data;
    localStorage.setItem('token', token.userLogin.token);
    return role;
  } catch (err) {
    console.log();
    return false;
  }
};

const Register = () => {
  const { validRegister, register } = useContext(AppContext);
  const history = useHistory();
  const [status, setStatus] = useState('');
  const handleButton = async () => {
    const { name, email, password, isSeller } = register;
    const role = await handleClick(name, email, password, isSeller);
    if (!role) {
      setStatus('E-mail already in database.');
      return 'done';
    }
    if (role === 'admin') return history.push('/admin/orders');
    return history.push('/products');
  };
  useEffect(() => {
    const MaxTime = 2500;
    setTimeout(() => setStatus(''), MaxTime);
  }, [status]);
  return (
    <S.Container>
      <S.Title>Registrar</S.Title>
      <S.Status status={ status }>{ status }</S.Status>
      <RegisterForm />
      <S.Buttons>
        <Button
          dataTestId="signup-btn"
          onClick={ handleButton }
          disabled={ !validRegister }
        >
          Cadastrar
        </Button>
      </S.Buttons>

    </S.Container>
  );
};

export default Register;
