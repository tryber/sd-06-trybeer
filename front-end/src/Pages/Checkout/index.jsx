import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import ShoppingCart from '../../Components/ShoppingCart';
import Menu from '../../Components/Menu';
import AddressForm from '../../Components/AddressForm';
import Button from '../../Components/Button';
import GetProducts from '../../services/GetProducts';

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [beerRequests, setBeerRequest] = useState([]);
  const history = useHistory();
  useEffect(() => {
    if (localStorage.products && localStorage.products !== '[]') {
      setProducts(JSON.parse(localStorage.products));
    } else {
      GetProducts(setProducts);
    }
  }, []);
  useEffect(() => {
    if (!window.localStorage.token) {
      history.push('/login');
    }
  });
  const verifyRequest = (itens) => {
    const requests = itens.map((iten) => iten.productQuantity > 0);
    if (requests.length >= 1) {
      setBeerRequest(requests);
    }
    return beerRequests;
  };
  const finishRequest = () => console.log('finalizado');
  return (
    <>
      <Menu><p data-testid="top-title">Finalizar Pedido</p></Menu>
      {verifyRequest(products).length === 0
        ? <div>Não há produtos no carrinho</div>
        : <ShoppingCart products={ beerRequests } />}
      <AddressForm />
      <Button
        dataTestId="checkout-finish-btn"
        onClick={ () => finishRequest() }
      >
        Finalizar Pedido
      </Button>
    </>
  );
};

export default Cart;
