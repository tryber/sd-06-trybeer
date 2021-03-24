import React from 'react';
import SideBarAdmin from '../components/SideBarAdminComponent';

function AdminProfile() {
  return (
    <div className="admin_profile">
      <SideBarAdmin />
      <p data-testid="profile-name">
        Nome:
        {/* <span>{ nome }</span> */}
      </p>
      <p data-testid="profile-email">
        Email:
        {/* <span>{ email }</span> */}
      </p>
    </div>
  );
}

export default AdminProfile;
