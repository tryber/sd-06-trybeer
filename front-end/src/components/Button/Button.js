import React from 'react';
import PropTypes from 'prop-types';

/**
 * Renders default button
 * @param {string} title Text inside button
 * @param {boolean} isDisabled Set button as enabled (true) or disabled (false)
 * @param {string} testId Data test id
 */
const Button = ({ title, isDisabled, testId, onClick, userRole, className }) => (
  <button
    type="button"
    disabled={ isDisabled }
    data-testid={ testId }
    onClick={ () => onClick(userRole) }
    className={ className }
  >
    {title}
  </button>
);

Button.propTypes = {
  title: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool,
  testId: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  userRole: PropTypes.string,
  className: PropTypes.string,
};

Button.defaultProps = {
  isDisabled: false,
  onClick: () => {},
  userRole: '',
  className: '',
};

export default Button;
