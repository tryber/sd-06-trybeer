const url = 'http://localhost:3001/users';
const registerURL = 'http://localhost:3001/users/register';

const validateUser = async (email, password) => {
  const validation = await fetch(`${url}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
    .then((response) => response.json());

  return validation;
};

const registerUser = async (name, email, password, seller) => {
  const role = (seller === true) ? 'administrator' : 'client';

  const registeredUser = await fetch(`${registerURL}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password, role }),
    })
    .then((response) => response.json());

  return registeredUser;
};

module.exports = {
  validateUser,
  registerUser,
};
