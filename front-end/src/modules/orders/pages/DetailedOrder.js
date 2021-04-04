import React from 'react';
import PaperContainer from '../../../design-system/containers/PaperContainer';
import DetailedOrderCard from '../components/DetailedOrderCard';

const DetailedOrder = () => (
  <PaperContainer title="Manage Order">
    <p className="hidden" data-testid="top-title">Meus pedidos</p>
    <DetailedOrderCard />
  </PaperContainer>
);

export default DetailedOrder;
