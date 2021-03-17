import axios from 'axios';

const URL_BASE = 'http://localhost:3001/';

export async function getAll() {
  const users = await axios.get(`${URL_BASE}register/get-all`)
    .then((response) => response.data);
  return users;
}

export async function create(name, email, password, role) {
  try {
    const user = await axios.post(`${URL_BASE}register`,
      { name, email, password, role })
      .then((response) => response.data);
    return user;
  } catch (error) {
    if (error.response) {
      return {
        status: error.response.status,
        statusText: error.response.statusText,
        message: error.response.data.message,
      };
    }
  }
}

export async function validate(email, password) {
  const END_POINT = 'login';
  try {
    const result = await axios.post(`${URL_BASE}${END_POINT}`, {
      email, password,
    })
      .then((response) => response.data);
    localStorage.setItem('token', JSON.stringify(result.token));
    return result;
  } catch (error) {
    if (error.response) {
      return {
        status: error.response.status,
        statusText: error.response.statusText,
        message: error.response.data.message,
      };
    }
  }
}

export async function edit(prevName, nextName) {
  try {
    const response = await axios.put(`${URL_BASE}register/edit-user`, {
      prevName, nextName,
    });
    console.log(response);
    return response;
  } catch (error) {
    if (error.response) {
      return {
        status: error.response.status,
        statusText: error.response.statusText,
        message: error.response.data.message,
      };
    }
  }
}

export async function getProducts() {
  const token = localStorage.getItem('token');
  console.log(token);
  try {
    const products = await axios
      .get(
        `${URL_BASE}products/get-all`,
        { headers: {
          authorization: JSON.parse(token),
        },
        },
      )
      .then((response) => response.data);
    return products;
  } catch (error) {
    if (error.response) {
      console.log(error.response);
      return {
        status: error.response.status,
        statusText: error.response.statusText,
        message: error.response.data.message,
      };
    }
  }
}
