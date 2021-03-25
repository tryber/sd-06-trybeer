import React from 'react';
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
            <p data-testid={ `${index}-order-date` }>{`${order.saleDate}`}</p>
            <p data-testid={ `${index}-order-total-value` }>
              {`R$ ${(order.total_price).replace('.', ',')}`}
            </p>
          </Link>
        </div>
      )) : <div><span>Não há pedidos</span></div>}
    </div>
  );
}

export default OrdersCard;
