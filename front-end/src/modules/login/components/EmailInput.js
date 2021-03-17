import React from 'react';

function EmailInput(handleChangeInput, value) {
  return (
    <label htmlFor="email-ipt" className="flex flex-col space-y-2">
      <p>Email*</p>
      <input
        id="email-ipt"
        data-test-id="email-input"
        name="email"
        type="text"
        value={ value }
        onChange={ handleChangeInput }
        className="border rounded-md p-2 focus:outline-none
        focus:border-secondary-dark"
      />
    </label>
  );
}

export default EmailInput;
