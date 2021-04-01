import React, { useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import ProductsContext from '../context/ProductsContext';
import MenuAndTopBar from '../components/MenuAndTopBar';
import OrderCard from '../components/OrderCard';
import { getOrdersByUserId, getAllOrders } from '../services/API';
import '../styles/pages/Orders.css';

function Orders({ location: { pathname } }) {
  const { orders, setOrders } = useContext(ProductsContext);
  const user = JSON.parse(localStorage.getItem('user'));
  const isAdmin = pathname.includes('admin');
  const allOrdersAdm = () => (
    getAllOrders().then((result) => setOrders(result))
  );
  const ordersById = () => (
    getOrdersByUserId(user.id).then((result) => setOrders(result))
  );
  useEffect(() => {
    if (user && isAdmin) allOrdersAdm();
    if (user && !isAdmin) ordersById();
    // eslint-disable-next-line
  }, []);
  if (!user) return <Redirect to="/login" />;
  if (orders.length === 0) {
    return (
      <div className={ isAdmin ? 'adminSideBarAdjust' : '' }>
        <MenuAndTopBar pathname={ pathname } title="Meus Pedidos" />
        <div className="noOrders">
          <h2>Não há pedidos registrados.</h2>
        </div>
      </div>
    );
  }
  return (
    <div className={ isAdmin ? 'adminSideBarAdjust' : '' }>
      <MenuAndTopBar pathname={ pathname } title="Meus Pedidos" />
      <div className="ordersPageContainer">
        <h2>Pedidos Pendentes</h2>
        <div className="ordersContainer">
          { orders.map((order, index) => (<OrderCard
            key={ order.orderId }
            order={ order }
            index={ index }
          />)) }
        </div>
      </div>
    </div>
  );
}

Orders.propTypes = {
  location: PropTypes.instanceOf(Object).isRequired,
};

export default Orders;
