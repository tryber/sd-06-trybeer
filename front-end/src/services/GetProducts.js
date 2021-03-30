import axios from 'axios';

const GetProducts = async (setProducts) => {
  const response = await axios.get('http://localhost:3001/products');
  const result = await response.data;
  await response.data.forEach((element, index) => {
    result[index] = { ...element, productQuantity: 0 };
  });
  localStorage.products = await JSON.stringify(response.data);
  return setProducts(response.data);
};

export default GetProducts;
