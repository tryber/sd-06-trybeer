import React from 'react';

function PasswordInput(handleChangeInput, value, seePassword, setSeePassword) {
  return (
    <label htmlFor="password-ipt" className="flex flex-col space-y-2">
      <p>Secret*</p>
      <p className="hidden">Senha</p>
      <div className="flex space-x-2 items-center">
        <input
          id="password-ipt"
          data-test-id="password-input"
          name="password"
          type={ !seePassword ? 'password' : 'text' }
          value={ value }
          onChange={ handleChangeInput }
          className="border rounded-md p-2 focus:outline-none
          focus:border-secondary-dark"
        />
        <button
          className="w-4 h-4 rounded-full bg-secondary focus:outline-none"
          type="button"
          onClick={ () => setSeePassword((prev) => !prev) }
        >
          <p className="hidden">Icone</p>
        </button>
      </div>
    </label>
  );
}

export default PasswordInput;
