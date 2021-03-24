import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import ProviderGeneral from './context/ProviderGeneral';

ReactDOM.render(
  <React.StrictMode>
    <ProviderGeneral>
      <App />
    </ProviderGeneral>
  </React.StrictMode>,
  document.getElementById('root'),
);

serviceWorker.unregister();
