import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import ProductsContext from '../context/ProductsContext';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import {
  Container,
  Content,
  Input,
  Label,
  Button,
} from '../styles/styles';
import { registerOrder } from '../api/axiosApi';

export default function Checkout() {
  const history = useHistory();
  const {
    products,
    setProducts,
    totalPrice,
    setTotalPrice,
  } = useContext(ProductsContext);
  const [cartList, setCartList] = useState([]);
  const [address, setAddress] = useState(
    {
      street: '',
      number: '',
    },
  );
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const localStorageProfile = JSON.parse(localStorage.getItem('user'));
    console.log(localStorageProfile);
    if (localStorageProfile === null) {
      history.push('./login');
    }
  }, [history]);

  const cartValue = JSON.parse(localStorage.totalPrice);

  useEffect(() => {
    function setInitialState() {
      const productsInStorage = JSON.parse(localStorage.products);
      setProducts(productsInStorage);
      const productSelected = productsInStorage.filter((el) => el.quantity > 0);
      setCartList(productSelected);
    }
    setInitialState();
  }, [setProducts]);

  function excludeItemAndUpdateValue(product) {
    const itemPrice = product.price * product.quantity;
    const newPrice = cartValue - itemPrice;
    localStorage.setItem('totalPrice', JSON.stringify(newPrice));
    setTotalPrice(newPrice);
    product.quantity = 0;
    const cartListInState = [...cartList];
    const newCartList = cartListInState.filter((el) => el.quantity > 0);
    const allProducts = [...products];
    localStorage.setItem('products', JSON.stringify(allProducts));
    setCartList(newCartList);
  }

  function handleChange({ target }) {
    const { name, value } = target;
    setAddress({ ...address, [name]: value });
  }

  const { street, number } = address;
  const activeButton = street.length > 0 && number.length > 0 && cartList.length;

  const getDate = new Date();
  const year = getDate.getFullYear();
  const month = getDate.getMonth();
  const day = getDate.getDay();
  const hour = getDate.getHours();
  const minutes = getDate.getMinutes();
  const seconds = getDate.getSeconds();
  const date = (`${year}/${month}/${day} ${hour}:${minutes}:${seconds}`);

  function clear() {
    localStorage.setItem('products', []);
    localStorage.setItem('cartList', []);
  }

  async function handleCallApi() {
    const userStorage = JSON.parse(localStorage.user);
    const TIMEOUT = 2000;
    const { id } = userStorage;
    const value = JSON.stringify(totalPrice);
    const userID = JSON.stringify(id);
    await registerOrder({ value, date, userID, street, number });
    setSuccess(true);

    setTimeout(() => {
      history.push('/products');
      clear();
    }, TIMEOUT);
  }

  console.log(totalPrice);
  return (
    <section>
      <Header />
      <Navbar />
      <Container>
        <Content>
          {
            cartList.length ? cartList.map((product, index) => (
              <ul key={ index }>
                <li>
                  <h4
                    data-testid={ `${index}-product-name` }
                  >
                    { product.name }
                  </h4>
                  <p
                    data-testid={ `${index}-product-qtd-input` }
                  >
                    { product.quantity }
                  </p>
                  <p
                    data-testid={ `${index}-product-unit-price` }
                  >
                    { `(R$ ${product.price.replace('.', ',')} un)` }
                  </p>
                  <p
                    data-testid={ `${index}-product-total-value` }
                  >
                    { `${(product.price * product.quantity)
                      .toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}`}
                  </p>
                  <button
                    type="button"
                    data-testid={ `${index}-removal-button` }
                    onClick={ () => excludeItemAndUpdateValue(product) }
                  >
                    X
                  </button>
                </li>
              </ul>
            )) : <span> Não há produtos no carrinho  </span>
          }
          {
            success && <span>Compra realizada com sucesso!</span>
          }
          <h3
            data-testid="order-total-value"
          >
            {/* { `R$ ${(totalPrice).toFixed(2)}` } */}
            { `${cartValue
              .toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}` }
          </h3>
          <div>
            <Label> Rua </Label>
            <Input
              name="street"
              data-testid="checkout-street-input"
              onChange={ handleChange }
            />
            <Label> Número da casa </Label>
            <Input
              name="number"
              data-testid="checkout-house-number-input"
              onChange={ handleChange }
            />
            <Button
              disabled={ !activeButton }
              data-testid="checkout-finish-btn"
              onClick={ () => handleCallApi() }
            >
              Finalizar Pedido
            </Button>
          </div>
        </Content>
      </Container>
    </section>
  );
}
