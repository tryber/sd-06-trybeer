import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect } from 'react-router-dom';

import Products from '../pages/Products';
import Register from '../pages/Register';
import Profile from '../pages/Profile';
import Login from '../pages/Login';
import PedidosAdmin from '../pages/PedidosAdmin';
import ProfileAdmin from '../pages/ProfileAdmin';
import DetalhesPedidosAdmin from '../pages/DetalhesPedidosAdmin';
import Checkout from '../pages/Checkout';
import OrdersClient from '../pages/OrdersClient';

const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/">
        <Redirect from="/" to="/login" />
      </Route>
      <Route path="/admin/orders/:id" component={ DetalhesPedidosAdmin } />
      <Route path="/admin/orders" component={ PedidosAdmin } />
      <Route path="/admin/profile" component={ ProfileAdmin } />
      <Route path="/login" component={ Login } />
      <Route path="/register" component={ Register } />
      <Route path="/products" component={ Products } />
      <Route path="/profile" component={ Profile } />
      <Route path="/checkout" component={ Checkout } />
      <Route path="/orders" component={ OrdersClient } />

    </Switch>
  </Router>
);

export default Routes;
