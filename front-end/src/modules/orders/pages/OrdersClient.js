import React from 'react';
import PaperContainer from '../../../design-system/containers/PaperContainer';
import Gallery from '../components/Gallery';

const OrdersClient = () => (
  <PaperContainer title="My Orders">
    <p className="hidden" data-testid="top-title">Meus Pedidos</p>
    <Gallery />
  </PaperContainer>
);

export default OrdersClient;

//
