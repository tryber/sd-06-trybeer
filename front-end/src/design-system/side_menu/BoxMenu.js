import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import GlobalContext from '../../context/Context';

function BoxMenu({ pageName }) {
  const { setMenuStatus, menuStatus } = useContext(GlobalContext);

  const handleMenu = () => {
    setMenuStatus(!menuStatus);
  };

  return (
    <nav className="flex justify-between">
      <button
        onClick={ () => handleMenu() }
        type="button"
        data-testid="top-hamburguer"
      >
        <i className="fas fa-bars fa-2x" />
      </button>
      <p className="text-2xl flex">{ pageName }</p>
    </nav>
  );
}

BoxMenu.propTypes = {
  pageName: PropTypes.string.isRequired,
};

export default BoxMenu;
