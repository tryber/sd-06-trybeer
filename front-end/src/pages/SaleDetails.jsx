import React from 'react';
import { useHistory } from 'react-router-dom';
import TopMenu from '../components/TopMenu/TopMenu';
import SalesDetailsCards from '../components/SalesDetails/SalesDateilsCard';

export default function SaleDetails() {
  const tokenFromLocalStorage = localStorage.getItem('token');
  const history = useHistory();

  const handleRedirect = (token) => {
    if (!token) return history.push('/login');
  };

  return (
    <div>
      { handleRedirect(tokenFromLocalStorage) }
      <TopMenu pageTitle="Detalhes de Pedido" />
      <SalesDetailsCards />
    </div>
  );
}
