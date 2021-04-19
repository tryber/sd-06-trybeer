import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompass, faCoins } from '@fortawesome/free-solid-svg-icons';
import Header from '../../../components/Header/Header';
import Button from '../../../components/Button/Button';
import { verifyUser } from '../../../store/LocalStorage/actions';
import { getCart } from '../../../store/LocalStorage/provider';
import { postSale } from '../../../services/Sales';
import CheckoutCard from '../../../components/checkoutCard/CheckoutCard';
import AddressForm from './AddressForm';
import { parseCartPrice } from '../../../utils/parseValues';
import { TWO_THOUSAND, NINETEEN } from '../../../services/magicNumbers';

import './Checkout.css';

const Checkout = (props) => {
  const { location } = props;
  if (!location.state) location.state = 0;

  const [user] = useState(JSON.parse(localStorage.getItem('user')));
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || '');
  const [chkButton, setChkButton] = useState(true);
  const [chkForm, setChkForm] = useState({ st: '', num: '' });
  const [statusPedido] = useState('pendente'); // ou Entregue
  const [mySum, setSum] = useState(location.state.sum || ' ');
  const [saleDone, setSaleDone] = useState(false);

  const history = useHistory();

  useEffect(() => {
    verifyUser(history);
  }, [history]);

  useEffect(() => {
    const sumNumber = Number(mySum.split(' ')[1].replace(',', '.'));
    if (chkForm.st.length && chkForm.num.length && sumNumber > 0) {
      setChkButton(false);
    } else {
      setChkButton(true);
    }
  }, [mySum, chkForm]);

  const handleChange = (input, e) => {
    setChkForm({ ...chkForm, [input]: e.target.value });
  };

  const changeState = (newState) => {
    setCart(newState);
    const newCart = JSON.parse(localStorage.getItem('cart'));
    let newValue = 0;
    newCart.map((product) => {
      newValue += Number(product.price);
      return newValue;
    });
    setSum(parseCartPrice(newValue));
  };

  const makeSale = async () => {
    const date = (new Date()).toISOString().slice(0, NINETEEN)
      .replace(/-/g, '/')
      .replace('T', ' ');
    const payload = {
      user_id: user.id,
      total_price: Number(mySum.split(' ')[1].replace(',', '.')).toFixed(2),
      delivery_address: chkForm.st,
      delivery_number: chkForm.num,
      sale_date: date,
      status: statusPedido,
    };
    const products = getCart();
    const saleResponse = await postSale(user.token, payload, products);

    if (saleResponse.affectedRows) {
      setSaleDone('Compra realizada com sucesso!');

      setTimeout(() => {
        localStorage.setItem('cart', '[]');
        return history.push('/products');
      }, TWO_THOUSAND);
    } else {
      setSaleDone(saleResponse);
    }
  };

  return (
    <div className="checkout-general">
      <Header title="Finalizar Pedido" user="client" />
      <div className="checkout-container">
        <h2 className="products-title">Produtos</h2>
        {(saleDone)
          ? (
            <h1>{saleDone}</h1>
          )
          : (
            <div>
              {
                (cart.length)
                  ? (
                    cart.map((product, index) => (
                      <CheckoutCard
                        product={ product }
                        changeState={ changeState }
                        key={ index }
                        specialNumber={ index }
                      />
                    ))
                  )
                  : (<h3> Não há produtos no carrinho </h3>)
              }
              <span className="span-total" data-testid="order-total-value">
                <FontAwesomeIcon
                  icon={ faCoins }
                  style={ { color: '#F29F05', padding: ' 3px' } }
                  size="1x"
                />
                Total:
                {mySum}
              </span>
              <h3 className="address-title">
                <FontAwesomeIcon
                  icon={ faCompass }
                  style={ { color: '#F29F05', padding: ' 3px' } }
                  size="1x"
                />
                Endereço:
              </h3>
              <AddressForm handleChange={ handleChange } />
              <Button
                title="Finalizar pedido"
                isDisabled={ chkButton }
                testId="checkout-finish-btn"
                onClick={ () => makeSale() }
              />
            </div>
          )}
      </div>
    </div>
  );
};

Checkout.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      sum: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default Checkout;
