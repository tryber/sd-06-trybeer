import React, { useState, useEffect, useContext } from 'react';
import { GlobalContext } from '../../Contexts/GlobalContext';

import CompMenuTop from './styles';

const MenuTop = () => {
  const [pathName, setPathName] = useState('');

  const { stateSideBar, setStateSideBar } = useContext(GlobalContext);

  useEffect(() => {
    switch (window.location.pathname) {
    case '/profile':
      return setPathName('Meu perfil');
    case '/products':
      return setPathName('TryBeer');
    default:
      return '';
    }
  }, []);

  return (
    <CompMenuTop className="side-menu-container">
      <button type="button" onClick={ () => setStateSideBar(!stateSideBar) }>
        <img
          src="/images/cardapio.png"
          alt="Botão MenuTop"
          data-testid="top-hamburguer"
        />
      </button>
      <h2 data-testid="top-title">{pathName}</h2>
    </CompMenuTop>
  );
};

export default MenuTop;
