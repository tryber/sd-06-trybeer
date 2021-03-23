import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import api from '../services/api';

const AdminOrders = ({ history }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchOrders() {
      const user = JSON.parse(localStorage.user);
      const response = await api.getAllOrders(user.token);
      if (response.message) return history.push('/login');
      setOrders();
    }
    fetchOrders();
  }, [history]);

  return (
    <div>
      Admin Orders
      { orders }
    </div>
  );
};

AdminOrders.propTypes = {
  history: PropTypes.objectOf(Object).isRequired,
};

export default AdminOrders;
