import React from 'react';

function ButtonsForm(valid, handleClick, history) {
  return (
    <div>
      <div>
        <button
          type="submit"
          data-testid="signin-btn"
          disabled={ valid }
          onClick={ handleClick }
        >
          ENTRAR
        </button>
      </div>
      <div>
        <button
          type="button"
          data-testid="no-account-btn"
          onClick={ () => history.push('/register') }
        >
          Ainda não tenho conta
        </button>
      </div>
    </div>
  );
}

export default ButtonsForm;
