import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Button from '../Button';
import * as S from './style';

const OrdersAdminDetail = () => {
  const { pathname } = useLocation();
  const [orders, setOrders] = useState([]);
  const [isDisable, setIsdisable] = useState(false);
  const fetch = async () => {
    const { token } = localStorage;
    const { data } = await Axios.get(`http://localhost:3001${pathname}`, { headers: { authorization: token } });

    setOrders(data);
  };
  useEffect(() => {
    fetch();
  }, [fetch]);

  const changeStatus = async () => {
    const { data } = await Axios.put(`http://localhost:3001${pathname}`, { status: 'Entregue' });
    setIsdisable(true);

    return data;
  };

  return (
    <>
      <h1 data-testid="order-number">
        Pedidos -
        {' '}
        {orders[0] && orders[0].sale_id}
        {' '}
        status:
        {' '}
        <S.Status
          isDisable={ isDisable }
          data-testid="order-status"
        >
          {orders[0] && orders[0].status}

        </S.Status>
      </h1>
      <S.Container>
        {orders.map((el, idx) => (
          <p key={ idx }>
            <span data-testid={ `${idx}-product-qtd` }>
              {el.quantity}
              {' '}
              -
              {' '}
            </span>
            <span key={ idx } data-testid={ `${idx}-product-name` }>{el.name}</span>
            <S.Price key={ idx } data-testid={ `${idx}-order-unit-price` }>
              R$
              {el.price}
            </S.Price>
          </p>
        ))}
      </S.Container>
      <h1 data-testid="0-product-total-value">
        Total: R$
        {' '}
        {orders[0] && orders[0].total_price}
      </h1>
      <S.Buttons>
        <Button
          data-testid="mark-as-delivered-btn"
          disabled={ isDisable }
          dataTestId="signin-btn"
          onClick={ changeStatus }
        >
          Marcar pedido como entregue
        </Button>
      </S.Buttons>
    </>

  );
};

export default OrdersAdminDetail;
