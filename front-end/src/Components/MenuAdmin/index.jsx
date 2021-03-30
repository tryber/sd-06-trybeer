import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../Button';
import * as S from './style';

const MenuAdmin = () => {
  const history = useHistory();

  const handleRoute = (path) => {
    history.push(path);
  };
  return (
    <S.Container>
      <S.Title data-testid="top-title">TryBeer</S.Title>
      <S.WrapperButtons>
        <Button
          dataTestId="side-menu-item-orders"
          onClick={ () => handleRoute('/admin/orders') }
        >
          Pedidos

        </Button>
        <Button
          dataTestId="side-menu-item-profile"
          onClick={ () => handleRoute('/admin/profile') }
        >
          Perfil

        </Button>
      </S.WrapperButtons>
      <S.ButtonLeave>
        <Button
          color="#b5179e"
          dataTestId="side-menu-item-logout"
          onClick={ () => handleRoute('/') }
        >
          Sair

        </Button>
      </S.ButtonLeave>
    </S.Container>
  );
};

export default MenuAdmin;
