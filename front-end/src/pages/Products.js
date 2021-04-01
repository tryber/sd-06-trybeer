import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import MenuAndTopBar from '../components/MenuAndTopBar';
import ProductsContext from '../context/ProductsContext';
import { getCartItems, getUserToken } from '../services/localStorage';
import API from '../services/API';
import '../styles/pages/Products.css';

function Products({ location: { pathname } }) {
  const history = useHistory();
  const {
    productsList,
    setProductsList,
    itemsInCart,
    setItemsInCart,
  } = useContext(ProductsContext);
  const [isLoading, setIsLoading] = useState(true);
  const updateProductList = async () => {
    const fetchedProductsList = await API.getProducts();
    setProductsList(fetchedProductsList);
  };

  const goToCheckout = () => history.push('/checkout');

  const checkToken = async () => {
    const token = getUserToken();
    const response = await API.validateUserToken(token);
    if (!response) history.push('login');
  };

  const handleVisible = () => {
    if (itemsInCart.length) return false;
    return true;
  };

  useEffect(() => {
    checkToken();
    updateProductList();
    setItemsInCart(getCartItems());
    setIsLoading(false);
    // eslint-disable-next-line
  }, []);

  return (
    <div className="productsPageContainer">
      <MenuAndTopBar title="TryBeer" pathname={ pathname } />
      <div className="checkoutBtnContainer">
        <button
          type="button"
          data-testid="checkout-bottom-btn"
          onClick={ goToCheckout }
          disabled={ handleVisible() }
          className="checkoutBtn"
        >
          Ver Carrinho
          <span data-testid="checkout-bottom-btn-value">
            {`R$ ${parseFloat(itemsInCart
              .reduce((acc, curr) => acc + +curr.price, 0)).toFixed(2)
              .replace('.', ',')}` }
          </span>
        </button>
      </div>
      <div className="row productsContainer">
        { !isLoading && productsList.map((product, index) => {
          const { name } = product;

          return (<ProductCard product={ product } indexNumber={ index } key={ name } />);
        }) }
      </div>
    </div>
  );
}

Products.propTypes = {
  location: PropTypes.instanceOf(Object).isRequired,
};

export default Products;
