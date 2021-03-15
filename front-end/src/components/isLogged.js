const isLogged = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user) return false;
  return true;
};

export default isLogged;
