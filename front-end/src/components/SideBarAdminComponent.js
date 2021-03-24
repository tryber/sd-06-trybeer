import React from 'react';
// import { useHistory } from 'react-router-dom';

function SideBarAdmin() {
  // const history = useHistory();

  return (
    <div className="admin-side-bar-container">
      <h1>TryBeer</h1>
      <button
        type="button"
        data-testid="side-menu-item-orders"
        // onClick={ () => history.push('/') }
        classame="bttn_sidebar_admin"
      >
        Pedidos
      </button>
      <button
        type="button"
        data-testid="side-menu-item-profile"
        // onClick={ () => history.push('/') }
        className="bttn_sidebar_admin"
      >
        Perfil
      </button>
      <button
        type="button"
        data-testid="side-menu-item-logout"
        // onClick={ () => history.push('/') }
        className="bttn_sidebar_admin_botton"
      >
        Sair
      </button>
    </div>
  );
}

export default SideBarAdmin;
