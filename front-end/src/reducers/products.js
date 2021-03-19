import { PROD_LIST, CART_LIST, ID, QUANTITY, REMOVE, PRICE } from '../actions';

const INITIAL_STATE = {
  price: 0,
  globalID: [],
  quantity: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0 },
  cartList: [],
  products: [],
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
  case PRICE:
    return { ...state, price: action.number };
  case PROD_LIST:
    return {
      ...state, products: action.array,
    };
  case CART_LIST:
    return {
      ...state,
      cartList: [...state.cartList, {
        id: action.id,
        name: action.name,
        price: action.price,
        quantity: action.quantity,
        imgUrl: action.url,
      }],
    };
  case ID:
    return {
      ...state, globalID: [...state.globalID, action.id],
    };
  case QUANTITY:
    return {
      ...state, quantity: { ...state.quantity, [action.id]: action.quantity },
    };
  case REMOVE:
    return {
      ...state, cartList: action.array,
    };
  default:
    return state;
  }
}
