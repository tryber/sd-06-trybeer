import React from 'react';
import { Redirect } from 'react-router-dom';
import Form from '../components/FormRegister';
import PaperContainer from '../../../design-system/containers/PaperContainer';

const Register = () => {
  const storage = JSON.parse(localStorage.getItem('user'));
  const role = storage ? storage.role : '';
  const existToken = storage ? storage.token : false;

  return (
    <div className="max-w-sm">
      { (existToken && role === 'client') && <Redirect to="/products" /> }
      { (existToken && role === 'administrator') && <Redirect to="/profile" /> }
      <PaperContainer>
        <p className="text-2xl">Register</p>
        <Form />
      </PaperContainer>
    </div>
  );
};

export default Register;
