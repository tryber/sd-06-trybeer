import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import LoginProvider from './context/LoginProvider';
import Login from './pages/Login';
import Orders from './pages/Orders';
import Products from './pages/Products';

function App() {
  return (
    <LoginProvider>
      <BrowserRouter>
        <Switch>
          <Route path="/admin/orders" component={ Orders } />
          <Route path="/login" component={ Login } />
          <Route path="/products" component={ Products } />
        </Switch>
      </BrowserRouter>
    </LoginProvider>
  );
}

export default App;
