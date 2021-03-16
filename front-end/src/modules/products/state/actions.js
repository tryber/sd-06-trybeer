import ActionTypes from './types';

export const fetchProducts = () => ({
  type: ActionTypes.FETCH_PRODUCTS,
});

export const fetchProductsSuccess = (data) => ({
  type: ActionTypes.FETCH_PRODUCTS_SUCCESS,
  payload: { data },
});

export const fetchProductsError = (error) => ({
  type: ActionTypes.FETCH_PRODUCTS_ERROR,
  payload: { error },
});

export const setPage = (page) => ({
  type: ActionTypes.SET_PAGE,
  payload: { page },
});

export const setLimit = (limit) => ({
  type: ActionTypes.SET_LIMIT,
  payload: { limit },
});

export const setSort = ({ sort, sortAsc }) => ({
  type: ActionTypes.SET_SORT,
  payload: { sort, sortAsc },
});

export const setSearchText = (searchText) => ({
  type: ActionTypes.SET_SEARCH_TEXT,
  payload: { searchText },
});
