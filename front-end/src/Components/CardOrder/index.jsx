import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as S from './style';

const CardOrder = ({ orders }) => {
  console.log('orders card:', orders);
  return (
    <div>
      {orders.length < 1 ? <div>Loading...</div> : orders
        .map((order, index) => (
          <S.CardContainer key={ index }>
            <Link to={ `/admin/orders/:${order.id}}` }>
              <S.SectionOrder>
                <span data-testid={ `${index}-order-number` }>
                  Pedido
                  {' '}
                  { order.id }
                </span>
              </S.SectionOrder>
              <S.SectionAdress>
                <span data-testid={ `${index}-order-address` }>
                  rua
                  {' '}
                  { order.delivery_address }
                  {' '}
                  { order.delivery_number }
                </span>
              </S.SectionAdress>
              <S.ValueAndStatus>
                <S.ValueOrder>
                  <span data-testid={ `${index}-order-total-value` }>
                    R$
                    {' '}
                    { order.total_price }
                  </span>
                </S.ValueOrder>
                <span data-testid={ `${index}-order-status` }>
                  { order.status }
                </span>
              </S.ValueAndStatus>
            </Link>
          </S.CardContainer>
        ))}
    </div>
  );
};

CardOrder.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.object),
};

CardOrder.defaultProps = {
  orders: [],
};

export default CardOrder;
