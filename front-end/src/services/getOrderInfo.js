import Axios from 'axios';

const getOrderInfo = async (match) => {
  const { token } = localStorage;
  // get order id, product id;
  const requestProductInfo = await Axios
    .get(`http://localhost:3001/orders/${match.params.orderId}`);
  const { data } = requestProductInfo;
  // get product detail by id;
  const requestProd = await Axios.get('http://localhost:3001/products');
  const products = await requestProd.data;
  const filterProd = await products.find((el) => el.id === data[0].product_id);
  const object = { ...data[0], ...filterProd };
  // get date order; (nas outras requisiçoes nao vem a data, por isso fazer essa requisição)
  const request = await Axios
    .get('http://localhost:3001/orders', { headers: { authorization: token } });
  const dated = await request.data;
  const specificDate = await dated.find((el) => el.id === object.sale_id);
  // formata a data para DD/MM
  return { object, specificDate };
};

export default getOrderInfo;
