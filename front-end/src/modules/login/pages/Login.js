import React from 'react';
import Form from '../components/Form';
import PaperContainer from '../../../design-system/containers/PaperContainer';

const Login = (props) => (
  <div>
    <PaperContainer>
      <p>Login</p>
      <Form match={ props } />
    </PaperContainer>
  </div>
);

export default Login;
