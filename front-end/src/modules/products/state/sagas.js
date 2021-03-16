import { takeLatest, fork, all } from 'redux-saga/effects';
import ActionTypes from './types';
import handleFetchProducts from './effects';

function* watchFetchRequest() {
  yield takeLatest(ActionTypes.FETCH_PRODUCTS, handleFetchProducts);
  yield takeLatest(ActionTypes.SET_PAGE, handleFetchProducts);
  yield takeLatest(ActionTypes.SET_LIMIT, handleFetchProducts);
  yield takeLatest(ActionTypes.SET_SORT, handleFetchProducts);
  yield takeLatest(ActionTypes.SET_SEARCH_TEXT, handleFetchProducts);
}

export default function* productsSaga() {
  yield all([
    fork(watchFetchRequest),
  ]);
}
