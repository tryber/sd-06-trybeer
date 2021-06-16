import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Header from '../../../components/Header/Header';
import { getAdminSaleDetails, fullfilSale } from '../../../services/Sales';
import capitalize from '../../../utils/capitalize';
import { parseCartPrice } from '../../../utils/parseValues';
import './AdminOrdersDetail.css';
import totalPrice from './totalPrice.png';

export default function AdminOrdersDetail({ match: { params: { id } } }) {
  const [saleDetails, setSaleDetails] = useState({});

  useEffect(() => {
    const fetchSale = async () => {
      const sale = await getAdminSaleDetails(id);
      console.log(sale, 'sale');
      setSaleDetails(sale);
    };
    fetchSale();
  }, [id]);

  const fullfilOrder = async () => {
    const newState = {
      ...saleDetails,
      sale: { ...saleDetails.sale, status: 'entregue' },
    };
    setSaleDetails(newState);
    await fullfilSale(id);
  };

  const { saleProducts, sale } = saleDetails;

  return (
    <div className="page-with-menu-admin">
      <Header title=".comCerveja" user="admin" />
      <div className="sale-details">
      {saleProducts && (
        <>
          <div className="title-div-admin">
            <h2 data-testid="order-number">
              {`Pedido ${id}`}
            </h2>
            <h2 
            data-testid="order-status"
            className={
              `itemStatus ${sale.status === 'pendente' ? 'itemPending-admin' : 'itemDelivered-admin'}`
            }
            >
              {sale && capitalize(sale.status)}
            </h2>
          </div>
          <div >
              {saleProducts.map(({ quantity, name, price }, index) => (
                <div key={ index } className="detalhes-admin">
                  <p className="quantity-admin" data-testid={ `${index}-product-qtd` }>
                    {quantity}
                  </p>
                  <p className="name-admin" data-testid={ `${index}-product-name` }>
                    {name}
                  </p>
                  <p className="unit-admin"data-testid={ `${index}-order-unit-price` }>
                    {`(${parseCartPrice(price)})`}
                  </p>
                  <p className="total-admin" data-testid={ `${index}-product-total-value` }>
                    {parseCartPrice(price * quantity)}
                  </p>
                </div>
              ))}
              <div className="price-admin">
              <img className="total-price-admin" src={ totalPrice } alt="conta final" />
            <h2 data-testid="order-total-value">
              {sale && parseCartPrice(sale.total_price)}
            </h2>
            </div>
          </div>
          {sale && sale.status === 'pendente' && (
            <button
              type="button"
              data-testid="mark-as-delivered-btn"
              onClick={ fullfilOrder }
            >
              Marcar como entregue
            </button>
          )}
        </>
      )}
      </div>
    </div>
  );
}

AdminOrdersDetail.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};
