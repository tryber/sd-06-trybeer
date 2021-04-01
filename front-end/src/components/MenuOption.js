import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const MenuOption = ({ idTest, text, route }) => (
  <Link to={ route }>
    <div data-testid={ idTest }>
      { text }
    </div>
  </Link>
);

MenuOption.propTypes = {
  idTest: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
};

export default MenuOption;
