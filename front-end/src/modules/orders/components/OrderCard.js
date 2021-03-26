import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import GlobalContext from '../../../context/Context';

function OrderCard({ order, index }) {
  const {
    id,
    createdAt,
    total,
    number,
    address,
    status,
  } = order;

  const { userData } = useContext(GlobalContext);

  const totalValue = `R$ ${total.replace('.', ',')}`;
  const date = new Date(createdAt);
  const magicNumber = 9;
  let day = date.getDate();
  day = day > magicNumber ? day : `0${day}`;
  let month = date.getMonth() + 1;
  month = month > magicNumber ? month : `0${month}`;
  const dayAndMonth = `${day}/${month}`;

  // const user = JSON.parse(localStorage.getItem('user'));
  const user = userData;
  const role = user ? user.role : 'client';
  const pre = role === 'client' ? '' : '/admin';

  return (
    <Link
      to={ `${pre}/orders/${id}` }
      className="border rounded-md border-primary p-2 flex flex-col items-center"
      data-testid={ `${index}-order-card-container` }
    >
      <p data-testid={ `${index}-order-number` }>
        { `Pedido ${index + 1}` }
      </p>
      <p data-testid={ `${index}-order-total-value` }>
        <strong>{ totalValue }</strong>
      </p>
      <p data-testid={ `${index}-order-date` }>
        { dayAndMonth }
      </p>
      <p data-testid={ `${index}-order-address` }>
        { `${address}, ${number}` }
      </p>
      <p data-testid={ `${index}-order-status` }>
        { status === 'pending' ? 'Pendente' : 'Entregue' }
      </p>
    </Link>
  );
}

OrderCard.propTypes = {
  index: PropTypes.number.isRequired,
  order: PropTypes.shape({
    id: PropTypes.number.isRequired,
    user_id: PropTypes.number.isRequired,
    address: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
    total: PropTypes.number.isRequired,
    createdAt: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
};

export default OrderCard;
