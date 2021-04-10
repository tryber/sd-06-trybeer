import React, { useContext, useEffect, useState } from 'react';
import ProductsContext from '../context/ProductsContext';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
// import { useHistory } from 'react-router';

import {
  Container,
  Content,
  Input,
  Label,
  Button,
} from '../styles/styles';

export default function Checkout() {
  const { products, setProducts, setTotalPrice } = useContext(ProductsContext);
  const [cartList, setCartList] = useState([]);
  const [address, setAddress] = useState(
    {
      street: '',
      number: '',
    },
  );
  const cartValue = JSON.parse(localStorage.totalPrice);
  // const history = useHistory();

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
    localStorage.setItem('totalPrice', newPrice.toFixed(2));
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

  function handleClick() {
    console.log(cartList, 'cartList');
    const dateSale = new Date();
    console.log(dateSale, 'dateSale');
  }

  const { street, number } = address;
  const activeButton = street.length > 0 && number.length > 0 && cartList.length;

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
          <h3
            data-testid="order-total-value"
          >
            {/* { `R$ ${(totalPrice).toFixed(2)}` } */}
            { `${cartValue
              .toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}` }
          </h3>
          <form>
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
              type="button"
              disabled={ !activeButton }
              data-testid="checkout-finish-btn"
              onClick={ () => handleClick() }
            >
              Finalizar Pedido
            </Button>
          </form>
        </Content>
      </Container>
    </section>
  );
}
