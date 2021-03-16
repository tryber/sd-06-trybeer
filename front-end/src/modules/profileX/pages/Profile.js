import React from 'react';
import { Redirect } from 'react-router-dom';
import PaperContainer from '../../../design-system/containers/PaperContainer';

const Profile = () => {
  const storage = JSON.parse(localStorage.getItem('user'));
  const existToken = storage ? storage.token : false;

  return (
    <div className="w-full min-h-screen p-10 ">
      { (!existToken) && <Redirect to="/login" /> }
      <PaperContainer>
        <p className="text-2xl">Profile - Home Admin</p>
      </PaperContainer>
    </div>
  );
};

export default Profile;
