import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import GlobalContext from '../../context/Context';
import MenuList from './MenuItems';
import BoxMenu from './BoxMenu';

function PageMenu({ pageName }) {
  const { menuStatus } = useContext(GlobalContext);

  return (
    <nav className="fixed flex flex-col top-0 left-0 p-3 w-full">
      <BoxMenu pageName={ pageName } />
      { !menuStatus && <MenuList /> }
    </nav>
  );
}

PageMenu.propTypes = {
  pageName: PropTypes.string.isRequired,
};

export default PageMenu;
