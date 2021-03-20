import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import GlobalStyle from './Style/GlobalStyle';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Profile from './Pages/Profile';
import Provider from './context/Provider';
import './App.css';
import Products from './Pages/Products';
import Cart from './Pages/Checkout';

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
          <Route exact path="/checkout" component={ Cart } />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
