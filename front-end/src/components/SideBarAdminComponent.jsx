import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from './HeaderComponent';

function SideBarAdmin() {
  const history = useHistory();

  return (
    <div className="admin-side-bar-container">
      <Header text="TryBeer" />
      <button
        type="button"
        data-testid="side-menu-item-orders"
        onClick={ () => history.push('/admin/home') }
        className="bttn_sidebar_admin"

      >
        Pedidos
      </button>
      <button
        type="button"
        data-testid="side-menu-item-profile"
        onClick={ () => history.push('/admin/profile') }
        className="bttn_sidebar_admin"
      >
        Perfil
      </button>
      <button
        type="button"
        data-testid="side-menu-item-logout"
        onClick={ () => history.push('/login') }
        className="bttn_sidebar_admin_botton"
      >
        Sair
      </button>
    </div>
  );
}

export default SideBarAdmin;
