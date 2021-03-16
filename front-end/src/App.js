import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import PublicRoutes from './PublicRoutes';
import configureStore from './state';

const store = configureStore();

const App = () => (
  <Provider store={ store }>
    <PublicRoutes />
  </Provider>
);

export default App;
