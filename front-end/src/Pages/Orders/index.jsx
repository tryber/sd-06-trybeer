// import axios from 'axios';
import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import Menu from '../../Components/Menu';
import * as S from './style';

const Orders = () => {
  const history = useHistory();
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    if (!window.localStorage.token) {
      history.push('/login');
    }
  });
  useEffect(() => {
    const getOrders = async () => {
      const { token } = localStorage;
      const request = await Axios
        .get('http://localhost:3001/orders', { headers: { authorization: token } });
      const data = await request.data;
      setOrders(data);
    };
    getOrders();
  }, []);

  return (
    <>
      <Menu><p data-testid="top-title">Meus Pedidos</p></Menu>
      <S.Container>
        {orders.length < 1 ? <div>No orders</div> : orders.map((order, index) => {
          const strToDate = new Date(order.sale_date);
          const maxMonthOneDigitUTCformat = 8;
          const filteredDate = strToDate.getUTCMonth() > maxMonthOneDigitUTCformat
            ? `${strToDate.getUTCDate()}/${strToDate.getUTCMonth() + 1}`
            : `${strToDate.getUTCDate()}/0${strToDate.getUTCMonth() + 1}`;
          return (
            <S.Item key={ index }>
              <Link to={ `/orders/${order.id}` }>
                <span data-testid={ `${index}-order-card-container` }>
                  <div data-testid={ `${index}-order-number` }>
                    Pedido
                    {' '}
                    { order.id }
                  </div>
                  <div data-testid={ `${index}-order-date` }>{ filteredDate }</div>
                  <div data-testid={ `${index}-order-total-value` }>
                    R$
                    {' '}
                    { order.total_price.replace(/\./g, ',')}
                  </div>
                </span>
              </Link>
            </S.Item>
          );
        })}
        <div />
      </S.Container>
    </>
  );
};

export default Orders;
