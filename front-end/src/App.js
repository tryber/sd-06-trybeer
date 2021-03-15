import React from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';

import Login from './pages/Login';
import Orders from './pages/Orders';
import Products from './pages/Products';
import Register from './pages/Register';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route path="/login" component={ Login } />
        <Route path="/products" component={ Products } />
        <Route path="/register" component={ Register } />
        <Route path="/admin/orders" component={ Orders } />
      </Switch>
    </div>
  );
}

export default App;
