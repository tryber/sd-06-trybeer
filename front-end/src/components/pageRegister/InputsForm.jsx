import React from 'react';

function InputsForm(user, handleChange) {
  return (
    <div>
      <label htmlFor="nome">
        Nome
        <input
          type="text"
          id="nome"
          name="name"
          minLength="12"
          value={ user.name }
          onChange={ handleChange }
          data-testid="signup-name"
        />
      </label>
      <label htmlFor="email">
        Email
        <input
          type="email"
          id="email"
          name="email"
          value={ user.email }
          onChange={ handleChange }
          data-testid="signup-email"
        />
      </label>
      <label htmlFor="senha">
        Senha
        <input
          type="password"
          name="senha"
          value={ user.senha }
          onChange={ handleChange }
          data-testid="signup-password"
        />
      </label>
      <label htmlFor="tipo">
        Quero vender
        <input
          type="checkbox"
          name="tipo"
          value="admin"
          onChange={ handleChange }
          data-testid="signup-seller"
        />
      </label>
    </div>
  );
}

export default InputsForm;
