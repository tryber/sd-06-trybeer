import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router';
import MenuAdmin from '../../Components/MenuAdmin';
import CardOrdersAdmin from '../../Components/CardOrdersAdmin';
import AppContext from '../../context/AppContext';
import * as S from './style';

const AdminOrders = () => {
  const history = useHistory();
  const { setEmail, setPassword } = useContext(AppContext);

  useEffect(() => {
    setEmail('');
    setPassword('');
    if (!window.localStorage.token) {
      history.push('/login');
    }
  }, [setEmail, setPassword]);

  return (
    <div>
      <S.Container>
        <S.SideBar>
          <MenuAdmin><p data-testid="top-title">Admin Pedido</p></MenuAdmin>
        </S.SideBar>
        <S.CardsOrder>
          <S.Title color="#3700B3">Pedidos</S.Title>
          <CardOrdersAdmin />
        </S.CardsOrder>
      </S.Container>
    </div>
  );
};

export default AdminOrders;
