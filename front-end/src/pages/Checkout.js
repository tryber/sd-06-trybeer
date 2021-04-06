import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import fetchFunctions from '../api/fetchFunctions';
import TrybeerContext from '../context/TrybeerContext';
import formatedPrice from '../utils/formatedPrice';
import { IoBeerOutline } from 'react-icons/io5';
import { IconContext } from 'react-icons';
import { ProductListItem, TopMenu, AddressForm } from '../components';
import './PagesCSS/Checkout.css';

function Checkout() {
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [purchaseMade, isPurchaseMade] = useState(false);
  const history = useHistory();
  const {
    user, cart, getTotalPriceCart, cleanShoppingCart,
  } = useContext(TrybeerContext);
  const [isFormFilled, setIsFormFilled] = useState(false);
  const TITLE_MENU_CHECKOUT = 'Finalizar Pedido';
  const TIME_TO_REDIRECT = 2500;
  const cartHasProducts = cart.length > 0;

  useEffect(() => {
    if (!user.token) {
      history.push('/login');
    }
  }, [cart, setIsFormFilled, history, user.token]);

  const handleCheckOut = async () => {
    const totalValue = getTotalPriceCart();
    const salesTable = {
      totalPrice: totalValue,
      deliveryAddress: street,
      deliveryNumber: number,
      userId: user.id,
      cart,
    };

    await fetchFunctions.post('orders', salesTable);
    isPurchaseMade(true);
    cleanShoppingCart();
    setTimeout(() => history.push('products'), TIME_TO_REDIRECT);
  };

  if(purchaseMade) return (
    <div>
      <TopMenu titleMenu={ TITLE_MENU_CHECKOUT } />
      <div className='checkout-container'>
        <IconContext.Provider value={ { size: '3em' } }>
          <IoBeerOutline />
        </IconContext.Provider>
        <br />
        <h4>Compra realizada com sucesso!</h4>
        <br/>
      </div>
      <br/>
      <div class="d-flex justify-content-center">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  )

  return (
    <div>
      <TopMenu titleMenu={ TITLE_MENU_CHECKOUT } />
      <br />
      <br />
      <h3 className="titleProducts">Produtos</h3>
      {cartHasProducts ? cart.map(({ id, name, quantity, price }, index) => (
        <ProductListItem
          key={ index }
          name={ name }
          index={ index }
          id={ id }
          quantity={ quantity }
          price={ price }
        />
      )) : <h3 className="noProducts">Não há produtos no carrinho</h3>}
      <p data-testid="order-total-value" className="finalValue">
        Total:
        {formatedPrice(getTotalPriceCart())}
      </p>
      <AddressForm
        street={ street }
        number={ number }
        setStreet={ setStreet }
        setNumber={ setNumber }
        setIsFormFilled={ setIsFormFilled }
      />
      <button
        type="button"
        data-testid="checkout-finish-btn"
        disabled={ !(isFormFilled && cartHasProducts) }
        onClick={ handleCheckOut }
        className="finalBuy"
      >
        Finalizar pedido
      </button>
    </div>
  );
}

export default Checkout;
