import axios from 'axios';

const path = 'http://localhost:3001/login';

const fetchUser = async (email, password) => {
  try {
    const user = await axios.post(path, { email, password });
    return user.data;
  } catch (error) {
    console.log('error', error);
  }
}; // tratar erro - retorno

export default fetchUser;
