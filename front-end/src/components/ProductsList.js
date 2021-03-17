import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  cartList, globalID, globalQuantity, prodList, removeCartItem, updatePrice,
} from '../actions';
import { getProducts } from '../api';

class ProductsList extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.sendToCart = this.sendToCart.bind(this);
    this.increaseQuantity = this.increaseQuantity.bind(this);
  }

  async componentDidMount() {
    const { dispatchProducts, dispatchPrice, history } = this.props;
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

  removeItem(id) {
    const { dispatchRemoved, stateCart, stateID } = this.props;
    const newCart = stateCart.filter((element) => element.id !== id);
    dispatchRemoved(newCart);
    const indexToBeRemoved = stateID.indexOf(id);
    stateID.splice(indexToBeRemoved, 1);
  }

  increaseQuantity({ target }, id) {
    const { dispatchQtd, stateQuantity, dispatchPrice, statePrice } = this.props;
    const productPrice = Number(target.parentNode.parentNode
      .nextSibling.childNodes[0].innerText.split(' ')[1].replace(',', '.'));
    const reajustedPrice = Number((statePrice + productPrice));
    dispatchQtd(stateQuantity[id] + 1, id);
    this.sendToCart(target, id);
    dispatchPrice(reajustedPrice);
    localStorage.setItem('price', reajustedPrice);
  }

  decreaseQuantity({ target }, id) {
    const { dispatchQtd, stateQuantity, statePrice, dispatchPrice } = this.props;
    const productPrice = Number(target.parentNode.parentNode
      .nextSibling.childNodes[0].innerText.split(' ')[1].replace(',', '.'));
    const reajustedPrice = Number((statePrice - productPrice));
    if (statePrice !== 0) dispatchPrice(reajustedPrice);
    if (stateQuantity[id]) {
      dispatchQtd(stateQuantity[id] - 1, id);
      if (stateQuantity[id] === 1) {
        this.setState({ [id]: 0 });
        this.removeItem(id);
      }
    }
    localStorage.setItem('price', reajustedPrice);
  }

  sendToCart(target, id) {
    const {
      dispatchCart, dispatchID, stateID,
    } = this.props;
    const imgUrl = target.parentNode.parentNode.parentNode.childNodes[0].src;
    const name = target.parentNode.parentNode.parentNode.childNodes[1].innerText;
    const price = target.parentNode.parentNode.parentNode.childNodes[3].innerText;
    const cartItem = { id, name, price, quantity: 1, imgUrl };
    if (!stateID.includes(id)) {
      dispatchCart(cartItem);
      dispatchID(id);
    }
  }

  render() {
    const { stateProducts, stateQuantity, statePrice, history, stateCart } = this.props;
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
                      { stateQuantity[product.id] }
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
            onClick={ () => history.push('./checkout') }
            disabled={ stateCart.length === 0 ? true : null }
          >
            Ver Carrinho
          </button>
          <span data-testid="checkout-bottom-btn-value">
            { statePrice.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) }
          </span>
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
  dispatchCart: (array) => dispatch(cartList(array)),
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
  dispatchQtd: PropTypes.func.isRequired,
  dispatchRemoved: PropTypes.func.isRequired,
  stateProducts: PropTypes.arrayOf(PropTypes.object).isRequired,
  stateCart: PropTypes.arrayOf(PropTypes.object).isRequired,
  stateQuantity: PropTypes.objectOf(PropTypes.number).isRequired,
  stateID: PropTypes.arrayOf(PropTypes.string).isRequired,
  statePrice: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductsList);
