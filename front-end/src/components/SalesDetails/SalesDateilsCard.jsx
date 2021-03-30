import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
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
    <main className={ classes.mainContainer }>
      <div className={ classes.cardGrid }>
        <Card className={ classes.card }>
          <div className={ classes.orderNumberContainer }>
            <Typography
              data-testid="order-number"
              className={ classes.orderFont }
            >
              {orderDetail.length && `Pedido ${orderDetail[0].sale_id}`}
            </Typography>
            <Typography
              data-testid="order-date"
              className={ classes.orderFont }
            >
              {orderDetail.length && handleDate()}
            </Typography>
          </div>
          {orderDetail.length
            && orderDetail.map((order, index) => (
              <Grid key={ order.id }>
                <div className={ classes.productsContainer }>
                  <Typography
                    data-testid={ `${index}-product-qtd` }
                    className={ classes.productFont }
                  >
                    {order.quantity}
                  </Typography>
                  <Typography
                    data-testid={ `${index}-product-name` }
                    className={ classes.productFont }
                  >
                    {order.name}
                  </Typography>
                  <Typography
                    data-testid={ `${index}-product-total-value` }
                    className={ classes.productFont }
                  >
                    {`R$ ${(Number(order.quantity) * Number(order.price))
                      .toFixed(2)
                      .replace('.', ',')}`}
                  </Typography>
                </div>
              </Grid>
            ))}
          <Grid>
            <Typography
              data-testid="order-total-value"
              className={ classes.totalValue }
            >
              {`Total: R$ ${handletotalValue()}`}
            </Typography>
          </Grid>
        </Card>
      </div>
    </main>
  );
}
