import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Input from '../components/Input';
import SubmitButton from '../components/SubmitButton';
import ProductsContext from '../context/ProductsContext';
import MenuAndTopBar from '../components/MenuAndTopBar';
import {
  updateCartItemsQty,
  getCartItems,
  getUserToken,
  getUserData,
  clearCart,
} from '../services/localStorage';
import API from '../services/API';
import '../styles/pages/Checkout.css';
import Remove from '../assets/Remove.svg';

function Checkout({ location: { pathname } }) {
  const history = useHistory();
  const { itemsInCart, setItemsInCart, productsList } = useContext(ProductsContext);
  const [finished, setFinished] = useState(false);
  const [street, setStreet] = useState('');
  const [houseNumber, setHouseNumber] = useState('');

  const deleteItem = (product) => {
    const cartItems = getCartItems();
    const updatedList = cartItems.reduce((newList, currentProduct) => {
      if (product.name === currentProduct.name) {
        return newList;
      }
      return newList.concat(currentProduct);
    }, []);
    updateCartItemsQty(updatedList);
    setItemsInCart(updatedList);
  };

  const checkToken = async () => {
    const token = getUserToken();
    const response = await API.validateUserToken(token);
    if (!response) history.push('login');
  };

  const handleFinishOrder = () => {
    const TIME_OUT = 2000;
    setFinished(true);
    const userInfo = getUserData();
    userInfo.deliveryNumber = houseNumber;
    userInfo.deliveryAddress = street;
    API.sendOrder(itemsInCart, userInfo, productsList);
    setTimeout(() => {
      clearCart();
      setItemsInCart([]);
      history.push('/products');
    }, TIME_OUT);
  };

  useEffect(() => {
    setItemsInCart(getCartItems());
    checkToken();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <MenuAndTopBar title="Finalizar pedido" pathname={ pathname } />
      <div className="checkoutContainer">
        <div className="cartContainer">
          <h2 data-testid="top-title">Produtos</h2>
          { itemsInCart.length === 0 ? <p>Não há produtos no carrinho</p>
            : (
              <ul>
                { itemsInCart.map((product, index) => (
                  <li key={ product.name }>
                    <span data-testid={ `${index}-product-qtd-input` }>
                      { product.quantity }
                    </span>
                    <span data-testid={ `${index}-product-name` }>
                      { product.name }
                    </span>
                    <span
                      className="flexNone"
                      data-testid={ `${index}-product-unit-price` }
                    >
                      { `(R$ ${parseFloat(product.price / product.quantity)
                        .toFixed(2).replace('.', ',')} un)` }
                    </span>
                    <span
                      className="flexNone"
                      data-testid={ `${index}-product-total-value` }
                    >
                      { `R$ ${parseFloat(product.price).toFixed(2).replace('.', ',')}` }
                    </span>
                    <div className="remove-btn-container">
                      <input
                        type="image"
                        // className="quantity-btn"
                        onClick={ () => deleteItem(product) }
                        data-testid={ `${index}-removal-button` }
                        src={ Remove }
                        alt="remove-btn"
                        width="34"
                      />
                    </div>
                  </li>
                )) }
              </ul>
            ) }
          <h2 data-testid="order-total-value">
            { `Total: R$ ${parseFloat(itemsInCart
              .reduce((acc, curr) => acc + +curr.price, 0))
              .toFixed(2).replace('.', ',')}.` }
          </h2>
        </div>
        <form>
          <h2>Endereço</h2>
          <Input
            id="checkout-street-input"
            name="Rua:"
            field={ street }
            setField={ setStreet }
          />
          <Input
            id="checkout-house-number-input"
            name="Número da casa:"
            field={ houseNumber }
            setField={ setHouseNumber }
          />
        </form>
        <SubmitButton
          onClick={ handleFinishOrder }
          name="Finalizar Pedido"
          disabled={ itemsInCart.length === 0 || !street || !houseNumber }
          id="checkout-finish-btn"
        />
        { finished && (
          <div className="modalContainer">
            <h2>Compra realizada com sucesso!</h2>
          </div>
        ) }
      </div>
    </div>
  );
}

Checkout.propTypes = {
  location: PropTypes.instanceOf(Object).isRequired,
};

export default Checkout;
