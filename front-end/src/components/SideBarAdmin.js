import React from 'react';

class SideBarAdmin extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    // não consegui usar o history.push pois acrescenta rota na que eu já estou e precisava substituir, não consegui com o history.replace()
    // const { history } = this.props;
    return (
      <header className="sidebar-container">
        <h1>TryBeer</h1>
        <nav className="admin-side-bar-container">
          <div className="buttons">
            <button
              type="button"
              data-testid="side-menu-item-orders"
              onClick={() => (window.location.href = '/admin/orders')}
            >
              Pedidos
            </button>
            <button
              type="button"
              data-testid="side-menu-item-profile"
              onClick={() => (window.location.href = '/admin/profile')}
            >
              Perfil
            </button>
          </div>
          <div className="button-logout">
            <button
              type="button"
              data-testid="side-menu-item-logout"
              onClick={() => (window.location.href = '/login')}
            >
              Sair
            </button>
          </div>
        </nav>
      </header>
    );
  }
}

export default SideBarAdmin;
