import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { logOff } from '../services/localStorage';
import MenuOption from './MenuOption';

const SideMenu = ({ menuOptions }) => {
  const pathname = window.location.href;
  const isAdmin = pathname.includes('admin');

  return (
    <div className={ isAdmin ? 'side-menu-container menuAdmin' : 'side-menu-container' }>
      { menuOptions.map(({ text, idTest, route }) => (
        <MenuOption key={ idTest } route={ route } text={ text } idTest={ idTest } />
      ))}
      <Link to="/login">
        <button
          onClick={ () => logOff() }
          data-testid="side-menu-item-logout"
          type="button"
        >
          Sair
        </button>
      </Link>
    </div>
  );
};

SideMenu.propTypes = {
  menuOptions: PropTypes.instanceOf(Object).isRequired,
};

export default SideMenu;
