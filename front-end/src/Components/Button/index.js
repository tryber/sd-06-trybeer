import React from 'react';
import PropTypes from 'prop-types';

import CompButton from './styles';

const Button = ({
  children,
  type,
  width,
  heigth,
  color,
  disabled,
  onClick,
  fontSize,
  dataTestid,
}) => (
  <CompButton
    type={ type }
    color={ color }
    width={ width }
    heigth={ heigth }
    fontSize={ fontSize }
    disabled={ disabled }
    onClick={ onClick }
    data-testid={ dataTestid }
  >
    {children}
  </CompButton>
);

Button.defaultProps = {
  color: '',
  onClick: () => {},
  disabled: false,
};

Button.propTypes = {
  children: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  heigth: PropTypes.string.isRequired,
  color: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  fontSize: PropTypes.string.isRequired,
  dataTestid: PropTypes.string.isRequired,
};

export default Button;
