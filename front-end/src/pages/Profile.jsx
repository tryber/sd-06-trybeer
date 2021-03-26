import React from 'react';
import jwtDecode from 'jwt-decode';
import TopMenu from '../components/TopMenu/TopMenu';
import TopMenuAdmin from '../components/TopMenuAdmin/TopMenu';
import User from '../components/ProfileUsers/User';

export default function Profile() {
  const tokenFromLocalStorage = localStorage.getItem('token');
  const tokenDecoded = jwtDecode(tokenFromLocalStorage);
  return (
    <div>
      {tokenDecoded.role === 'client' ? (
        <TopMenu data-testid="top-title" pageTitle="Meu perfil" />
      ) : (
        <TopMenuAdmin pageTitle="TryBeer" />
      )}
      <User />
    </div>
  );
}
