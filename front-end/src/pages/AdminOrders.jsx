import React from 'react';
import TopMenuAdmin from '../components/TopMenuAdmin/TopMenu';
import AdminOrderCard from '../components/adminOrderCard/AdminOrderCard';

export default function AdminOrders() {
  return (
    <div>
      <div><TopMenuAdmin pageTitle="TryBeer" /></div>
      <AdminOrderCard />
    </div>
  );
}
