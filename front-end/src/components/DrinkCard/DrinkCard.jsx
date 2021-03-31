import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { parseCartPrice } from '../../utils/parseValues';

import { addItem,
  subtractItem,
  setCart } from '../../store/LocalStorage/actions';
import { getCart,
  getFullCartPrice } from '../../store/LocalStorage/provider';
import './drinkCard.css';

const syncStorageWithCart = (cartItem, id) => {
  const newCartItem = { ...cartItem, default_product: false };
  const oldStorage = getCart();
  let newStorage = [];
  if (newCartItem) {
    if (!oldStorage) {
      newStorage = [{ ...newCartItem }];
      return setCart(newStorage);
    }
    const isItemInCart = oldStorage.filter((product) => product.id === id).length;
    if (!isItemInCart) {
      newStorage = [...oldStorage, { ...newCartItem }];
      return setCart(newStorage);
    }
    if (isItemInCart) {
      const oldStorageWithoutItem = oldStorage.filter((product) => product.id !== id);
      if (newCartItem.quantity === 0) {
        return setCart(oldStorageWithoutItem);
      }
      newStorage = [...oldStorageWithoutItem, { ...newCartItem }];
      return setCart(newStorage);
    }
  }
};

const getItemInStorage = (urlImage, name, price, id) => {
  const cart = getCart();
  const product = { id, name, price, quantity: 0, urlImage, default_product: true };

  if (!cart) return product;

  if (cart) {
    const result = cart.find((item) => item.id === id);

    if (!result) return product;

    return result;
  }
};

export default function DrinkCard({ product, index, setCartSum }) {
  const { url_image: urlImage, name, price, id } = product;
  const [cartItem, setCartItem] = useState(getItemInStorage(urlImage, name, price, id));

  useEffect(() => {
    if (!cartItem.default_product) {
      syncStorageWithCart(cartItem, id);
      setCartSum(getFullCartPrice());
    }
  }, [cartItem, id, setCartSum]);

  return (
    <div className="card-body">
      <div className="card">
        <div className="card-img">
          <img
            className="img"
            data-testid={ `${index}-product-img` }
            alt={ `${name} product card` }
            src={ urlImage }
          />
          <p
            className="price-tag"
            data-testid={ `${index}-product-price` }
          >
            {parseCartPrice(price)}
          </p>
          <p className="name-tag" data-testid={ `${index}-product-name` }>{name}</p>
        </div>
        <div className="content">
          <div className="btn">
            <button
              type="button"
<<<<<<< HEAD
              className="minus-button"
=======
              className="minus-button golden"
>>>>>>> 66384363d5147dd019f6ec635ec3336813173fe6
              data-testid={ `${index}-product-minus` }
              //  VOLTAR PRO SUBTRACT ITEM
              onClick={ () => subtractItem(cartItem, setCartItem) }
            >
              -
            </button>
            <div className="quantity">
              <div data-testid={ `${index}-product-qtd` }>{cartItem.quantity}</div>
            </div>
            <button
              type="button"
<<<<<<< HEAD
              className="plus-button"
=======
              className="plus-button golden"
>>>>>>> 66384363d5147dd019f6ec635ec3336813173fe6
              data-testid={ `${index}-product-plus` }
              onClick={ () => addItem(cartItem, setCartItem) }
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

DrinkCard.propTypes = {
  product: PropTypes.arrayOf(PropTypes.string).isRequired,
  setCartSum: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};
