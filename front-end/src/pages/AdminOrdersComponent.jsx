import React, { useState } from 'react';
import { SideBarAdmin, OrdersCards } from '../components';

function AdminOrders() {
  const [orders] = useState([]);

  return (
    <div className="admin_orders">
      <SideBarAdmin />
      <h1>Pedidos</h1>
      <div className="order-list">
        {orders.map((element, index) => (
          <div key={ element.id }>
            <OrdersCards
              element={ element }
              index={ index }
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminOrders;
