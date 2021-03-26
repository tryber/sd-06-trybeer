import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import MenuTop from '../components/menuClient/MenuTop';
import OrdersCard from '../components/orders/OrdersCard';
import api from '../services/api';

const Orders = ({ history }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchOrders() {
      const user = JSON.parse(localStorage.user);
      const response = await api.getAllOrders(user.token);
      if (response.message) return history.push('/login');
      setOrders(response);
    }
    fetchOrders();
  }, [history]);
  return (
    <div>
      <MenuTop name="Meus Pedidos" />
      <OrdersCard orders={ orders } />
    </div>
  );
};

Orders.propTypes = {
  history: PropTypes.objectOf(Object).isRequired,
};

export default Orders;
