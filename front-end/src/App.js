import React from 'react';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import {
  Login,
  Signup,
  CostumerProfile,
  CostumerProducts,
  // CostumerCheckout,
} from './pages';
import Provider from './context/Provider';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Provider>
          <Switch>
            <Route path="/login" component={ Login } />
            <Route path="/register" component={ Signup } />
            <Route path="/profile" component={ CostumerProfile } />
            <Route path="/products" component={ CostumerProducts } />
            <Route path="/checkout" component={ CostumerCheckout } />
            <Route path="/orders" component={ () => <h1>/cliente/meuspedidos</h1> } />
            <Route path="/admin/orders" component={ () => <h1>/admin/orders</h1> } />
            <Route path="/" component={ () => <Redirect to="/login" /> } />
          </Switch>
        </Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
