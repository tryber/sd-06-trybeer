import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as S from './style';

const CardOrders = () => {
  const [orders, setOrders] = useState([]);

  const fetch = async () => {
    const { token } = localStorage;
    const { data } = await Axios.get('http://localhost:3001/admin/orders', { headers: { authorization: token } });
    console.log(data);
    setOrders(data);
  };
  useEffect(() => {
    fetch();
  }, []);

  return (
    <div>
      {orders.map((el, idx) => (
        <Link key={ idx } to={ `/admin/orders/${el.id}` }>
          <S.Container key={ idx }>
            <S.Pedido
              data-testid={ `${idx}-order-number` }
            >
              {`Pedido ${el.id}` }
            </S.Pedido>
            <S.Endereco
              data-testid={ `${idx}-order-address` }
            >
              { `${el.delivery_address}, ${el.delivery_number}` }
            </S.Endereco>
            <S.ValorTotal
              data-testid={ `${idx}-order-total-value` }
            >
              { `R$ ${el.total_price.toString().replace('.', ',')}` }
            </S.ValorTotal>
            <S.Status
              data-testid={ `${idx}-order-status` }
            >
              { el.status }
            </S.Status>
          </S.Container>
        </Link>))}
    </div>
  );
};

export default CardOrders;
