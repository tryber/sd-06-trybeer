import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import useStyles from './styles';
import fetches from '../../services/fetches';

export default function AdminOrderCard() {
  const classes = useStyles();
  const tokenFromLocalStorage = localStorage.getItem('token');
  const [allSales, setAllSales] = useState([]);

  useEffect(() => {
    fetches.getAllSales(tokenFromLocalStorage)
      .then((response) => setAllSales(response.data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className={ classes.mainContainer }>
      <div className={ classes.cardGrid }>
        <Grid>
          {allSales.length && allSales.map((sale, index) => (
            <Grid key={ sale.id }>
              <Link to={ `/admin/orders/${sale.id}` }>
                <Card className={ classes.card }>
                  <Typography
                    className={ classes.titleContainer }
                    data-testid={ `${index}-order-number` }
                  >
                    {`Pedido ${sale.id}`}
                  </Typography>
                  <Typography
                    className={ classes.adressContainer }
                    data-testid={ `${index}-order-address` }
                  >
                    {`${sale.delivery_address}, ${sale.delivery_number}`}
                  </Typography>
                  <Typography
                    className={ classes.priceContainer }
                    data-testid={ `${index}-order-total-value` }
                  >
                    {`R$ ${Number(sale.total_price).toFixed(2).replace('.', ',')}`}
                  </Typography>
                  <Typography
                    className={ classes.statusContainer }
                    data-testid={ `${index}-order-status` }
                    style={ (sale.status === 'Pendente')
                      ? { color: 'red' } : { color: 'green' } }
                  >
                    {`${sale.status}`}
                  </Typography>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      </div>
    </main>
  );
}
