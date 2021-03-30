// import Axios from 'axios';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Menu from '../../Components/Menu';
import getOrderInfo from '../../services/getOrderInfo';
import * as S from './style';

const OrderDetail = ({ match }) => {
  const [product, setProduct] = useState({});
  const [date, setDate] = useState('');
  const history = useHistory();
  useEffect(() => {
    if (!window.localStorage.token) {
      history.push('/login');
    }
  });
  useEffect(() => {
    const getProd = async () => {
      const { object, specificDate } = await getOrderInfo(match);
      setProduct(object);
      console.log('orderDetail, line 22', specificDate);
      if (specificDate) {
        const strToDate = new Date(specificDate.sale_date);
        const maxMonthOneDigitUTCformat = 8;
        const filteredDate = strToDate.getUTCMonth() > maxMonthOneDigitUTCformat
          ? `${strToDate.getUTCDate()}/${strToDate.getUTCMonth() + 1}`
          : `${strToDate.getUTCDate()}/0${strToDate.getUTCMonth() + 1}`;
        setDate(filteredDate);
      }
    };
    getProd();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <S.Container>
      <Menu><p data-testid="top-title">Detalhes de Pedido</p></Menu>
      <S.Wrapper>
        <p data-testid="order-number">
          Pedido
          {' '}
          { product.sale_id }
        </p>
        <p data-testid="order-date">
          Data
          {' '}
          { date }
        </p>
        <S.Products>
          <p data-testid="0-product-qtd">{ product.quantity }</p>
          <p data-testid="0-product-name">{ product.name }</p>
          <p data-testid="0-product-total-value">
            R$
            {' '}
            { (product.price * product.quantity).toFixed(2).replace(/\./g, ',') }
          </p>
        </S.Products>
        <p data-testid="order-total-value">
          Valor total
          R$
          {' '}
          { (product.price * product.quantity).toFixed(2).replace(/\./g, ',') }
        </p>
      </S.Wrapper>
    </S.Container>
  );
};

OrderDetail.propTypes = {
  match: PropTypes.func.isRequired,
};

export default OrderDetail;
