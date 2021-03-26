import React from 'react';
import { useHistory } from 'react-router-dom';
import TopMenuAdmin from '../components/TopMenuAdmin/TopMenu';
import AdminOrderDetail from '../components/AdminOrderDetail/AdminOrderDetail';

export default function AdminSaleDetail() {
  const tokenFromLocalStorage = localStorage.getItem('token');
  const history = useHistory();
  const handleRedirect = (token) => {
    if (!token) return history.push('/login');
  };

  return (
    <div>
      { handleRedirect(tokenFromLocalStorage) }
      <TopMenuAdmin pageTitle="TryBeer" />
      <AdminOrderDetail />
    </div>
  );
}
