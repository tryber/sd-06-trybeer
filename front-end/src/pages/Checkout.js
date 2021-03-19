import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Header } from '../components';
import {
  addCart, globalID, globalQuantity, removeCartItem, updatePrice } from '../actions';

class Checkout extends React.Component {
  constructor() {
    super();
    this.state = {
      validAdress: false,
      validNumber: false,
      localCart: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.exclude = this.exclude.bind(this);
    this.storageToRedux = this.storageToRedux.bind(this);
  }

  componentDidMount() {
    const { history } = this.props;
    this.storageToRedux();
    this.handleSetState();
    if (!localStorage.token) {
      history.push('./login');
    }
  }

  handleSetState() {
    const { stateCart, statePrice } = this.props;
    this.setState({
      localCart: stateCart,
      localPrice: statePrice,
    });
  }

  handleChange({ target: { name, value } }) {
    const minLength = 0;
    if (name === 'adress') {
      if (value.length > minLength) {
        this.setState({ validAdress: true });
      } else {
        this.setState({ validAdress: false });
      }
    }
    if (name === 'number') {
      if (value.length > minLength) {
        this.setState({ validNumber: true });
      } else {
        this.setState({ validNumber: false });
      }
    }
  }

  storageToRedux() {
    const { stateQuantity, dispatchCart, dispatchID, dispatchPrice } = this.props;
    if (!localStorage.getItem('stateQuantity')) {
      localStorage.setItem('stateQuantity', JSON.stringify(stateQuantity));
    }
    if (localStorage.getItem('stateCart')) {
      const localStorageCart = JSON.parse(localStorage.getItem('stateCart'));
      for (let index = 0; index < localStorageCart.length; index += 1) {
        const { stateCart } = this.props;
        const contains = stateCart.filter(
          (element) => element.name === localStorageCart[index].name,
        );
        if (contains.length < 1) {
          dispatchCart(
            localStorageCart[index].id,
            localStorageCart[index].name,
            localStorageCart[index].price,
            localStorageCart[index].quantity,
            localStorageCart[index].imgUrl,
          );
          dispatchID(localStorageCart[index].id);
        }
      }
    }
    if (localStorage.getItem('price')) {
      dispatchPrice(JSON.parse(localStorage.getItem('price')));
    }
  }

  async exclude({ id, price }) {
    const { dispatchRemoved, stateCart, stateID } = this.props;
    // Atualização Valor total do Carrinho após Excluir item
    const itemToExclude = stateCart.filter((element) => element.id === id)[0];
    const priceItem = itemToExclude.price.split(' ')[1].replace(',', '.');
    const quantityItem = itemToExclude.quantity;
    let priceCart = localStorage.getItem('price');
    priceCart -= parseFloat(priceItem * quantityItem).toFixed(2);
    localStorage.setItem('price', parseFloat(priceCart).toFixed(2));
    // Atualização da quantidade do Carrinho após Excluir item
    const quantityStore = JSON.parse(localStorage.getItem('stateQuantity'));
    quantityStore[id] = 0;
    localStorage.setItem('stateQuantity', JSON.stringify(quantityStore));

    const newCart = stateCart.filter((element) => element.id !== id);
    await dispatchRemoved(newCart);
    localStorage.setItem('stateCart', JSON.stringify(newCart));
    const indexToBeRemoved = stateID.indexOf(id);
    stateID.splice(indexToBeRemoved, 1);
    const { localPrice } = this.state;
    const updatedPrice = localPrice - Number(price.split(' ')[1].replace(',', '.'));
    localStorage.setItem('price', JSON.stringify(updatedPrice));
    this.setState({ localCart: newCart, localPrice: updatedPrice });
  }

  render() {
    const { history } = this.props;
    const { validAdress, validNumber } = this.state;
    const { localCart, localPrice } = this.state;
    return (
      <div className="checkout-container">
        <Header history={ history } />
        <div className="checkout-div">
          <div className="products-div">
            <h2>Produtos</h2>
            { stateCart && stateCart.length ? stateCart.map((element, index) => (
              <div
                className="cart-item"
                key={ index }
                data-testid={ `${index}-product-price` }
              >
                <img src={ element.imgUrl } alt={ `product-${index}` } />
                <h4 data-testid={ `${index}-product-qtd-input` }>{ element.quantity }</h4>
                <h4 data-testid={ `${index}-product-name` }>{ element.name }</h4>
                <h4 data-testid={ `${index}-product-total-value` }>
                  {`R$ ${(element.price.split(' ')[1]
                    .replace(',', '.') * element.quantity)
                    .toFixed(2).replace('.', ',')}`}
                </h4>
                <h5 data-testid={ `${index}-product-unit-price` }>
                  {`(${element.price} un)`}
                </h5>
                <button
                  type="button"
                  data-testid={ `${index}-removal-button` }
                  onClick={ () => this.exclude(element, index) }
                >
                  <i className="fas fa-times" />
                </button>
              </div>
            )) : <h4>Não há produtos no carrinho</h4>}
          </div>
          <div className="total-div">
            <h4 data-testid="order-total-value">
              { localPrice
                ? `Total: R$
                ${localPrice.toFixed(2).toString().replace('.', ',')}`
                : 'Total: R$ 0,00' }
            </h4>
          </div>
          <div className="adress-div">
            <h3>Endereço</h3>
            <input
              type="text"
              placeholder="Rua"
              name="adress"
              onChange={ this.handleChange }
              data-testid="checkout-street-input"
            />
            <input
              name="number"
              type="number"
              placeholder="Número"
              data-testid="checkout-house-number-input"
              onChange={ this.handleChange }
            />
            <button
              type="button"
              data-testid="checkout-finish-btn"
              onClick={ () => history.push('/products', { purchase: true }) }
              disabled={ !validAdress || !validNumber }
            >
              Finalizar Pedido
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  stateCart: state.products.cartList,
  stateID: state.products.globalID,
  stateQuantity: state.products.quantity,
  statePrice: state.products.price,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchID: (id) => dispatch(globalID(id)),
  dispatchCart: ({ id, name, price, qtd, url }) => dispatch(
    addCart(id, name, price, qtd, url),
  ),
  dispatchQtd: (qtd, id) => dispatch(globalQuantity(qtd, id)),
  dispatchPrice: (number) => dispatch(updatePrice(number)),
  dispatchRemoved: (array) => dispatch(removeCartItem(array)),
});

Checkout.propTypes = {
  dispatchID: PropTypes.func.isRequired,
  dispatchCart: PropTypes.func.isRequired,
  dispatchPrice: PropTypes.func.isRequired,
  history: PropTypes.shape().isRequired,
  stateCart: PropTypes.arrayOf(PropTypes.object).isRequired,
  dispatchRemoved: PropTypes.func.isRequired,
  stateID: PropTypes.arrayOf(PropTypes.string).isRequired,
  stateQuantity: PropTypes.objectOf(PropTypes.number).isRequired,
  statePrice: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
