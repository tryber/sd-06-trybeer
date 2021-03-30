import React from 'react';
import PropTypes from 'prop-types';

import { FiPlus, FiMinus } from 'react-icons/fi';

import '../../styles/products/ProductCard.css';

const ProductCard = ({ product, index, plusItemCart, minusItemCart, handleQuantity }) => (
  <div className="productCard">
    <img
      alt={ `Cerveja ${product.name}` }
      data-testid={ `${index}-product-img` }
      className="cardImage"
      src={ product.url_image }
    />
    <span
      data-testid={ `${index}-product-price` }
    >
      { `R$ ${product.price.replace('.', ',')}` }
    </span>
    <span
      data-testid={ `${index}-product-name` }
    >
      { product.name }
    </span>
    <button
      type="button"
      name={ product.name }
      data-testid={ `${index}-product-plus` }
      onClick={ () => plusItemCart(product) }
    >
      <FiPlus />
    </button>
    <span
      data-testid={ `${index}-product-qtd` }
    >
      { handleQuantity(product) }
    </span>
    <button
      type="button"
      data-testid={ `${index}-product-minus` }
      onClick={ () => minusItemCart(product) }
    >
      <FiMinus />
    </button>
  </div>
);

ProductCard.propTypes = ({
  index: PropTypes.number.isRequired,
  product: PropTypes.objectOf(Object).isRequired,
  plusItemCart: PropTypes.func.isRequired,
  minusItemCart: PropTypes.func.isRequired,
  handleQuantity: PropTypes.func.isRequired,
});
// Pesquisar a maneira certa de validar função

export default ProductCard;
