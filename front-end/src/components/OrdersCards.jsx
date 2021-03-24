import React from 'react';
import PropTypes from 'prop-types';

function OrdersCards({ index }) {
  return (
    <div className="orderCards">
      <h4 data-testid={ `${index}-order-number` }>
        {/* Pedido { numberOrder } */}
      </h4>
      <p data-testid={ `${index}-order-address` }>
        {/* { adress } */}
      </p>
      <h4 data-testid={ `${index}-order-total-value` }>
        {/* R${ price } */}
      </h4>
      <h3 data-testid={ `${index}-order-status` }>
        {/* { status } */}
      </h3>
    </div>
  );
}

OrdersCards.propTypes = {
  index: PropTypes.number.isRequired,
};

export default OrdersCards;
