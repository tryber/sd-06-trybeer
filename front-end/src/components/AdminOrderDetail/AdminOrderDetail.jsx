import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Container } from '@material-ui/core';
import fetches from '../../services/fetches';
import useStyles from './styles';

export default function AdminOrderDetail() {
  const classes = useStyles();
  const tokenFromLocalStorage = localStorage.getItem('token');
  const location = useLocation();
  const [orderDetail, setOrderDetail] = useState([]);
  const SIX = 6;
  const pathName = location.pathname;
  const adminPathName = pathName.substr(SIX);

  useEffect(() => {
    fetches.getSaleById(tokenFromLocalStorage, adminPathName)
      .then((response) => setOrderDetail(response.data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handletotalValue = () => {
    if (orderDetail.length) {
      const totalPrice = orderDetail
        .reduce((accumulator, current) => accumulator
          + (Number(current.quantity) * Number(current.price)), 0);
      const totalOrderPrice = (totalPrice.toFixed(2)).replace('.', ',');
      return totalOrderPrice;
    }
  };

  const handleChangeStatusButton = () => {
    fetches.updateSale(tokenFromLocalStorage, adminPathName);
    window.location.reload();
  };

  return (
    <main className={ classes.root }>
      <Container className={ classes.cardGrid } maxWidth="md">
        <Grid container spacing={ 4 }>
          <Grid container className={ classes.orderContainer }>
            <Typography
              data-testid="order-number"
              variant="h6"
              component="h2"
            >
              {orderDetail.length && `Pedido ${orderDetail[0].sale_id}`}
            </Typography>
            <Typography
              data-testid="order-status"
              variant="h6"
              component="h2"
            >
              { orderDetail.length && orderDetail[0].status }
            </Typography>
          </Grid>
          <Card className={ classes.card }>
            <CardContent>
              {orderDetail.length && orderDetail.map((order, index) => (
                <Grid container key={ order.id } className={ classes.orderDetails }>
                  <Typography data-testid={ `${index}-product-qtd` }>
                    {order.quantity}
                  </Typography>
                  <Typography data-testid={ `${index}-product-name` }>
                    {order.name}
                  </Typography>
                  <Typography data-testid={ `${index}-product-total-value` }>
                    {`R$ ${(Number(order.quantity) * Number(order.price))
                      .toFixed(2).replace('.', ',')}`}
                  </Typography>
                </Grid>)) }
            </CardContent>
            <Grid container justify="flex-end">
              <Typography
                data-testid="order-total-value"
                variant="h6"
                component="h2"
              >
                {`Total: R$ ${handletotalValue()}`}
              </Typography>
            </Grid>
          </Card>
        </Grid>
      </Container>
      <Grid container justify="center">
        <Button
          variant="outlined"
          color="primary"
          className={ orderDetail.length && orderDetail[0].status }
          data-testid="mark-as-delivered-btn"
          type="button"
          onClick={ handleChangeStatusButton }
        >
          Marcar como entregue
        </Button>
      </Grid>
    </main>
  );
}
