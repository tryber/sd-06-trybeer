import React from 'react';
import Form from '../components/Form';
import PaperContainer from '../../../design-system/containers/PaperContainer';

const Register = () => (
  <div className="h-screen flex items-center">
    <PaperContainer title="Register">
      <Form />
    </PaperContainer>
  </div>
);

export default Register;
