import React from 'react';
import { Route, Switch } from 'react-router-dom';
import history from './utilities/history';

import {
  Login, Register, Profile, Products, Orders, AdminOrders, Home, Checkout, AdminProfile,
} from './pages';

function App() {
  return (
    <div className="App" history={ history }>
      <Switch>
        {/* <Route exact path="/" component={ TEST } /> */}
        <Route exact path="/" component={ Home } />
        <Route exact path="/login" component={ Login } />
        <Route exact path="/register" component={ Register } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/orders" component={ Orders } />
        <Route exact path="/products" component={ Products } />
        <Route exact path="/checkout" component={ Checkout } />
        <Route exact path="/admin/profile" component={ AdminOrders } />
        <Route exact path="/admin/profile" component={ AdminProfile } />
        <Route exact path="/admin/orders" component={ AdminOrders } />
      </Switch>
    </div>
  );
}

export default App;
