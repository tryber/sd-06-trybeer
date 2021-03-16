import ActionTypes from './types';

export const postLogin = ({ email, password }) => ({
  type: ActionTypes.POST_LOGIN,
  payload: { email, password },
});

export const postLoginSuccess = (data) => ({
  type: ActionTypes.POST_LOGIN_SUCCESS,
  payload: { data },
});

export const postLoginError = (error) => ({
  type: ActionTypes.POST_LOGIN_ERROR,
  payload: { error },
});

export const postRegister = ({ email, password, name, role }) => ({
  type: ActionTypes.POST_REGISTER,
  payload: { email, password, name, role },
});

export const postRegisterSuccess = (data) => ({
  type: ActionTypes.POST_REGISTER_SUCCESS,
  payload: { data },
});

export const postRegisterError = (error) => ({
  type: ActionTypes.POST_REGISTER_ERROR,
  payload: { error },
});
