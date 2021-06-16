import React, { useEffect, useState } from 'react';
import { getSales } from '../../../services/Sales';
import Header from '../../../components/Header/Header';
import AdminOrderCard from '../../../components/AdminOrderCard/AdminOrderCard';
import Loading from '../../../components/Loading/Loading'

import './Order.css';

export default function Orders() {
  const [sales, setSales] = useState([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchSales = async () => {
      const allSales = await getSales();
      setSales(allSales);
    };
    fetchSales();
    setTimeout(() => {
      setFetching(false)
    }, 2000)
  }, []);

  return (
    <div className="page-with-menu-admin">
      <Header title=".comCerveja" user="admin" />
      <div className="content-order-admin">
        {(!fetching && sales.length && sales.map((sale, index) => (
          <AdminOrderCard
            sale={sale}
            key={sale.id}
            index={index}
          />
        )))
          || (<Loading />) }
      </div>
    </div>
  );
}
