import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Provider from './context/Provider';
import Login from './pages/Login';
import Register from './pages/Register';
import './App.css';
import ClientProfile from './pages/ClientProfile';
import Products from './pages/Products';
import Orders from './pages/Orders';
import Cart from './pages/Cart';

function App() {
  return (
    <Provider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/login" component={ Login } />
        <Route exact path="/register" component={ Register } />
        <Route exact path="/profile" component={ ClientProfile } />
        <Route exact path="/products" component={ Products } />
        <Route exact path="/checkout" component={ Cart } />
        <Route exact path="/orders" component={ Orders } />
      </Switch>
    </Provider>
  );
}

export default App;
