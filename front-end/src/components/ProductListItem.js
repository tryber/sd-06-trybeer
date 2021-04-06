import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import TrybeerContext from '../context/TrybeerContext';
import formatedPrice from '../utils/formatedPrice';
import './ComponentsCSS/ProductListItem.css';

const ProductListItem = ({ index, id, name, quantity, price }) => {
  const totalPrice = (quantity * price).toFixed(2);
  const { removeItemCart } = useContext(TrybeerContext);

  return (
    <div className="containerList">
      <p data-testid={ `${index}-product-qtd-input` }>
        Unidades:
        { quantity }
      </p>
      <p data-testid={ `${index}-product-name` }>
        Nome do Produto:
        { name }
      </p>
      <p data-testid={ `${index}-product-total-value` }>
        Valor:
        { formatedPrice(totalPrice) }
      </p>
      <p data-testid={ `${index}-product-unit-price` }>
        Preço da unidade:
        { `(${formatedPrice(price)} un)` }
      </p>
      <button
        data-testid={ `${index}-removal-button` }
        type="button"
        onClick={ () => removeItemCart(id) }
        className="closeButton"
      >
        X
      </button>
    </div>
  );
};

ProductListItem.propTypes = {
  index: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
};

export default ProductListItem;
