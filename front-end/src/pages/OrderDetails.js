import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useParams } from 'react-router-dom';
import MenuAndTopBar from '../components/MenuAndTopBar';
import { getUserToken } from '../services/localStorage';
import dateFormatter from '../services/dateFormatter';
import API from '../services/API';
import OrderDetailCard from '../components/OrderDetailCard';
import '../styles/pages/OrderDetails.css';

function OrderDetails({ location: { pathname } }) {
  const { id } = useParams();
  const [currentOrder, setCurrentOrder] = useState(false);
  const [delivered, setDelivered] = useState(false);
  const history = useHistory();
  const isAdmin = pathname.includes('admin');

  const orderById = async () => {
    const order = await API.getOrderProducts(id);
    setCurrentOrder(order);
    if (order.length > 0) {
      setDelivered(order[0].status === 'Entregue');
    } else {
      setDelivered(false);
    }
  };

  const checkToken = async () => {
    const token = getUserToken();
    const response = await API.validateUserToken(token);
    if (!response) history.push('/login');
  };

  const handleStatus = (orderId) => {
    setDelivered(true);
    API.changeStatus(orderId);
  };

  useEffect(() => {
    checkToken();
    orderById();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    orderById();
    // eslint-disable-next-line
  }, [currentOrder]);

  return (
    <div className={ isAdmin ? 'adminSideBarAdjust' : '' }>
      { (currentOrder.length > 0) && (
        <>
          <MenuAndTopBar title="Detalhes do Pedido" pathname={ pathname } />
          <div className="orderDetailsContainer">
            <div className="orderDetailsTitleContainer">
              <h2 data-testid="order-number">
                { `Pedido ${currentOrder[0].id}` }
              </h2>
              { isAdmin ? (
                <h2
                  className={ currentOrder[0].status === 'Entregue'
                    ? 'statusDelivered' : 'statusNotDelivered' }
                  data-testid="order-status"
                >
                  { currentOrder[0].status }
                </h2>
              ) : (
                <h2 data-testid="order-date">
                  { dateFormatter(currentOrder[0].date) }
                </h2>
              ) }
            </div>
            <ul>
              { currentOrder.map((product, index) => (
                <OrderDetailCard
                  product={ product }
                  index={ index }
                  isAdmin={ isAdmin }
                  key={ product.name }
                />
              )) }
            </ul>
            <h2 data-testid="order-total-value">
              { `Total: R$ ${parseFloat(currentOrder[0].total)
                .toFixed(2).replace('.', ',')}.` }
            </h2>
            { isAdmin && (
              <button
                data-testid="mark-as-delivered-btn"
                type="button"
                onClick={ () => handleStatus(currentOrder[0].id) }
                style={ { display: delivered ? 'none' : 'block' } }
              >
                Marcar como entregue
              </button>
            ) }
          </div>
        </>
      ) }
    </div>
  );
}

OrderDetails.propTypes = {
  location: PropTypes.instanceOf(Object).isRequired,
};

export default OrderDetails;
