import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { TopMenu } from '../components';
import { verifyToken } from '../utils/verifications';
import TrybeerContext from '../context/TrybeerContext';
import formatedPrice from '../utils/formatedPrice';
import { put } from '../api/fetchFunctions';

function AdminOrderDetails(props) {
  const { user } = useContext(TrybeerContext);
  const [orderCart, setOrderCart] = useState([]);
  const [hasState, setHasState] = useState(false);
  const [isShowing, setIsShowing] = useState(true);
  const { location: { state }, history } = props;

  const fetchOrderDetails = async () => {
    if (state) {
      const order = await verifyToken(`admin/orders/details/${state.id}`, user, history);
      setOrderCart(order);
      if (order[0].status !== 'Pendente') setIsShowing(false);
    }
  };

  const observeState = () => {
    if (!state) {
      history.push('/login');
    } else {
      setHasState(true);
    }
  };

  const markAsDone = async (status) => {
    await put(`admin/orders/${state.id}`, user.token, { status });
    fetchOrderDetails();
    setIsShowing(false);
  };

  useEffect(() => {
    observeState();
    fetchOrderDetails();
  }, []);

  return (
    <div>
      <TopMenu />
      <div className="container-detail">
        <div className="order-card-detail-container panel-orders-detail">
          {
            hasState && (
              <div>
                <div className="content-panel">
                  <div>
                    {
                      orderCart[0] && (
                        <div className="title-card">
                          <div data-testid="order-number" className="title">
                            {`Pedido ${orderCart[0].sale_id}` }
                          </div>
                          <div data-testid="order-status">
                            { orderCart[0].status }
                          </div>
                        </div>
                      )
                    }
                    {
                      orderCart.map(({
                        quantity,
                        name,
                        price,
                        sale_id: saleId,
                      }, index) => (
                        <div
                          key={ saleId }
                          className="order-card-container"
                          data-testid={ `${index}-order-card-container` }
                        >
                          <div data-testid={ `${index}-product-qtd` } className="quantity">
                            {`${quantity}` }
                          </div>
                          <div data-testid={ `${index}-product-name` } className="name">
                            {`${name}` }
                          </div>
                          <div
                            data-testid={ `${index}-order-unit-price` }
                            className="price"
                          >
                            {`(${formatedPrice(price)}) un` }
                          </div>
                          <div
                            data-testid={ `${index}-product-total-value` }
                            className="priceTotal"
                          >
                            { `${formatedPrice((price * quantity).toFixed(2))}` }
                          </div>
                        </div>
                      ))
                    }
                  </div>
                  <div data-testid="order-total-value" className="order-total-value">
                    { orderCart[0] && formatedPrice(orderCart[0].total_price) }
                  </div>
                </div>
              </div>
            )
          }
          {
            isShowing && (
              <div className="btn-delivery">
                <button
                  type="button"
                  onClick={ () => markAsDone('Cancelado') }
                  className="btn1 saveButton btn-cancel"
                >
                  Cancelar Pedido
                </button>
                <button
                  type="button"
                  data-testid="mark-as-delivered-btn"
                  onClick={ () => markAsDone('Entregue') }
                  className="btn saveButton btn-scs"
                >
                  Marcar como entregue
                </button>
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
}

AdminOrderDetails.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

export default AdminOrderDetails;
