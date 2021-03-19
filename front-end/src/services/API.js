const getUserData = async (email, password) => {
  const res = await fetch('http://localhost:3001/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  }).then((result) => result.json());

  if (res.message) return false;

  const { name, email: fetchedEmail, role } = res.user;
  const { token } = res;
  const formattedUser = { name, email: fetchedEmail, token, role };

  return formattedUser;
};

const API = {
  getUserData,
};

module.exports = API;
