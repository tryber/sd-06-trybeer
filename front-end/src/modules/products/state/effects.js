import { put, select } from 'redux-saga/effects';
import * as actions from './actions';
import API from '../../../axios';
import createQuery from '../../../utils/createQuery';

function* handleFetchProducts() {
  const route = '/products';
  const page = yield select((state) => state.products.page);
  const limit = yield select((state) => state.products.limit);
  const sort = yield select((state) => state.products.sort);
  const sortAsc = yield select((state) => state.products.sortAsc);
  const searchText = yield select((state) => state.products.searchText);

  const query = createQuery({ route, page, limit, sort, sortAsc, searchText });

  try {
    const response = yield API.get(query);
    const { data } = response;

    yield put(actions.fetchProductsSuccess(data));
  } catch (error) {
    yield put(actions.fetchProductsError(error));
  }
}

export default handleFetchProducts;
