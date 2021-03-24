import React from 'react';
import PropTypes from 'prop-types';
import './Input.scss';

/**
 * Renders default input
 * @param {string} title
 * @param {string} type
 * @param {string} testId
 * @see www.gmail.com
 */
const Input = ({ title, type, testId, onChange, value, placeholder, isReadOnly }) => (
  <div className="defaultInput">
    <label htmlFor={ title }>
      {title}
    </label>
    <input
      id={ title }
      type={ type }
      data-testid={ testId }
      onChange={ (e) => onChange(title, e.target.value) }
      value={ value }
      readOnly={ isReadOnly }
      placeholder={ placeholder }
    />
  </div>
);

Input.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  testId: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  isReadOnly: PropTypes.bool,
};

Input.defaultProps = {
  onChange: () => {},
  isReadOnly: false,
};

export default Input;
