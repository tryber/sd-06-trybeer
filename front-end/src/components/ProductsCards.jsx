import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import BeersAppContext from '../context/BeersAppContext';
import '../style/ProductCard.css';

function ProductsCard({ element, index }) {
  const {
    productQuantity,
    setProductQuantity,
  } = useContext(BeersAppContext);

  const { name, price, id } = element;

  const storageInitialState = () => {
    const objQuantity = productQuantity
      .find((objStoraged) => objStoraged.id === id);
    if (objQuantity) return objQuantity.qnt;
    return 0;
  };

  const [qnt, setQnt] = useState(storageInitialState());

  useEffect(() => {
    const ola = productQuantity
      .filter((objStoraged) => objStoraged.id !== id);
    if (qnt !== 0) setProductQuantity([...ola, { id, price, qnt }]);
    else setProductQuantity(ola);
  }, [qnt]);

  // url_image

  const clickPlus = () => {
    setQnt(qnt + 1);
  };

  const clickMinus = () => {
    if (qnt > 0) {
      setQnt(qnt - 1);
    }
  };

  const commaPrice = price.replace('.', ',');

  return (
    <div className="productCards">
      <img
        alt="fotoProduto"
        data-testid={ `${index}-product-img` }
      />
      <p data-testid={ `${index}-product-name` } className="txt-productCards">{ name }</p>
      <p
        className="txt-productCards"
        data-testid={ `${index}-product-price` }
      >
        { `R$ ${commaPrice}` }
      </p>
      <div className="productCards-qtt">
        <button
          type="button"
          data-testid={ `${index}-product-plus` }
          onClick={ clickPlus }
          className="bttn-productCards"
        >
          +
        </button>
        <p data-testid={ `${index}-product-qtd` } className="qtt-productCards">{ qnt }</p>
        <button
          type="button"
          data-testid={ `${index}-product-minus` }
          onClick={ clickMinus }
          className="bttn-productCards"
        >
          -
        </button>
      </div>
    </div>
  );
}

ProductsCard.propTypes = {
  element: PropTypes.arrayOf(PropTypes.object).isRequired,
  index: PropTypes.number.isRequired,
};

export default ProductsCard;
