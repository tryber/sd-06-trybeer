import React from 'react';
import PropTypes from 'prop-types';
// import '../css/ProductCardAdmin.css';

function ProductCardAdmin(props) {
  const { product, index } = props;
  const { productName, productPrice, quantity } = product;
  const productTotal = parseFloat(productPrice) * parseFloat(quantity);

  return (
    <div className="card-container">
      <section className="product-info">
        <span data-testid={ `${index}-product-qtd` }>{ quantity }</span>
        <spam data-testid={ `${index}-product-name` }>{ ` - ${productName}` }</spam>
        <spam
          data-testid={ `${index}-product-total-value` }
        >
          {`R$ ${productTotal.toFixed(2).toString().replace('.', ',')}`}
        </spam>

        <spam
          data-testid={ `${index}-order-unit-price` }
        >
          {`(R$ ${productPrice.replace('.', ',')})`}
        </spam>

      </section>
    </div>
  );
}

ProductCardAdmin.propTypes = {
  product: PropTypes.shape({
    productName: PropTypes.string.isRequired,
    productPrice: PropTypes.string.isRequired,
    quantity: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default ProductCardAdmin;
