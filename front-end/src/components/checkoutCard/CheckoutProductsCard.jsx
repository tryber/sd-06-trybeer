import React, { useContext, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
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
    <div className={ classes.root }>
      {
        !cartProducts.length
          ? <Typography>Não há produtos no carrinho</Typography>
          : cartProducts.map((product, index) => (
            <Paper key={ product.id } className={ classes.paper }>
              <Grid container>
                <Grid item xs container direction="column" spacing={ 2 }>
                  <Grid item xs>
                    <Typography
                      gutterBottom
                      variant="subtitle1"
                      data-testid={ `${index}-product-qtd-input` }
                    >
                      { product.quantityItem }
                    </Typography>
                    <Typography
                      data-testid={ `${index}-product-name` }
                      variant="h6"
                    >
                      { product.name }
                    </Typography>
                    <Grid item container direction="row">
                      <IconButton
                        data-testid={ `${index}-removal-button` }
                        type="submit"
                        onClick={ (event) => removeProductFromCart(event) }
                        id={ index }
                      >
                        <DeleteIcon />
                        {' '}
                        Deletar
                      </IconButton>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Typography
                    variant="subtitle1"
                    data-testid={ `${index}-product-unit-price` }
                  >
                    { `(R$ ${(product.price).replace('.', ',')} un)` }
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          ))
      }
    </div>
  );
}

/* xs={ 12 } sm container */
/* container spacing={ 2 } */
