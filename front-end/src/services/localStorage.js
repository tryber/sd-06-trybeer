const setUserData = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

module.exports = {
  setUserData,
};
