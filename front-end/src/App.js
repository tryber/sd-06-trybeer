import React from 'react';
import ProductsProvider from './context/productsProvider';
import Routes from './Routes';
import './App.css';

function App() {
  return (
    <ProductsProvider>
      <Routes />
    </ProductsProvider>
  );
}

export default App;
