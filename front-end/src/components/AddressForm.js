import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './ComponentsCSS/AddressForm.css';

const AddressForm = (props) => {
  const {
    setIsFormFilled,
    number,
    street,
    setNumber,
    setStreet,
  } = props;
  useEffect(() => {
    if (street && number) {
      setIsFormFilled(true);
    }
  }, [street, number, setIsFormFilled]);

  return (
    <form className="addresForm">
      <h4>Endereço</h4>
      <div className="addres-form">
        <div className="input-form">
          <label htmlFor="street">
            Rua:
            <input
              data-testid="checkout-street-input"
              type="text"
              name="street"
              value={ street }
              onChange={ (e) => setStreet(e.target.value) }
              className="form-control mt-0 y-3 p-4"
            />
          </label>
        </div>
        <div className="input-form">
          <label htmlFor="street">
            Número da casa:
            <input
              data-testid="checkout-house-number-input"
              type="text"
              name="street"
              value={ number }
              onChange={ (e) => setNumber(e.target.value) }
              className="form-control mt-0 y-3 p-4"
            />
          </label>
        </div>
      </div>
    </form>
  );
};

AddressForm.propTypes = {
  setIsFormFilled: PropTypes.func.isRequired,
  number: PropTypes.string.isRequired,
  street: PropTypes.string.isRequired,
  setNumber: PropTypes.func.isRequired,
  setStreet: PropTypes.func.isRequired,
};

export default AddressForm;
