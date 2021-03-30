import React from 'react';
import PropTypes from 'prop-types';

const ButtonDelivered = (props) => {
  const { handleClick } = props;
  return (
    <button
      id="deliver-button"
      type="button"
      className="p-4 bg-green-300 hover:bg-gray-500"
      data-testid="mark-as-delivered-btn"
      onClick={ () => handleClick() }
    >
      {' '}
      Marcar como entregue
      {' '}
    </button>
  );
};

export default ButtonDelivered;

ButtonDelivered.propTypes = {
  handleClick: PropTypes.func.isRequired,
};
