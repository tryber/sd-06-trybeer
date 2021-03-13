import React from 'react';
import PropTypes from 'prop-types';

import CompInput from './styles';

const Input = ({
  onChange,
  dataTestid,
  label,
  id,
}) => (
  <CompInput htmlFor={ id }>
    {label}
    <input
      id={ id }
      data-testid={ dataTestid }
      onChange={ (e) => onChange(e) }
    />
  </CompInput>
);

Input.propTypes = {
  onChange: PropTypes.func.isRequired,
  dataTestid: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default Input;
