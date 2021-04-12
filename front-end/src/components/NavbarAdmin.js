import React, { useContext, useState, useEffect } from 'react';
import UserContext from '../context/UserContext';
import { LinkElement } from './index';
import { DivNavContainer, DivNavContent } from './styled-components';
import SidebarData from './SidebarData';
import SidebarAdminData from './SidebarAdminData';

const NavbarAdmin = () => {
  const { sidebar, setSidebar } = useContext(UserContext);
  const [data, setData] = useState([]);
  const showSidebar = () => setSidebar(!sidebar);

  useEffect(() => {
    const roleUser = JSON.parse(localStorage.user).role;
    if (roleUser === 'administrator' ? setData(SidebarAdminData) : setData(SidebarData));
  }, []);

  return (
    <DivNavContainer admin>
      <DivNavContent
        className="admin-side-bar-container"
      >
        {
          data.map((link, index) => (
            <LinkElement
              key={ index }
              id={ link.id }
              label={ link.label }
              to={ link.path }
              onClick={ showSidebar }
            />
          ))
        }
      </DivNavContent>
    </DivNavContainer>
  );
};

export default NavbarAdmin;
