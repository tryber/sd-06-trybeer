import React from 'react';
import PropTypes from 'prop-types';
import TopBar from './TopBar';
import SideMenu from './SideMenu';
import '../styles/components/MenuAndTopBar.css';

const MenuAndTopBar = ({ pathname, title }) => {
  const adminMenuOptions = [
    { text: 'Pedidos', route: '/admin/orders', idTest: 'side-menu-item-orders' },
    { text: 'Perfil', route: '/admin/profile', idTest: 'side-menu-item-profile' },
  ];

  const clientMenuOptions = [
    { text: 'Meu Perfil', route: '/profile', idTest: 'side-menu-item-my-profile' },
    { text: 'Produtos', route: '/products', idTest: 'side-menu-item-products' },
    { text: 'Meus Pedidos', route: '/orders', idTest: 'side-menu-item-my-orders' },
  ];

  const isAdmin = pathname.includes('admin');

  return (
    <div className={ isAdmin ? 'sideBarAdjust' : '' }>
      { isAdmin && <SideMenu menuOptions={ adminMenuOptions } /> }
      { !isAdmin && (
        <TopBar
          text={ title }
          sideMenuOptions={ clientMenuOptions }
          isAdmin={ isAdmin }
        />
      ) }
    </div>
  );
};

MenuAndTopBar.propTypes = {
  pathname: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default MenuAndTopBar;
