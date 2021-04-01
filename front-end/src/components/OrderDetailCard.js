import React from 'react';
import PropTypes from 'prop-types';

const OrderDetailCard = ({ product, index, isAdmin }) => {
  const { quantity, name, price } = product;
  return (
    <li
      style={ { border: '2px solid black' } }
    >
      <h3 data-testid={ `${index}-product-qtd` }>
        { quantity }
      </h3>
      <h3 data-testid={ `${index}-product-name` }>
        { name }
      </h3>
      { isAdmin && (
        <h3
          className="flexNone"
          data-testid={ `${index}-order-unit-price` }
        >
          { `(R$ ${parseFloat(+price).toFixed(2).replace('.', ',')})` }
        </h3>
      ) }
      <h3
        className="flexNone"
        data-testid={ `${index}-product-total-value` }
      >
        { `R$ ${parseFloat(+price * +quantity).toFixed(2).replace('.', ',')}` }
      </h3>
    </li>
  );
};

OrderDetailCard.propTypes = {
  product: PropTypes.instanceOf(Object).isRequired,
  index: PropTypes.number.isRequired,
  isAdmin: PropTypes.bool.isRequired,
};

export default OrderDetailCard;
