import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import ProductsContext from '../context/ProductsContext';
import AddBtn from './AddBtn';
import RemoveBtn from './RemoveBtn';
import '../styles/components/ProductCard.css';

function ProductCard({ product: {
  url_image: urlImage,
  name,
  price,
}, indexNumber }) {
  const [pulse, setPulse] = useState(false);
  const { itemsInCart } = useContext(ProductsContext);
  const pulseAnimationTime = 700;
  let quantity = 0;
  if (itemsInCart.length > 0) {
    const itemFound = itemsInCart.find((product) => name === product.name);
    if (itemFound) {
      quantity = itemFound.quantity;
    }
  }

  const activatePulse = () => {
    setPulse(true);
    setTimeout(() => setPulse(false), pulseAnimationTime);
  };

  return (
    <div className="col-md productCardContainer">
      <img
        src={ urlImage }
        alt={ name }
        data-testid={ `${indexNumber}-product-img` }
      />
      <p data-testid={ `${indexNumber}-product-name` }>{ name }</p>
      <p data-testid={ `${indexNumber}-product-price` }>
        { `R$ ${parseFloat(price).toFixed(2).replace('.', ',')}` }
      </p>
      <div className="quantityContainer">
        <div className="quantityBtnContainer">
          <RemoveBtn
            productName={ name }
            index={ indexNumber }
            currentQuantity={ quantity }
            unitPrice={ +price }
            activatePulse={ activatePulse }
          />
        </div>
        <div className="quantityBtnContainer">
          <p
            data-testid={ `${indexNumber}-product-qtd` }
            className={ pulse ? 'pulseOnce' : '' }
          >
            { quantity }
          </p>
        </div>
        <div className="quantityBtnContainer">
          <AddBtn
            productName={ name }
            index={ indexNumber }
            unitPrice={ +price }
            activatePulse={ activatePulse }
          />
        </div>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    url_image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
  }).isRequired,
  indexNumber: PropTypes.number.isRequired,
};

export default ProductCard;
