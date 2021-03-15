const url = 'http://localhost:3001';
const login = async (user) => {
  const postMethod = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user,
    }),
  };

  const apiRequest = await fetch(`${url}/register`, postMethod);
  const apiResponse = await apiRequest.json();
  return apiResponse;
};

export default login;
