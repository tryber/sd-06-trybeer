import React from 'react';
import { useHistory } from 'react-router-dom';
import TopMenuAdmin from '../components/TopMenuAdmin/TopMenu';
import Admin from '../components/ProfileAdmin/Admin';

export default function AdminProfile() {
  const history = useHistory();
  const tokenFromLocalStorage = localStorage.getItem('token');

  const handleRedirect = (token) => {
    if (!token) return history.push('/login');
  };

  return (
    <div>
      {handleRedirect(tokenFromLocalStorage)}
      <TopMenuAdmin pageTitle="TryBeer" />
      <Admin />
    </div>
  );
}
