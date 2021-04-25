import React from 'react';
import PropTypes from 'prop-types';
import * as S from './style';

const ProductItemOrdered = ({ product }) => (
  <S.Products>
    <p data-testid="0-product-qtd">{ product.quantity }</p>
    <p data-testid="0-product-name">{ product.name }</p>
    <p data-testid="0-product-total-value">
      R$
      {' '}
      { (product.price * product.quantity).toFixed(2).replace(/\./g, ',') }
    </p>
  </S.Products>
);

ProductItemOrdered.propTypes = {
  product: PropTypes.shape({
    quantity: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,

};

export default ProductItemOrdered;
