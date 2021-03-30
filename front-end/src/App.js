import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import GlobalStyle from './Style/GlobalStyle';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Profile from './Pages/Profile';
import Provider from './context/Provider';
import './App.css';
import Products from './Pages/Products';
import Orders from './Pages/Orders';
import Checkout from './Pages/Checkout';
import OrderDetail from './Pages/OrderDetail';
import AdminOrders from './Pages/AdminOrders';
import AdminProfile from './Pages/AdminProfile';

function App() {
  return (
    <Provider>
      <GlobalStyle />
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <Route exact path="/login" component={ Login } />
          <Route exact path="/register" component={ Register } />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/products" component={ Products } />
          <Route exact path="/checkout" component={ Checkout } />
          <Route exact path="/orders" component={ Orders } />
          <Route path="/orders/:orderId" exact component={ OrderDetail } />
          <Route exact path="/admin/profile" component={ AdminProfile } />
          <Route path="/admin/orders" component={ AdminOrders } />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
