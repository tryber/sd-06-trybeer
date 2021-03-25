import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../services/api';

function OrdersUser({ history }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.user);
    const buildOrRedirect = async () => {
      const list = await api.getOrdersByIdUser(data.id, data.token);
      setOrders(list);
    };
    if (!data.token) history.push('/login');
    buildOrRedirect();
  }, [history]);

  const handleDate = (dateTime) => {
    const date = new Date(dateTime);
    const twoNumber = -2;
    const day = (`0${date.getDate()}`).slice(twoNumber);
    const month = (`0${(date.getMonth() + 1)}`).slice(twoNumber);
    const formatDate = `${day}/${month}`;
    return formatDate;
  };

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
            <p data-testid={ `${index}-order-date` }>
              {`${handleDate(order.sale_date)}`}
            </p>
            <p data-testid={ `${index}-order-total-value` }>
              {`R$ ${(order.total_price).replace('.', ',')}`}
            </p>
          </Link>
        </div>
      )) : <span>Não há pedidos</span>}

    </div>
  );
}

OrdersUser.propTypes = {
  history: PropTypes.objectOf(Object).isRequired,
};

export default OrdersUser;
