import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
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
    <main>
      <Container className={ classes.cardGrid } maxWidth="md">
        <Grid container spacing={ 4 }>
          {
            allSales.length && allSales.map((sale, index) => (
              <Grid key={ sale.id } item xs={ 12 } md={ 4 }>
                <Link to={ `/admin/orders/${sale.id}` }>
                  <Card className={ classes.card }>
                    <CardContent>
                      <Typography
                        data-testid={ `${index}-order-number` }
                      >
                        {`Pedido ${sale.id}`}
                      </Typography>
                      <Typography
                        data-testid={ `${index}-order-address` }
                      >
                        {`${sale.delivery_address}, ${sale.delivery_number}`}
                      </Typography>
                      <Typography
                        data-testid={ `${index}-order-total-value` }
                      >
                        {`R$ ${Number(sale.total_price).toFixed(2).replace('.', ',')}`}
                      </Typography>
                      <Typography
                        data-testid={ `${index}-order-status` }
                      >
                        {`${sale.status}`}
                      </Typography>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
            ))
          }
        </Grid>
      </Container>
    </main>
  );
}
