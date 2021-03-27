import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkedAlt, faHome } from '@fortawesome/free-solid-svg-icons';

import './Checkout.css';

const AddressForm = ({ handleChange }) => (
  <form>
    <label htmlFor="st">
      <h4>Rua:</h4>
      <FontAwesomeIcon icon={ faMapMarkedAlt } style={ { color: '#F29F05' } } size="1x" />
      <input
        data-testid="checkout-street-input"
        type="text"
        id="st"
        onChange={ (e) => handleChange('st', e) }
        className="address-input"
      />
    </label>
    <br />
    <label htmlFor="numero">
      <h4>Número da casa:</h4>
      <FontAwesomeIcon icon={ faHome } style={ { color: '#F29F05' } } size="1x" />
      <input
        data-testid="checkout-house-number-input"
        type="text"
        id="numero"
        onChange={ (e) => handleChange('num', e) }
        className="address-input"
      />
    </label>
  </form>
);

AddressForm.propTypes = {
  handleChange: PropTypes.func.isRequired,
};

export default AddressForm;
