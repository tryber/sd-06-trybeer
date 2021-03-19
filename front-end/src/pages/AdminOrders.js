import React, { useEffect, useState } from 'react';
import MenuAdmin from '../components/MenuAdmin';
import OrderCard from '../components/OrderCard';
import { allSales } from '../services/salesServices';

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  const getAllOrders = async () => {
    const responseOrders = await allSales();
    setOrders(responseOrders);
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  return (
    <div>
      <MenuAdmin />
      {orders.map((order, index) => (
        <OrderCard
          key={ index }
          index={ index }
          saleId={ order.id }
          street={ order.delivery_address }
          streetNR={ order.delivery_number }
          totalValue={ order.total_price }
          status={ order.status }
        />
      ))}
    </div>
  );
}

export default AdminOrders;
