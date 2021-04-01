import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import UserProvider from './context/UserProvider';
import ProductsProvider from './context/ProductsProvider';
import Login from './pages/Login';
import Orders from './pages/Orders';
import Products from './pages/Products';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Checkout from './pages/Checkout';
import OrderDetails from './pages/OrderDetails';
import './styles/global.css';

function App() {
  return (
    <UserProvider>
      <ProductsProvider>
        <Switch>
          <Route exact path="/admin/orders" component={ Orders } />
          <Route exact path="/orders" component={ Orders } />
          <Route exact path="/admin/orders/:id" component={ OrderDetails } />
          <Route exact path="/orders/:id" component={ OrderDetails } />
          <Route exact path="/admin/profile" component={ Profile } />
          <Route exact path="/login" component={ Login } />
          <Route exact path="/products" component={ Products } />
          <Route exact path="/register" component={ Register } />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/checkout" component={ Checkout } />
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
        </Switch>
      </ProductsProvider>
    </UserProvider>
  );
}

export default App;
