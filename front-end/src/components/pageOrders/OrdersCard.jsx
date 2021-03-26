import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function OrdersCard({ orders }) {
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
              {order.sale_date}
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
