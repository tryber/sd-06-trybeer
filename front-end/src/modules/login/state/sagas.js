import { takeLatest, fork, all } from 'redux-saga/effects';
import ActionTypes from './types';
import { handlePostLogin, handlePostRegister } from './effects';

function* watchPostRequest() {
  yield takeLatest(ActionTypes.POST_LOGIN, handlePostLogin);
  yield takeLatest(ActionTypes.POST_REGISTER, handlePostRegister);
}

export default function* loginSaga() {
  yield all([
    fork(watchPostRequest),
  ]);
}
