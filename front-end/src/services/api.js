const contentType = {
  'Content-Type': 'application/json',
};

const fetchLogin = async (email, password) => {
  const response = await fetch('http://localhost:3001/login', {
    method: 'POST',
    headers: contentType,
    body: JSON.stringify({ email, password }),
  }).then((res) => res.json());
  // if (response.message) return false;
  return response;
};

const fetchRegister = async (name, email, password, check) => {
  const response = await fetch('http://localhost:3001/register', {
    method: 'POST',
    headers: contentType,
    body: JSON.stringify({
      name,
      email,
      password,
      role: (check ? 'administrator' : 'client') }),
  }).then((res) => res.json());

  if (response.message) return false;
  return response;
};

<<<<<<< HEAD
const fetchProducts = async () => {
  const response = await fetch('http://localhost:3001/products', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(),
  }).then((res) => res.json());

  if (response.message) return false;
  return response;
=======
const fetchChangeName = async (name, email) => {
  await fetch('http://localhost:3001/changeName', {
    method: 'PUT',
    headers: contentType,
    body: JSON.stringify({
      name,
      email,
    }),
  });
>>>>>>> main-group-2
};

module.exports = {
  fetchLogin,
  fetchRegister,
<<<<<<< HEAD
  fetchProducts,
=======
  fetchChangeName,
>>>>>>> main-group-2
};
