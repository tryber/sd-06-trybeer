import ActionTypes from './types';

const initialState = {
  loading: false,
  error: '',
  data: {
    token: '',
    role: '',
    name: '',
    id: '',
  },
};

const postLogin = (state) => (
  {
    ...state,
    loading: true,
  }
);

const postLoginSuccess = (state, action) => {
  const { data } = action.payload;

  return ({
    ...state,
    loading: false,
    data,
  });
};

const postLoginError = (state, action) => {
  const { error } = action.payload;

  return ({
    ...state,
    loading: false,
    error,
  });
};

const postRegister = (state) => (
  {
    ...state,
    loading: true,
  }
);

const postRegisterSuccess = (state, action) => {
  const { data } = action.payload;

  return ({
    ...state,
    data,
    loading: false,
  });
};

const postRegisterError = (state, action) => {
  const { error } = action.payload;
  return ({
    ...state,
    error,
    loading: false,
  });
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
  case ActionTypes.POST_LOGIN:
    return postLogin(state);
  case ActionTypes.POST_LOGIN_SUCCESS:
    return postLoginSuccess(state, action);
  case ActionTypes.POST_LOGIN_ERROR:
    return postLoginError(state, action);
  case ActionTypes.POST_REGISTER:
    return postRegister(state);
  case ActionTypes.POST_REGISTER_SUCCESS:
    return postRegisterSuccess(state, action);
  case ActionTypes.POST_REGISTER_ERROR:
    return postRegisterError(state, action);
  default:
    return state;
  }
};

export default loginReducer;
