import ActionTypes from './types';

const initialState = {
  loading: false,
  error: '',
  data: {
    rows: [],
    count: '',
  },
  page: 1,
  limit: 12,
  sort: 'name',
  sortAsc: true,
  searchText: '',
};

const fetchProducts = (state) => (
  {
    ...state,
    loading: true,
  }
);

const fetchProductsSuccess = (state, action) => {
  const { data } = action.payload;

  return ({
    ...state,
    loading: false,
    data,
  });
};

const fetchProductsError = (state, action) => {
  const { error } = action.payload;

  return ({
    ...state,
    loading: false,
    error,
  });
};

const setPage = (state, action) => {
  const { page } = action.payload;
  return ({
    ...state,
    page,
  });
};

const setLimit = (state, action) => {
  const { limit } = action.payload;
  return ({
    ...state,
    limit,
    loading: true,
    page: 1,
  });
};

const setSort = (state, action) => {
  const { sort, sortAsc } = action.payload;
  return ({
    ...state,
    sort,
    sortAsc,
    loading: true,
  });
};

const setSearchText = (state, action) => {
  const { searchText } = action.payload;
  return ({
    ...state,
    searchText,
    loading: true,
    page: 1,
  });
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
  case ActionTypes.FETCH_PRODUCTS:
    return fetchProducts(state);
  case ActionTypes.FETCH_PRODUCTS_SUCCESS:
    return fetchProductsSuccess(state, action);
  case ActionTypes.FETCH_PRODUCTS_ERROR:
    return fetchProductsError(state, action);
  case ActionTypes.SET_PAGE:
    return setPage(state, action);
  case ActionTypes.SET_LIMIT:
    return setLimit(state, action);
  case ActionTypes.SET_SORT:
    return setSort(state, action);
  case ActionTypes.SET_SEARCH_TEXT:
    return setSearchText(state, action);
  default:
    return state;
  }
};

export default productsReducer;
