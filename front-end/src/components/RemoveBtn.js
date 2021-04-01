import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ProductsContext from '../context/ProductsContext';
import { updateCartItemsQty, getCartItems } from '../services/localStorage';
import Minus from '../assets/Minus.svg';

function RemoveBtn({ productName, index, currentQuantity, unitPrice, activatePulse }) {
  const { setItemsInCart } = useContext(ProductsContext);

  const changeProductQuantity = () => {
    activatePulse();
    const cartItems = getCartItems();

    const updatedList = cartItems.reduce((newList, currentProduct) => {
      if (productName === currentProduct.name && currentQuantity > 1) {
        currentProduct.quantity -= 1;
        currentProduct.price = unitPrice * currentProduct.quantity;
        return newList.concat(currentProduct);
      }
      if (productName === currentProduct.name && currentQuantity === 1) return newList;
      return newList.concat(currentProduct);
    }, []);
    updateCartItemsQty(updatedList);
    setItemsInCart(updatedList);
  };

  return (
    <input
      type="image"
      className="quantity-btn"
      data-testid={ `${index}-product-minus` }
      onClick={ changeProductQuantity }
      src={ Minus }
      alt="minus-btn"
      width="34"
    />
  );
}

RemoveBtn.propTypes = {
  productName: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  currentQuantity: PropTypes.number.isRequired,
  unitPrice: PropTypes.number.isRequired,
  activatePulse: PropTypes.func.isRequired,
};

export default RemoveBtn;
