import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function OrdersCard({ orders }) {
  const handleDate = (dateTime) => {
    const date = new Date(dateTime);
    const twoNumber = -2;
    const day = (`0${date.getDate()}`).slice(twoNumber);
    const month = (`0${(date.getMonth() + 1)}`).slice(twoNumber);
    const formatDate = `${day}/${month}`;
    return formatDate;
  };
  console.log(orders);
  return (
    <div>
      {orders.length > 0 ? orders.map((order, index) => (
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
      )) : <div><span>Não há pedidos</span></div>}
    </div>
  );
}

OrdersCard.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default OrdersCard;
