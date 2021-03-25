import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import api from '../services/api';
import MenuTop from '../components/menuClient/MenuTop';
import OrdersCard from '../components/pageOrders/OrdersCard';

function OrdersUser({ history }) {
  const test = [{ id: 1, saleDate: '25/03', total_price: '2.20' }];
  const [orders] = useState(test);
  const [or, setOr] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.user);
    const buildOrRedirect = async () => {
      const list = await api.getOrdersByIdUser(2, data.token);
      setOr(list);
    };
    if (!data.token) return history.push('/login');
    buildOrRedirect();
    console.log('mount');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <MenuTop name="Meus Pedidos" />
      <OrdersCard orders={ orders } or={ or } />
    </div>
  );
}

OrdersUser.propTypes = {
  history: PropTypes.objectOf(Object).isRequired,
};

export default OrdersUser;
