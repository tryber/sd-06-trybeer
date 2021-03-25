import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import api from '../services/api';

function OrdersUser() {
  const [orders, setOrders] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const data = JSON.parse(localStorage.user);
    const buildOrRedirect = async () => {
      const list = await api.getOrdersByIdUser(data.id, data.token);
      setOrders(list);
    };
    if (!data.token) history.push('/login');
    buildOrRedirect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1 data-testid="top-title">Meus Pedidos</h1>
      {orders ? orders.map((order, index) => (
        <div
          key={ index }
          data-testid={ `${index}-card-container` }
        >
          <Link to={ `/orders/${order.id}` }>
            <p data-testid={ `${index}-order-number` }>{`Pedido ${order.id}`}</p>
            <p data-testid={ `${index}-order-date` }>{`${order.saleDate}`}</p>
            <p data-testid={ `${index}-order-total-value` }>
              {`R$ ${(order.total_price).replace('.', ',')}`}
            </p>
          </Link>
        </div>
      )) : <span>Não há pedidos</span>}

    </div>
  );
}

export default OrdersUser;
