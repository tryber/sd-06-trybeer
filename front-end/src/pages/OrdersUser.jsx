import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import api from '../services/api';
import MenuTop from '../components/menuClient/MenuTop';
import OrdersCard from '../components/pageOrders/OrdersCard';

function OrdersUser({ history }) {
  const [orders, setOrders] = useState([]);
  // const [or, setOr] = useState([]);
  const data = new Date().toLocaleDateString('zh-Hans-CN');

  useEffect(() => {
    async function fetchOrders() {
      const user = JSON.parse(localStorage.user);
      const response = await api.getAllOrdersByIdUser(user.id, data);
      if (!user.token) return history.push('/login');
      setOrders(response);
    }
    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <MenuTop name="Meus Pedidos" />
      <OrdersCard orders={ orders } />
    </div>
  );
}

OrdersUser.propTypes = {
  history: PropTypes.objectOf(Object).isRequired,
};

export default OrdersUser;
