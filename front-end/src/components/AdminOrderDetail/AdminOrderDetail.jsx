import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
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
              data-testid="order-status"
              className={ classes.orderFont }
              style={ (orderDetail.length && orderDetail[0].status === 'Pendente')
                ? { color: 'red' } : { color: 'green' } }
            >
              { orderDetail.length && orderDetail[0].status }
            </Typography>
          </div>
          {orderDetail.length && orderDetail.map((order, index) => (
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
                    .toFixed(2).replace('.', ',')}`}
                </Typography>
              </div>
            </Grid>)) }
          <Typography
            data-testid="order-total-value"
            className={ classes.totalValue }
          >
            {`Total: R$ ${handletotalValue()}`}
          </Typography>
        </Card>
        <div
          style={ {
            display: 'flex',
            justifyContent: 'center',
          } }
        >
          <Button
            className={ classes.buttonContainer }
            variant="contained"
            data-testid="mark-as-delivered-btn"
            type="button"
            onClick={ handleChangeStatusButton }
          >
            Marcar como entregue
          </Button>
        </div>
      </div>
    </main>
  );
}
