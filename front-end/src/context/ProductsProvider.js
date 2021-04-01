import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ProductsContext from './ProductsContext';

function ProductsProvider({ children }) {
  const [itemsInCart, setItemsInCart] = useState([]);
  const [productsList, setProductsList] = useState([]);
  const [orders, setOrders] = useState([]);

  const providerValue = {
    itemsInCart,
    setItemsInCart,
    productsList,
    setProductsList,
    orders,
    setOrders,
  };

  return (
    <ProductsContext.Provider
      value={ providerValue }
    >
      { children }
    </ProductsContext.Provider>
  );
}

ProductsProvider.propTypes = { children: PropTypes.element.isRequired };

export default ProductsProvider;
