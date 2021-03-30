import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import productsContext from '../../context/productsContext';
import useStyles from './styles';

export default function OrderCard() {
  const { orders } = useContext(productsContext);
  const classes = useStyles();

  const formatDate = (date) => {
    const dateInMiliseconds = 60000;
    const indexDate = -2;
    const newDateInBrazilTimeZone = new Date(date.valueOf() - date.getTimezoneOffset()
    * dateInMiliseconds);
    const day = `0${newDateInBrazilTimeZone.getDate()}`;
    const month = `0${newDateInBrazilTimeZone.getMonth() + 1}`;
    const newDate = `${day.slice(indexDate)}/${month.slice(indexDate)}`;
    return newDate;
  };

  const formatTotalPrice = (price) => {
    const newPrice = price.replace('.', ',');
    return `R$ ${newPrice}`;
  };

  return (
    <main className={ classes.mainContainer }>
      <div className={ classes.cardGrid }>
        {orders.length && orders.map((order, index) => (
          <Grid item key={ order.id }>
            <Link to={ `/orders/${order.id}` }>
              <Card
                className={ classes.card }
                data-testid={ `${index}-order-card-container` }
              >
                <Typography
                  className={ classes.titleContainer }
                  data-testid={ `${index}-order-number` }
                >
                  { `Pedido ${order.id} - ` }
                </Typography>
                <Typography
                  className={ classes.dateContainer }
                  data-testid={ `${index}-order-date` }
                >
                  { `${formatDate(new Date(order.sale_date))} - ` }
                </Typography>
                <Typography
                  className={ classes.priceContainer }
                  data-testid={ `${index}-order-total-value` }
                >
                  {formatTotalPrice(order.total_price)}
                </Typography>
              </Card>
            </Link>
          </Grid>
        ))}
      </div>
    </main>
  );
}
