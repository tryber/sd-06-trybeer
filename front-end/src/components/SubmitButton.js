import React from 'react';
import PropTypes from 'prop-types';

function SubmitButton({ name, disabled, id, onClick }) {
  return (
    <button
      type="button"
      disabled={ disabled }
      data-testid={ id }
      onClick={ onClick }
    >
      { name }
    </button>
  );
}

SubmitButton.propTypes = {
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default SubmitButton;
