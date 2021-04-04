import React from 'react';
import Form from '../components/Form';
import PaperContainer from '../../../design-system/containers/PaperContainer';

const Login = () => (
  <div className="h-screen flex items-center">
    <PaperContainer title="Login">
      <Form />
    </PaperContainer>
  </div>
);

export default Login;
