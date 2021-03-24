import React, { useContext } from 'react';
import SideBarAdmin from '../components/SideBarAdminComponent';
import BeersAppContext from '../context/BeersAppContext';

function AdminProfile() {
  const {
    user: { name, email },
  } = useContext(BeersAppContext);

  return (
    <div className="admin_profile">
      <SideBarAdmin />
      <p data-testid="profile-name">
        Nome:
        <span>{ name }</span>
      </p>
      <p data-testid="profile-email">
        Email:
        <span>{ email }</span>
      </p>
    </div>
  );
}

export default AdminProfile;
