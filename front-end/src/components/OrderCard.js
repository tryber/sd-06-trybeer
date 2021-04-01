import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import dateFormatter from '../services/dateFormatter';
import '../styles/components/OrderCard.css';

const OrderCard = ({ order, index }) => {
  const { address, number, date, total, orderId, status } = order;
  const pathname = window.location.href;
  const isAdmin = pathname.includes('admin');
  const correctDate = dateFormatter(date);
  const link = isAdmin ? `/admin/orders/${orderId}` : `/orders/${orderId}`;
  return (
    <Link to={ link }>
      <div
        className="orderCardContainer"
        data-testid={ `${index}-order-card-container` }
      >
        <h3 data-testid={ `${index}-order-number` }>
          { `Pedido ${orderId}` }
        </h3>
        { isAdmin && (
          <p data-testid={ `${index}-order-address` }>
            { `${address}, ${number}` }
          </p>
        ) }
        <div className="orderCardFooter">
          <h3 data-testid={ `${index}-order-total-value` }>
            { `R$ ${parseFloat(total).toFixed(2).replace('.', ',')}` }
          </h3>
          { isAdmin && (
            <h3
              className={ status === 'Entregue'
                ? 'statusDelivered' : 'statusNotDelivered' }
              data-testid={ `${index}-order-status` }
            >
              { status }
            </h3>
          ) }
          { !isAdmin && <h3 data-testid={ `${index}-order-date` }>{ correctDate }</h3> }
        </div>
      </div>
    </Link>
  );
};

OrderCard.propTypes = {
  order: PropTypes.instanceOf(Object).isRequired,
  index: PropTypes.number.isRequired,
};

export default OrderCard;
