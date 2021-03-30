import React, { useContext, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import useStyles from './styles';
import productsContext from '../../context/productsContext';

export default function CheckoutProductsCard() {
  const classes = useStyles();
  const { cartProducts, setCartProducts } = useContext(productsContext);

  useEffect(() => {
    const cartLS = JSON.parse(localStorage.getItem('cartProducts'));
    if (!cartLS) return;
    setCartProducts(cartLS);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const removeProductFromCart = (event) => {
    const productId = event.target.id;

    cartProducts.splice(productId, 1);
    const newCartProduct = cartProducts;
    localStorage.setItem('cartProducts', JSON.stringify(newCartProduct));
    window.location.reload();
  };

  return (
    <div className={ classes.mainContainer }>
      <div className={ classes.cardGrid }>
        { !cartProducts.length
          ? <Typography>Não há produtos no carrinho</Typography>
          : cartProducts.map((product, index) => (
            <Grid key={ product.id }>
              <Card className={ classes.card }>
                <Typography
                  className={ classes.quantityContainer }
                  data-testid={ `${index}-product-qtd-input` }
                >
                  { product.quantityItem }
                </Typography>
                <Typography
                  className={ classes.nameContainer }
                  data-testid={ `${index}-product-name` }
                >
                  { product.name }
                </Typography>
                <div className={ classes.priceContainer }>
                  <Typography
                    className={ classes.unityPrice }
                    data-testid={ `${index}-product-unit-price` }
                  >
                    { `(R$ ${(product.price).replace('.', ',')} un)` }
                  </Typography>
                  <IconButton
                    className={ classes.deleteContainer }
                    data-testid={ `${index}-removal-button` }
                    type="submit"
                    onClick={ (event) => removeProductFromCart(event) }
                    id={ index }
                  >
                    <DeleteIcon style={ { fontSize: '40px' } } />
                  </IconButton>
                </div>
              </Card>
            </Grid>
          ))}
      </div>
    </div>
  );
}

/* xs={ 12 } sm container */
/* container spacing={ 2 } */
