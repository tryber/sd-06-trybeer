import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

import AppContext from '../context/AppContext';

import api from '../services/api';

function OrdersUser({ history }) {
  const { orders, setOrders } = useContext(AppContext);

  useEffect(() => {
    const dataUser = JSON.parse(localStorage.user); async function getOrders() {
      const { token, id } = dataUser;
      const getAllOrders = await api.getOrdersByIdUser(id, token);
      setOrders(getAllOrders);
    }
    if (dataUser.token) getOrders();
    else history.push('/login');
  },
  [history, setOrders]);

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

OrdersUser.propTypes = {
  history: PropTypes.objectOf(Object).isRequired,
};

export default OrdersUser;
