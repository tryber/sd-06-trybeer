import React from 'react';
import PropTypes from 'prop-types';

function Input({ id, name, field, setField = null, type = 'text', readOnly = false }) {
  return (
    <label htmlFor={ name }>
      {name}
      <input
        data-testid={ id }
        value={ field }
        id={ name }
        onChange={ ({ target: { value } }) => setField(value) }
        type={ type }
        readOnly={ readOnly }
      />
    </label>
  );
}

Input.defaultProps = { type: 'text', setField: null, readOnly: false };

Input.propTypes = {
  name: PropTypes.string.isRequired,
  field: PropTypes.string.isRequired,
  setField: PropTypes.func,
  id: PropTypes.string.isRequired,
  type: PropTypes.string,
  readOnly: PropTypes.bool,
};

export default Input;
