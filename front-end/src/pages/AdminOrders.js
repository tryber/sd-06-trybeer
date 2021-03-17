import React from 'react';
import { connect } from 'react-redux';
import SideBarAdmin from '../components/SideBarAdmin';

class AdminOrders extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div>
        <SideBarAdmin />
        <p>Pedidos Pendentes</p>
      </div>
    );
  }
}


export default connect(null, null)(AdminOrders);
