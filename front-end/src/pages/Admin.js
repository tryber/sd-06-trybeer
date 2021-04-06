import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import TrybeerContext from '../context/TrybeerContext';
import { TopMenu } from '../components';
import './PagesCSS/AdminOrders.css';

function Admin() {
  const history = useHistory();
  const { user } = useContext(TrybeerContext);
  const { email, name } = user;

  if (!user.token) {
    history.push('/login');
  }

  return (
    <div>
      <TopMenu />
      <div className="container-detail">
        <div className="order-card-detail-container panel-orders-detail">
          <h4>Perfil</h4>
          <p data-testid="profile-name">
            {`Nome: ${name}`}
          </p>
          <p data-testid="profile-email">
            {`Email: ${email}`}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Admin;
