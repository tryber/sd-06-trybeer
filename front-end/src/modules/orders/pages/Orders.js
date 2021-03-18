import React from 'react';
import { Redirect } from 'react-router-dom';
import PaperContainer from '../../../design-system/containers/PaperContainer';
import PageMenu from '../../../design-system/side_menu/PageMenu';

const Orders = () => {
  const storage = JSON.parse(localStorage.getItem('user'));
  const existToken = storage ? storage.token : false;

  return (
    <div>
      { !existToken && <Redirect to="/login" /> }
      <PageMenu pageName="Meus Pedidos" />
      <PaperContainer>
        <p>Produtos</p>
      </PaperContainer>
    </div>
  );
};
export default Orders;
