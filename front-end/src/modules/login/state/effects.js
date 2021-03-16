import { put } from 'redux-saga/effects';
import { createBrowserHistory } from 'history';
import * as actions from './actions';
import API from '../../../axios';
import Products from '../../products/pages/Products';
import Profile from '../../profileX/pages/Profile';

export function* handlePostLogin(action) {
  try {
    const { email, password } = action.payload;

    const response = yield API.post('/login', { email, password });
    const { data } = response;

    yield put(actions.postLoginSuccess(data));

    const { token, role, name } = data;
    const user = { token, email, role, name };

    yield localStorage.setItem('user', JSON.stringify(user));

    const history = createBrowserHistory();

    const storage = yield JSON.parse(localStorage.getItem('user'));
    const existToken = storage.token;

    if (existToken && storage.role === 'client') history.push('/products', Products);
    if (existToken && storage.role === 'administrator') {
      history.push('/admin/orders', Profile);
    }
  } catch (error) {
    yield put(actions.postLoginError(error));
  }
}

export function* handlePostRegister(action) {
  try {
    const { email, password, name, role } = action.payload;

    const response = yield API.post('/users', { email, password, name, role });
    const { data } = response;

    if (data.message) return yield put(actions.postRegisterError(data.message));

    yield put(actions.postRegisterSuccess(data));

    const { token } = data;
    const user = { token, email, role, name };

    yield localStorage.setItem('user', JSON.stringify(user));

    const history = createBrowserHistory();

    const storage = yield JSON.parse(localStorage.getItem('user'));
    const existToken = storage.token;

    if (existToken && storage.role === 'client') history.push('/products', Products);
    if (existToken && storage.role === 'administrator') {
      history.push('/admin/orders', Profile);
    }
  } catch (error) {
    console.log(error);

    yield put(actions.postRegisterError(error));
  }
}
