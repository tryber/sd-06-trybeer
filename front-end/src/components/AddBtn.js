import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ProductsContext from '../context/ProductsContext';
import { updateCartItemsQty, getCartItems } from '../services/localStorage';
import Plus from '../assets/Plus.svg';

function AddBtn({ productName, index, unitPrice, activatePulse }) {
  const { setItemsInCart } = useContext(ProductsContext);

  const changeProductQuantity = () => {
    activatePulse();
    const cartItems = getCartItems();
    const alreadyInCart = cartItems.find((product) => productName === product.name);
    if (alreadyInCart) {
      const updatedList = cartItems.reduce((newList, currentProduct) => {
        if (productName === currentProduct.name) {
          currentProduct.quantity += 1;
          currentProduct.price = unitPrice * currentProduct.quantity;
          return newList.concat(currentProduct);
        }
        return newList.concat(currentProduct);
      }, []);
      updateCartItemsQty(updatedList);
      setItemsInCart(updatedList);
    } else {
      const newItem = {
        name: productName,
        quantity: 1,
        price: unitPrice,
      };
      const updatedList = cartItems.concat(newItem);
      updateCartItemsQty(updatedList);
      setItemsInCart(updatedList);
    }
  };

  return (
    <input
      type="image"
      className="quantity-btn"
      data-testid={ `${index}-product-plus` }
      onClick={ changeProductQuantity }
      src={ Plus }
      alt="plus-btn"
      width="34"
    />
  );
}

AddBtn.propTypes = {
  productName: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  unitPrice: PropTypes.number.isRequired,
  activatePulse: PropTypes.func.isRequired,
};

export default AddBtn;
