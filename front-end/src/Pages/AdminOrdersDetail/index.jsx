// import Axios from 'axios';
import React, { useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
import OrdersAdminDetail from '../../Components/CardOrdersAdminDetail';
import MenuAdmin from '../../Components/MenuAdmin';
import * as S from './style';

const AdminOrdersDetail = () => {
  /*
  const { pathname } = useLocation();
  const [orders, setOrders] = useState([]);

  const fetch = async () => {
    const { token } = localStorage;
    const { data } = await Axios.get(`http://localhost:3001${pathname}`, { headers: { authorization: token } });

    setOrders(data);
  };
  */
  useEffect(() => {
    fetch();
  }, []);
  return (
    <S.Container>
      <S.WrapperMenu>
        <MenuAdmin />
      </S.WrapperMenu>
      <S.WrapperOrders>
        <OrdersAdminDetail />
      </S.WrapperOrders>
    </S.Container>
  );
};

export default AdminOrdersDetail;
