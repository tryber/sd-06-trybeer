import React from 'react';
import Form from '../components/admin/Form';
import PaperContainer from '../../../design-system/containers/PaperContainer';

const ProfileAdmin = () => (
  <PaperContainer title="My Profile">
    <p className="hidden" data-testid="top-title">Meu perfil</p>
    <Form />
  </PaperContainer>
);

export default ProfileAdmin;
