import React from 'react';
import { Link } from 'react-router-dom';

function MenuList() {
  const menuItems = ['Produtos', 'Meus pedidos', 'Meu Perfil'];
  const endPoints = ['/products', '/orders', '/profile'];
  const testId = ['products', 'my-orders', 'my-profile'];

  const HandleExit = () => {
    const exitMenu = (
      <Link to="/login">
        <button
          onClick={ () => localStorage.removeItem('user') }
          type="button"
        >
          Sair
        </button>
      </Link>
    );

    return exitMenu;
  };

  return (
    <ul className="flex flex-col bg-primary w-2/5 text-xl rounded-b-md bg-opacity-90">
      {menuItems.map((name, index) => (
        <li key={ `menu-${name}` } data-testid={ `side-menu-item-${testId[index]}` }>
          <Link to={ endPoints[index] }>
            { name }
          </Link>
        </li>
      ))}
      <HandleExit />
    </ul>
  );
}

export default MenuList;
