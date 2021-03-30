import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ControllerHeader from '../components/Header-SideBar/ControllerHeader';
import { getOrders } from '../api/index';
import { tokenExists } from '../services/index';
import OrderCard from '../components/OrderCard';

function Orders() {
  const [orders, setOrders] = useState(false);
  const history = useHistory();

  useEffect(() => {
    getOrders(setOrders);
  }, []);

  useEffect(() => {
    tokenExists(history);
  }, [history]);

  return (
    <div>
      <ControllerHeader />
      <section>
        { orders && orders.map((order, index) => (<OrderCard
          key={ index }
          index={ index }
          order={ order }
        />))}
      </section>
    </div>
  );
}

export default Orders;
