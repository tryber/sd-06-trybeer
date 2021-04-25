import React from 'react';

function InputsForm(user, handleChange) {
  return (
    <div>
      <div>
        <label htmlFor="email-user">
          Email:
          <input
            id="email-user"
            type="email"
            name="email"
            value={ user.email }
            data-testid="email-input"
            onChange={ handleChange }
          />
        </label>
      </div>
      <div>
        <label htmlFor="pass-user">
          Senha:
          <input
            id="pass-user"
            type="password"
            name="password"
            value={ user.password }
            data-testid="password-input"
            onChange={ handleChange }
          />
        </label>
      </div>
    </div>
  );
}

export default InputsForm;
