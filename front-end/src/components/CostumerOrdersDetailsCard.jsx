import React from 'react';
import PropTypes from 'prop-types';

function CostumerOrdersDetailsCard({ element }) {
  const { id, sale_date: saleDate, total_price: totalPrice, name, qnt } = element;

  return (
    <>
      <h1>{`Pedido ${id}`}</h1>
      <h1>{ saleDate }</h1>
      <div>
        <p>{ qnt }</p>
        <p>{ name }</p>
      </div>
      <p>{`Total: R$ ${totalPrice}`}</p>
    </>
  );
}

CostumerOrdersDetailsCard.propTypes = {
  element: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    qnt: PropTypes.number,
    total_price: PropTypes.number,
    sale_date: PropTypes.string,
  }).isRequired,
};

export default CostumerOrdersDetailsCard;
