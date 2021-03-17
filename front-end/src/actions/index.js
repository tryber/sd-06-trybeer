export const EMAIL = 'EMAIL';
export const PASSWORD = 'PASSWORD';
export const REG_NAME = 'REG_NAME';
export const REG_EMAIL = 'REG_EMAIL';
export const REG_PASS = 'REG_PASS';
export const PROFILE_NAME = 'PROFILE_NAME';
export const USER_INFO = 'USER_INFO';
export const CART_LIST = 'CART_LIST';
export const PROD_LIST = 'PROD_LIST';
export const ID = 'ID';
export const QUANTITY = 'QUANTITY';
export const REMOVE = 'REMOVE';
export const PRICE = 'PRICE';

export const validEmail = (boolean) => ({
  type: EMAIL,
  boolean,
});

export const validPassword = (boolean) => ({
  type: PASSWORD,
  boolean,
});

export const validNameReg = (boolean) => ({
  type: REG_NAME,
  boolean,
});

export const validEmailReg = (boolean) => ({
  type: REG_EMAIL,
  boolean,
});

export const validPassReg = (boolean) => ({
  type: REG_PASS,
  boolean,
});

export const profileName = (name) => ({
  type: PROFILE_NAME,
  name,
});

export const userInfos = (array) => ({
  type: USER_INFO,
  array,
});

export const prodList = (array) => ({
  type: PROD_LIST,
  array,
});

export const cartList = (array) => ({
  type: CART_LIST,
  array,
});

export const globalID = (id) => ({
  type: ID,
  id,
});

export const globalQuantity = (quantity, id) => ({
  type: QUANTITY,
  quantity,
  id,
});

export const removeCartItem = (array) => ({
  type: REMOVE,
  array,
});

export const updatePrice = (number) => ({
  type: PRICE,
  number,
});
