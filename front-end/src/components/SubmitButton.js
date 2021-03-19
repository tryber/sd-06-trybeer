import React from 'react';
import PropTypes from 'prop-types';

function SubmitButton({ name, disabled, dataTestId, onClickFunction }) {
  return (
    <div>
      <button
        type="button"
        disabled={ disabled }
        data-testid={ dataTestId }
        onClick={ onClickFunction }
      >
        { name }
      </button>
    </div>
  );
}

SubmitButton.propTypes = {
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  onClickFunction: PropTypes.func.isRequired,
  dataTestId: PropTypes.string.isRequired,
};

export default SubmitButton;
