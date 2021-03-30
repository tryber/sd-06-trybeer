import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import useStyles from './styles';
import productsContext from '../../context/productsContext';

export default function ProductCard() {
  const { products, cartProducts, setCartProducts } = useContext(productsContext);
  const classes = useStyles();
  const history = useHistory();

  const MINUSONE = -1;
  const ONE = 1;

  // Garante que ao atualizar a página o carrinho do contexto global é populado novamente.
  useEffect(() => {
    const cartLS = JSON.parse(localStorage.getItem('cartProducts'));
    if (!cartLS) return;
    setCartProducts(cartLS);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTotalPrice = () => {
    if (cartProducts.length) {
      const totalPrices = cartProducts
        .reduce((accumulator, current) => accumulator + current.subTotal, 0);

      return (totalPrices.toFixed(2)).replace('.', ',');
    }
    return '0,00';
  };

  const isCartWithoutProducts = () => {
    if (cartProducts.length) {
      return false;
    }
    return true;
  };

  const showQuantity = (index) => {
    if (cartProducts.length > 0) {
      const productExists = cartProducts
        .find((product) => Number(product.id) === Number(index));
      if (productExists) {
        return productExists.quantityItem;
      }
    }
    return 0;
  };

  const handleChangeQuantityButton = (event, unity) => {
    const productId = event.currentTarget.id;
    const productExists = cartProducts
      .find((product) => parseInt(product.id, 10) === parseInt(productId, 10));

    if (cartProducts.length && productExists) {
      return setCartProducts([...cartProducts.map((product) => {
        if (product.id !== Number(productId)) {
          return product;
        }
        product.quantityItem += unity;
        if (product.quantityItem <= 0) {
          product.quantityItem = 0;
        }
        product.subTotal = Number(product.quantityItem * product.price);
        localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
        return product;
      })]);
    }
    const newCartProduct = [...cartProducts, {
      id: parseInt(productId, 10),
      name: products[productId].name,
      price: products[productId].price,
      url: products[productId].url_image,
      quantityItem: unity > 0 ? unity : unity = 0,
      subTotal: Number(products[productId].price),
    }];
    setCartProducts(newCartProduct);
    localStorage.setItem('cartProducts', JSON.stringify(newCartProduct));
  };

  return (
    <main className={ classes.mainContainer }>
      <div>
        <Grid className={ classes.cardGrid }>
          { products.length && products.map((product, index) => (
            <Grid item key={ product.id }>
              <Card className={ classes.card }>
                <CardMedia
                  image={ product.url_image }
                  data-testid={ `${index}-product-img` }
                  className={ classes.cardMedia }
                  title="Produto"
                  alt="Imagem do Produto"
                />
                {/* <CardContent> */}
                <Typography
                  className={ classes.titleContainer }
                  data-testid={ `${index}-product-name` }
                >
                  { product.name }
                </Typography>
                <Typography
                  className={ classes.priceContainer }
                  data-testid={ `${index}-product-price` }
                >
                  { `R$ ${(product.price).replace('.', ',')}` }
                </Typography>
                {/* </CardContent> */}
                <Grid container justify="center">
                  <CardActions>
                    <IconButton
                      className={ classes.quantityButton }
                      data-testid={ `${index}-product-minus` }
                      onClick={ (e) => handleChangeQuantityButton(e, MINUSONE) }
                      value="Minus"
                      id={ index }
                    >
                      <RemoveCircleIcon style={ { fontSize: '45px', color: '#32325b' } } />
                    </IconButton>
                    <Typography
                      data-testid={ `${index}-product-qtd` }
                      style={ { fontSize: '35px' } }
                    >
                      { showQuantity(index) }
                    </Typography>
                    <IconButton
                      className={ classes.quantityButton }
                      data-testid={ `${index}-product-plus` }
                      value="Plus"
                      id={ index }
                      onClick={ (e) => handleChangeQuantityButton(e, ONE) }
                    >
                      <AddCircleIcon style={ { fontSize: '45px', color: '#32325b' } } />
                    </IconButton>
                  </CardActions>
                </Grid>
              </Card>
            </Grid>
          )) }
        </Grid>
        <div style={ { display: 'flex', justifyContent: 'center' } }>
          <Button
            className={ classes.totalpriceButton }
            data-testid="checkout-bottom-btn"
            variant="contained"
            color="primary"
            disabled={ isCartWithoutProducts() }
            onClick={ () => { history.push('/checkout'); } }
          >
            Ver Carrinho
            {' '}
            { `R$ ${handleTotalPrice()}` }
          </Button>
          {/* <Typography
            data-testid="checkout-bottom-btn-value"
            className={ classes.totalpriceValue }
          >
            { `R$ ${handleTotalPrice()}` }
          </Typography> */}
        </div>
      </div>
    </main>
  );
}
