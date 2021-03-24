import React from 'react';
import PropTypes from 'prop-types';

function CostumerOrdersCards({ element, index }) {
  const { id, total_price: totalPrice, sale_date: saleDate } = element;

  const parseDate = () => {
    const dateAsString = new Date(saleDate);
    const dateOk = dateAsString.toLocaleDateString('pt-BR');
    const five = 5;
    const justMonthAndYear = dateOk.substring(0, five);
    return justMonthAndYear;
  };

  return (
    <div className="orderCards">
      <h4 data-testid={ `${index}-order-number` }>
        {`Pedido ${id}`}
      </h4>
      <h4 data-testid={ `${index}-order-date` }>
        { parseDate() }
      </h4>
      <h3 data-testid={ `${index}-order-total-value` }>
        { `R$ ${totalPrice.replace('.', ',')}` }
      </h3>
    </div>
  );
}

CostumerOrdersCards.propTypes = {
  index: PropTypes.number.isRequired,
  element: PropTypes.shape({
    replace: PropTypes.func,
    id: PropTypes.number,
    sale_date: PropTypes.string,
    total_price: PropTypes.number,
  }).isRequired,
};

export default CostumerOrdersCards;
