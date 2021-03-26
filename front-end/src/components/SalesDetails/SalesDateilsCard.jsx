import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import { Container } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import fetches from '../../services/fetches';
import useStyles from './styles';

export default function SalesDetails() {
  const classes = useStyles();
  const tokenFromLocalStorage = localStorage.getItem('token');
  const location = useLocation();
  const [orderDetail, setOrderDetail] = useState([]);

  useEffect(() => {
    const pathName = location.pathname;
    fetches
      .getSaleById(tokenFromLocalStorage, pathName)
      .then((response) => setOrderDetail(response.data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleDate = () => {
    const five = 5;
    const three = 3;
    if (orderDetail.length) {
      const fullDate = orderDetail[0].sale_date.substr(five, five);
      const month = fullDate.substr(0, 2);
      const day = fullDate.substr(three);
      const saleDate = `${day}/${month}`;
      return saleDate;
    }
  };
  const handletotalValue = () => {
    if (orderDetail.length) {
      const totalPrice = orderDetail.reduce(
        (accumulator, current) => accumulator
          + Number(current.quantity) * Number(current.price),
        0,
      );
      const totalOrderPrice = totalPrice.toFixed(2).replace('.', ',');
      return totalOrderPrice;
    }
  };
  return (
    <main className={ classes.root }>
      <Container className={ classes.cardGrid } maxWidth="md">
        <Grid container spacing={ 4 }>
          <Grid container direction="row">
            <Typography data-testid="order-number">
              {orderDetail.length && `Pedido ${orderDetail[0].sale_id}`}
            </Typography>
            <Typography
              data-testid="order-date"
            >
              {orderDetail.length && handleDate()}
            </Typography>
          </Grid>
          <Card className={ classes.card }>
            <CardContent>
              {orderDetail.length
            && orderDetail.map((order, index) => (
              <Grid item key={ order.id } className={ classes.SalesDetails }>
                <Typography
                  data-testid={ `${index}-product-qtd` }
                >
                  {order.quantity}
                </Typography>
                <Typography
                  data-testid={ `${index}-product-name` }
                >
                  {order.name}
                </Typography>
                <Typography
                  data-testid={ `${index}-product-total-value` }
                >
                  {`R$ ${(Number(order.quantity) * Number(order.price))
                    .toFixed(2)
                    .replace('.', ',')}`}
                </Typography>
              </Grid>
            ))}
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
    </main>
  );
}
