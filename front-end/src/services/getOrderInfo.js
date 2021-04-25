import Axios from 'axios';

const getOrderInfo = async (match) => {
  const { token } = localStorage;
  // get order id, product id;
  const requestProductInfo = await Axios
    .get(`http://localhost:3001/orders/${match.params.orderId}`);
  console.log(requestProductInfo, 'line9 getOrderInfo');
  const { data } = requestProductInfo;
  // get date order; (nas outras requisiçoes nao vem a data, por isso fazer essa requisição)
  const request = await Axios
    .get('http://localhost:3001/orders', { headers: { authorization: token } });
  const dated = await request.data;
  const specificDate = await dated.find((el) => el.id === data[0].sale_id);
  // formata a data para DD/MM
  const saleDate = specificDate.sale_date;
  return { data, saleDate };
};

export default getOrderInfo;
