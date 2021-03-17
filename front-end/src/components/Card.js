import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import context from '../context/Context';

function Card(props) {
  const [quantity, setQuantity] = useState(0);
  const { totalCart, setTotalCart } = useContext(context);
  const { index, name, price, urlImage } = props;
  const fixedUrl = urlImage.replace('images/', '');

  const handleClickPlus = async () => {
    await setQuantity(quantity + 1);
    await setTotalCart(totalCart + parseFloat(price));
  };

  const handleClickMinus = async () => {
    if (quantity > 0) {
      await setQuantity(quantity - 1);
      await setTotalCart(totalCart - parseFloat(price));
    }
  };

  return (
    <div className="card">
      <p className="btn-success price-card" data-testid={ `${index}-product-price` }>{`R$ ${price.replace('.', ',')}`}</p>
      <img
        width="111px"

        data-testid={ `${index}-product-img` }
        src={ fixedUrl }
        alt="product"
      />
      <h4 data-testid={ `${index}-product-name` }>{ name }</h4>
      <button
        className="btn-success btn-card"
        type="button"
        onClick={ handleClickMinus }
        data-testid={ `${index}-product-minus` }
      >
        -
      </button>
      <span className="quantity-card" data-testid={ `${index}-product-qtd` }>{ quantity }</span>
      <button
        className="btn-success btn-card"
        type="button"
        onClick={ handleClickPlus }
        data-testid={ `${index}-product-plus` }
      >
        +
      </button>
    </div>
  );
}

Card.propTypes = {
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  urlImage: PropTypes.string.isRequired,
  // [urlImage]replace: PropTypes.function.isRequired,
};

export default Card;
