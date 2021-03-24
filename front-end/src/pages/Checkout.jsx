import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import CheckoutContext from '../context/CheckoutContext';
import ProductCard from '../components/pageCheckout/ProductCard';
import ButtonCheckout from '../components/pageCheckout/ButtonCheckout';
import FormCheckout from '../components/pageCheckout/FormCheckout';
import { checkoutUtils } from '../utils';

function Checkout() {
  const productsList = JSON.parse(localStorage.cart);
  const [address, setEndereco] = useState({ rua: '', numero: '' });
  const [products, setProdutos] = useState(productsList);
  const [able, setAble] = useState(true);
  const [sumTotal, setSumTotal] = useState(0);
  const history = useHistory();

  const handleChange = ({ target }) => {
    setEndereco({ ...address, [target.name]: target.value });
  };

  useEffect(() => {
    const dataUser = JSON.parse(localStorage.user);
    if (!dataUser.token) history.push('/login');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    checkoutUtils.valueTotal(products, setSumTotal);
    checkoutUtils.disable(setAble, products, address);
  }, [address, history, products]);

  return (
    <CheckoutContext.Provider
      value={ {
        handleChange,
        address,
        products,
        setProdutos,
        able,
        history,
        sumTotal,
      } }
    >
      <div className="main-content">
        <h1 className="title" data-testid="top-title">Finalizar Pedido</h1>
        <div className="form-content">
          <ProductCard />
          <FormCheckout />
          <ButtonCheckout />
        </div>
      </div>
    </CheckoutContext.Provider>
  );
}

export default Checkout;
