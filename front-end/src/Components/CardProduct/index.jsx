import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import Button from '../Button';
import * as S from './style';

const CardProduct = ({ products, setProducts }) => {
  const history = useHistory();
  const [cartDisabled, SetCartDisabled] = useState(true);

  useEffect(() => {
    const productsAmount = products.reduce((acc, product) => acc + product
      .productQuantity, 0);
    if (productsAmount > 0) {
      SetCartDisabled(false);
    } else {
      SetCartDisabled(true);
    }
  }, [products]);

  return (
    <div>
      <S.CardContainer>
        {products.length < 1 ? <div>Loading...</div> : products.map((item, index) => (
          <S.Card key={ index }>
            <S.Text data-testid={ `${index}-product-price` }>
              R$
              {' '}
              {item.price.replace(/\./g, ',')}
            </S.Text>
            <S.ItemImage
              data-testid={ `${index}-product-img` }
              src={ item.url_image }
              alt="beer"
            />
            <S.Text data-testid={ `${index}-product-name` }>
              { `${item.name}` }
            </S.Text>
            <S.Container>
              <S.Buttons>
                <Button
                  dataTestId={ `${index}-product-minus` }
                  onClick={ () => {
                    const it = products.map((el) => {
                      if (el.id === index + 1 && el.productQuantity > 0) {
                        return { ...el, productQuantity: el.productQuantity - 1 };
                      }
                      return el;
                    });
                    setProducts(it);
                  } }
                >
                  -
                </Button>
              </S.Buttons>
              <S.Buttons>
                <Button
                  dataTestId={ `${index}-product-plus` }
                  onClick={ () => {
                    const it = products.map((el) => {
                      if (el.id === index + 1) {
                        return { ...el, productQuantity: el.productQuantity + 1 };
                      }
                      return el;
                    });
                    setProducts(it);
                  } }
                >
                  +
                </Button>
              </S.Buttons>
            </S.Container>
            <S.Text data-testid="checkout-bottom-btn-value">
              Total:
              {' '}
              R$
              {' '}
              { (item.price * item.productQuantity).toFixed(2).replace(/\./g, ',') }
            </S.Text>
            <br />
            <S.QTD data-testid={ `${index}-product-qtd` }>
              { item.productQuantity }
            </S.QTD>
          </S.Card>
        ))}
        <S.Cart>
          <Button
            dataTestId="checkout-bottom-btn"
            onClick={ () => history.push('/checkout') }
            disabled={ cartDisabled }
          >
            Ver Carrinho
          </Button>
        </S.Cart>
      </S.CardContainer>
    </div>
  );
};

CardProduct.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object),
  setProducts: PropTypes.func.isRequired,
};

CardProduct.defaultProps = {
  products: [],
};

export default CardProduct;
