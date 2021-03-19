import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  addCart, globalID, globalQuantity, prodList, removeCartItem, updatePrice,
} from '../actions';
import { getProducts } from '../api';

class ProductsList extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.sendToCart = this.sendToCart.bind(this);
    this.increaseQuantity = this.increaseQuantity.bind(this);
    this.toCheckout = this.toCheckout.bind(this);
  }

  async componentDidMount() {
    const {
      dispatchProducts,
      dispatchPrice,
      history } = this.props;
    this.storageToRedux();

    // apartir daqui ele dá o render
    const products = await getProducts();
    if (products.message) {
      history.replace('/login');
    } else {
      dispatchProducts(products);
      const local = Number(localStorage.getItem('price'));
      dispatchPrice(local);
    }
  }

  handleLocalStorage(statePrice) {
    localStorage.setItem('PRICE', statePrice);
  }

  async storageToRedux() {
    const { stateQuantity, dispatchCart, dispatchID } = this.props;
    if (!localStorage.getItem('stateQuantity')) {
      await localStorage.setItem('stateQuantity', JSON.stringify(stateQuantity));
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
  }

  toCheckout() {
    const { history } = this.props;
    const cart = JSON.parse(localStorage.getItem(('stateCart')));
    const qtd = JSON.parse(localStorage.getItem('stateQuantity'));
    for (let index = 0; index < cart.length; index += 1) {
      cart[index].quantity = qtd[cart[index].id];
    }
    localStorage.setItem('stateCart', JSON.stringify(cart));
    localStorage.setItem('stateCart', JSON.stringify(cart));
    history.push('/checkout');
  }

  removeItem(id) {
    const { dispatchRemoved, stateCart, stateID } = this.props;
    const newCart = stateCart.filter((element) => element.id !== id);
    dispatchRemoved(newCart);
    const indexToBeRemoved = stateID.indexOf(id);
    stateID.splice(indexToBeRemoved, 1);
    const stateQtd = JSON.parse(localStorage.getItem('stateQuantity'));
    stateQtd[id] = 0;
    localStorage.setItem('stateQuantity', JSON.stringify(stateQtd));
  }

  async increaseQuantity({ target }, id) {
    const { dispatchPrice, statePrice } = this.props;
    const productPrice = Number(target.parentNode.parentNode
      .nextSibling.childNodes[0].innerText.split(' ')[1].replace(',', '.'));
    const reajustedPrice = Number((statePrice + productPrice));
    const { stateCart } = this.props;
    const find = stateCart.find((element) => element.id === id);
    const index = stateCart.indexOf(find);
    if (find) {
      stateCart[index].quantity += 1;
      localStorage.setItem('stateCart', JSON.stringify(stateCart));
      const stateQtd = JSON.parse(localStorage.getItem('stateQuantity'));
      stateQtd[id] += 1;
      localStorage.setItem('stateQuantity', JSON.stringify(stateQtd));
    }
    await this.sendToCart(target, id);
    dispatchPrice(reajustedPrice);
    localStorage.setItem('price', reajustedPrice);
  }

  async decreaseQuantity({ target }, id) {
    const { statePrice, dispatchPrice } = this.props;
    const productPrice = Number(target.parentNode.parentNode
      .nextSibling.childNodes[0].innerText.split(' ')[1].replace(',', '.'));
    const reajustedPrice = Number((statePrice - productPrice));
    if (statePrice > 0) dispatchPrice(reajustedPrice);
    if (statePrice > 0) localStorage.setItem('price', reajustedPrice);
    const { stateCart } = this.props;
    const find = stateCart.find((element) => element.id === id);
    const index = stateCart.indexOf(find);
    if (find) {
      if (stateCart[index].quantity > 1) {
        stateCart[index].quantity -= 1;
        localStorage.setItem('stateCart', JSON.stringify(stateCart));
        const stateQtd = JSON.parse(localStorage.getItem('stateQuantity'));
        stateQtd[id] -= 1;
        localStorage.setItem('stateQuantity', JSON.stringify(stateQtd));
      } else {
        this.removeItem(id);
      }
    }
  }

  async sendToCart(target, id) {
    const {
      dispatchCart, dispatchID, stateID,
    } = this.props;
    const imgUrl = target.parentNode.parentNode.parentNode.childNodes[0].src;
    const name = target.parentNode.parentNode.parentNode.childNodes[1].innerText;
    const price = target.parentNode.parentNode.parentNode.childNodes[3].innerText;
    if (!stateID.includes(id)) {
      await dispatchCart(id, name, price, 1, imgUrl);
      await dispatchID(id);
      const { stateCart } = this.props;
      localStorage.setItem('stateCart', JSON.stringify(stateCart));
      const stateQtd = JSON.parse(localStorage.getItem('stateQuantity'));
      stateQtd[id] = 1;
      localStorage.setItem('stateQuantity', JSON.stringify(stateQtd));
    }
  }

  render() {
    const { stateProducts, statePrice, stateCart, history } = this.props;

    return (
      <div className="prodlist-container">
        <div className="products-container">
          { stateProducts
              && stateProducts.map((product, index) => (
                <div id={ `${index}` } className="product" key={ product.id }>
                  <img
                    data-testid={ `${product.id - 1}-product-img` }
                    src={ product.url_image }
                    alt={ product.name }
                  />
                  <div data-testid={ `${product.id - 1}-product-name` }>
                    <h4>{product.name}</h4>
                  </div>
                  <div className="quantity-div">
                    <button
                      type="button"
                      id="minus"
                      data-testid={ `${product.id - 1}-product-minus` }
                      onClick={ (event) => this.decreaseQuantity(event, product.id) }
                    >
                      <i className="fas fa-minus" />
                    </button>
                    <span data-testid={ `${product.id - 1}-product-qtd` }>
                      { JSON.parse(localStorage.getItem('stateQuantity'))[product.id] }
                    </span>
                    <button
                      type="button"
                      id="plus"
                      data-testid={ `${product.id - 1}-product-plus` }
                      onClick={ (event) => this.increaseQuantity(event, product.id) }
                    >
                      <i className="fas fa-plus" />
                    </button>
                  </div>
                  <div data-testid={ `${product.id - 1}-product-price` }>
                    <h3>{`R$ ${product.price.replace('.', ',')}`}</h3>
                  </div>
                </div>
              ))}
        </div>
        <div className="shoppingcart-div">
          <button
            type="button"
            data-testid="checkout-bottom-btn"
            onClick={ this.toCheckout }
            disabled={ stateCart.length === 0 ? true : null }
          >
            Ver Carrinho
          </button>
          <span data-testid="checkout-bottom-btn-value">
            { statePrice.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) }
          </span>
          { history.location.state !== undefined
            ? <span>Compra realizada com sucesso!</span> : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  stateProducts: state.products.products,
  stateCart: state.products.cartList,
  stateID: state.products.globalID,
  stateQuantity: state.products.quantity,
  statePrice: state.products.price,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchID: (id) => dispatch(globalID(id)),
  dispatchProducts: (array) => dispatch(prodList(array)),
  dispatchCart: ({ id, name, price, qtd, url }) => dispatch(
    addCart(id, name, price, qtd, url),
  ),
  dispatchQtd: (qtd, id) => dispatch(globalQuantity(qtd, id)),
  dispatchRemoved: (array) => dispatch(removeCartItem(array)),
  dispatchPrice: (number) => dispatch(updatePrice(number)),
});

ProductsList.propTypes = {
  history: PropTypes.shape().isRequired,
  dispatchProducts: PropTypes.func.isRequired,
  dispatchID: PropTypes.func.isRequired,
  dispatchCart: PropTypes.func.isRequired,
  dispatchPrice: PropTypes.func.isRequired,
  dispatchRemoved: PropTypes.func.isRequired,
  stateProducts: PropTypes.arrayOf(PropTypes.object).isRequired,
  stateCart: PropTypes.arrayOf(PropTypes.object).isRequired,
  stateQuantity: PropTypes.objectOf(PropTypes.number).isRequired,
  stateID: PropTypes.arrayOf(PropTypes.string).isRequired,
  statePrice: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductsList);
