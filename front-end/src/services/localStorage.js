const setUserData = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

const getCartItems = () => {
  const cartItems = JSON.parse(localStorage.getItem('cart'));
  if (cartItems) return cartItems;
  localStorage.setItem('cart', JSON.stringify([]));
  return [];
};

const updateCartItemsQty = (updatedCartItems) => {
  localStorage.setItem('cart', JSON.stringify(updatedCartItems));
};

const getUserToken = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user) {
    return user.token;
  }
  return false;
};

const getUserData = () => JSON.parse(localStorage.getItem('user'));

const logOff = () => (
  localStorage.removeItem('user')
);

const clearCart = () => {
  localStorage.setItem('cart', JSON.stringify([]));
};

module.exports = {
  setUserData,
  getCartItems,
  updateCartItemsQty,
  getUserToken,
  getUserData,
  logOff,
  clearCart,
};
