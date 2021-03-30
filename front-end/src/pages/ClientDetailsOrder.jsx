import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import BeerContext from '../context/BeerContext';
import ControllerHeader from '../components/Header-SideBar/ControllerHeader';
import CardClientDetailsOrder from '../components/ClientDetailsOrder/CardClientOrder';
import { tokenExists } from '../services/index';
import '../css/General.css';
import '../css/ClientDetailsOrder.css';

function ClientDetailsOrder() {
  const history = useHistory();
  const {
    productsOrder,
    saleIdOrder,
    dateOrder,
    totalPriceOrder,
  } = useContext(BeerContext);
  const [products, setProducts] = useState(false);

  useEffect(() => {
    tokenExists(history);
    setProducts(productsOrder);
  }, [productsOrder, history]);

  return (
    <div>
      <ControllerHeader />
      <section className="client-order-details-container">
        <p data-testid="order-number">{`Pedido ${saleIdOrder}`}</p>
        <p data-testid="order-date">{`Data: ${dateOrder}`}</p>
        <p data-testid="order-total-value">{`Total: R$ ${totalPriceOrder}`}</p>
        <section className="list">
          { products && products
            .map((obj, index) => (
              <CardClientDetailsOrder key={ index } product={ obj } index={ index } />
            ))}
        </section>
      </section>
    </div>
  );
}

export default ClientDetailsOrder;
