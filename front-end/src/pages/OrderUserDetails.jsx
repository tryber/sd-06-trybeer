import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router';
import api from '../services/api';

function OrdersUserDetails() {
  const { id } = useParams();
  const history = useHistory();

  const [order, setOrder] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.user);
    async function getOrderClient() {
      const getOrder = await api.getOrderById(id, data.token);
      setOrder(getOrder);
      console.log(getOrder);
    }
    if (data.token) getOrderClient();
    else history.push('/login');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const multValues = (valueA, valueB) => {
    const mult = (Number(valueA) * parseFloat(valueB)).toFixed(2);
    return String(mult).replace('.', ',');
  };

  return (
    <div>
      <h1 data-testid="top-title">Detalhes do Pedido</h1>
      {order.length > 0 ? (
        <div>
          <p data-testid="order-number">{`Pedido ${order[0].saleId}`}</p>
          <p data-testid="order-date">{`${order[0].saleDate}`}</p>
          {order.map((item, index) => (
            <div key={ index }>
              <p data-testid={ `${index}-product-name` }>{item.productName}</p>
              <p data-testid={ `${index}-product-qtd` }>{item.productQuantity}</p>
              <p data-testid={ `${index}-product-total-value` }>
                {(`R$ ${multValues(item.productQuantity, item.productPrice)}`)}
              </p>
            </div>))}
          <p data-testid="order-total-value">
            {`R$ ${order[0].totalPrice}`.replace('.', ',')}
          </p>
        </div>)
        : <span>Não há pedidos</span>}
    </div>
  );
}

export default OrdersUserDetails;
