import React from 'react';
import PaperContainer from '../../../design-system/containers/PaperContainer';
import CheckoutCard from '../components/CheckoutCard';

function Checkout() {
  return (
    <PaperContainer title="Checkout" testid="top-title">
      <CheckoutCard />
    </PaperContainer>
  );
}

export default Checkout;
