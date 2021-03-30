import React from 'react';
import { Link } from 'react-router-dom';

const OrdersCard = ({ orders }) => {
  const handleDate = (dateTime) => {
    const date = new Date(dateTime);
    const twoNumber = -2;
    const day = (`0${date.getDate()}`).slice(twoNumber);
    const month = (`0${(date.getMonth() + 1)}`).slice(twoNumber);
    const formatDate = `${day}/${month}`;
    return formatDate;
  };

  return orders ? orders.map((order, index) => (
    <div
      key={ index }
      data-testid={ `${index}-order-card-container` }
    >
      <Link data-testid={ `${index}-orders-details-link` } to={ `/orders/${order.id}` }>
        <div
          data-testid={ `${index}-order-number` }
        >
          { `Pedido ${order.id}` }
        </div>
        <div
          data-testid={ `${index}-order-date` }
        >
          { handleDate(order.sale_date) }
        </div>
        <div
          data-testid={ `${index}-order-total-value` }
        >
          { `R$ ${order.total_price.replace('.', ',')} ` }
        </div>
      </Link>
    </div>
  )) : true;
};

export default OrdersCard;
