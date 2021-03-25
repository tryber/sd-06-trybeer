import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import api from '../services/api';

function OrdersUser() {
  const [orders, setOrders] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const buildOrRedirect = async () => {
      const dataUser = JSON.parse(localStorage.user);
      const { token, id } = dataUser;
      const getAllOrders = await api.getOrdersByIdUser(id, token);
      if (dataUser.token) setOrders(getAllOrders);
      else history.push('/login');
    };
    buildOrRedirect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1 data-testid="top-title">Meus Pedidos</h1>
      {orders.length > 0 ? orders.map((order, index) => (
        <div
          key={ index }
          onClick={ () => history.push(`/orders/${order.id}`) }
          data-testid={ `${index}-card-container` }
          role="button"
          tabIndex={ index }
          onKeyDown={ () => history.push(`/orders/${order.id}`) }
        >
          <p data-testid={ `${index}-order-number` }>{`Pedido ${order.id}`}</p>
          <p data-testid={ `${index}-order-date` }>{`${order.saleDate}`}</p>
          <p data-testid={ `${index}-order-total-value` }>
            {`R$ ${(order.total_price).replace('.', ',')}`}
          </p>
        </div>)) : <span>Não há pedidos</span>}

    </div>
  );
}

export default OrdersUser;
