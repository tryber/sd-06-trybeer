import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class ToogleMenu extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { history } = this.props;
    return (
      <div className="side-menu-container">
        <div className="buttons-div">
          <button
            type="button"
            data-testid="side-menu-item-products"
            onClick={ () => history.push('./products') }
          >
            Produtos
          </button>
          <button
            type="button"
            data-testid="side-menu-item-my-orders"
            onClick={ () => history.push('./orders') }
          >
            Meus Pedidos
          </button>
          <button
            type="button"
            data-testid="side-menu-item-my-profile"
            onClick={ () => history.push('./profile') }
          >
            Meu Perfil
          </button>
          <button
            type="button"
            data-testid="side-menu-item-logout"
            onClick={ () => history.push('./login') }
          >
            Sair
          </button>
        </div>
      </div>
    );
  }
}

ToogleMenu.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default connect(null, null)(ToogleMenu);
