import { all, fork } from 'redux-saga/effects';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';

import loginReducer from '../modules/login/state/reducers';
import loginSaga from '../modules/login/state/sagas';

import productsSaga from '../modules/products/state/sagas';
import productsReducer from '../modules/products/state/reducers';

const rootReducer = combineReducers({
  login: loginReducer,
  products: productsReducer,
});

function* rootSaga() {
  yield all([
    fork(loginSaga),
    fork(productsSaga),
  ]);
}

// CONFIGURAÇÃO PADRÃO DO REDUX
// CRIAÇÃO DO STORE DA APLICAÇÃO E COLOCA A SAGA PARA "ESCUTAR"
const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const middleware = applyMiddleware(sagaMiddleware);

  // const includeReduxDevTools = '__REDUX_DEVTOOLS_EXTENSION_COMPOSE__';

  // const composeEnhancers = process.env.NODE_ENV === 'development'
  //   ? window[includeReduxDevTools] : null;

  // const store = createStore(
  //   rootReducer,
  //   composeEnhancers(middleware),
  // );

  const store = createStore(
    rootReducer,
    middleware,
  );

  sagaMiddleware.run(rootSaga);

  return store;
};

export default configureStore;
