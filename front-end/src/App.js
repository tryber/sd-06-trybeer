import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GlobalProvider } from './Contexts/GlobalContext';

import theme from './Styles/Theme';

import Login from './Pages/Login';
import Register from './Pages/Register';
import Profile from './Pages/Profile';
import Products from './Pages/Products';

function App() {
  return (
    <ThemeProvider theme={ theme }>
      <GlobalProvider>
        <Switch>
          <Route exact path="/" component={ () => <Redirect to="/login" /> } />
          <Route path="/login" component={ Login } />
          <Route path="/register" component={ Register } />
          <Route path="/profile" component={ Profile } />
          <Route path="/products" component={ Products } />
        </Switch>
      </GlobalProvider>
    </ThemeProvider>
  );
}

export default App;
