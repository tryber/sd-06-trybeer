import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import { FormControl } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {
  isTotalNotPriceZero,
  streetValidation,
  houseNumberValidation,
} from '../../utils/validations';
import useStyles from './styles';
import productsContext from '../../context/productsContext';
import fetches from '../../services/fetches';

export default function CheckoutDetails() {
  const classes = useStyles();
  const history = useHistory();
  const { cartProducts, setCartProducts } = useContext(productsContext);
  const [street, setStreet] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const [orderSuccess, setOrderSuccess] = useState('');
  const tokenFromLocalStorage = localStorage.getItem('token');
  let totalPrice = '0,00';

  const handleTotalPrice = () => {
    if (cartProducts.length) {
      totalPrice = cartProducts
        .reduce((accumulator, current) => accumulator + current.subTotal, 0);
      totalPrice = (totalPrice.toFixed(2)).replace('.', ',');
      return totalPrice;
    }
    return totalPrice;
  };

  const sendOrder = () => {
    const limitIndex = 19;
    const SUCCESSMESSAGEDESAPEAR = 3000;
    const date = new Date();
    const objOrder = {
      totalPrice: Number(handleTotalPrice().replace(',', '.')),
      address: street,
      number: houseNumber,
      date: date.toISOString().slice(0, limitIndex).replace('T', ' '),
      orderStatus: 'Pendente',
      cartProducts,
    };

    fetches.createOrder(tokenFromLocalStorage, objOrder)
      .then((response) => {
        if (!response) {
          return (setOrderSuccess('Algum erro aconteceu na realização do seu pedido!'));
        }
        (setOrderSuccess(response.message));
        setTimeout(() => {
          setCartProducts([]);
          localStorage.removeItem('cartProducts');
          history.push('/products');
        }, SUCCESSMESSAGEDESAPEAR);
      });
  };

  return (
    <Container className={ classes.mainContainer }>
      <div className={ classes.cardGrid }>
        <Typography
          className={ classes.totalValueContainer }
          data-testid="order-total-value"
        >
          { `Total: R$ ${handleTotalPrice()}` }
        </Typography>
        <FormControl className={ classes.formContainer }>
          <Typography className={ classes.adressContainer }>
            Endereço
          </Typography>
          <TextField
            id="street-input"
            data-testid="checkout-street-input"
            label="Rua"
            value={ street }
            onChange={ (e) => setStreet(e.target.value) }
          />
          <TextField
            id="street-input"
            data-testid="checkout-house-number-input"
            label="Número"
            value={ houseNumber }
            onChange={ (e) => setHouseNumber(e.target.value) }
          />
          <Button
            className={ classes.buttonContainer }
            variant="contained"
            data-testid="checkout-finish-btn"
            disabled={ !(isTotalNotPriceZero(totalPrice)
              && streetValidation(street)
              && houseNumberValidation(houseNumber)) }
            onClick={ () => { sendOrder(); } }
          >
            Finalizar Pedido
          </Button>
          <Typography>{ orderSuccess }</Typography>
        </FormControl>
      </div>
    </Container>
  );
}
