import React, { useState } from 'react';
// import api from '../services/api';

function OrdersClient() {
  const ordersClient = [
    { number: 1, data: '23/03', valor: 40.5 },
    { number: 2, data: '25/03', valor: 40.5 },
  ];

  const [orders] = useState(ordersClient);

  //   useEffect(async () => {
  //     const orders = await api.getOrdersById(2);
  //     console.log(orders);
  //   },
  //   []);

  return (
    <div>
      <h1 data-testid="top-title">Meus Pedidos</h1>
      {orders.map((order, index) => (
        // /orders/:numero-do-pedido
        <div key={ index } data-testid={ `${index}-card-container` }>
          <p data-testid={ `${index}-order-number` }>{`Pedido - ${order.number}`}</p>
          <p data-testid={ `${index}order-date` }>{`data - ${order.data}`}</p>
          <p data-testid={ `${index}-order-total-value` }>{`valor - ${order.valor}`}</p>
        </div>))}

    </div>
  );
}

export default OrdersClient;
