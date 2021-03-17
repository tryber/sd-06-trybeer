import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router';
import Card from '../components/Card';
import MenuTop from '../components/MenuTop';
import getAllProducts from '../services/productsServices';
import context from '../context/Context';

function Products() {
  const [products, setProducts] = useState([]);
  const { totalCart } = useContext(context);
  const [btnDisable, setBtnDisable] = useState(true);
  const history = useHistory();

  const findAllProducts = async () => {
    const allProducts = await getAllProducts();
    setProducts(allProducts);
  };

  useEffect(() => {
    findAllProducts();
    console.log(btnDisable);
  }, [btnDisable]);

  useEffect(() => {
    if (totalCart !== 0) {
      setBtnDisable(false);
    } else {
      setBtnDisable(true);
    }
  }, [totalCart]);

  return (
    <div className="product-page">
      <MenuTop title="TryBeer" />
      <div className="card-container">
      { products.map((product, index) => (
        <Card
          key={ index }
          index={ index }
          name={ product.name }
          urlImage={ product.url_image }
          price={ product.price }
        />)) }
      </div>
      <button
        className="checkout-btn-bottom btn-success"
        type="button"
        data-testid="checkout-bottom-btn"
        disabled={ btnDisable }
        onClick={ () => history.push('/checkout') }
      >
        Ver Carrinho
        <p className="checkout-price" data-testid="checkout-bottom-btn-value">
          {`R$ ${totalCart.toFixed(2).replace('.', ',')}`}
        </p>
      </button>
    </div>
  );
}

export default Products;
