import React from 'react';

const renderCards = (allProducts, asd, setAsd, itemQty) => {
  const disabledBtnQty = (prod) => itemQty(prod) === 0;
  return allProducts.map(
    (prod, id) => (
      <section className="card-content" key={ id }>
        <p data-testid={ `${id}-product-price` }>{prod.price.toLocaleString('pt-BR')}</p>
        <img
          className="products-img"
          src={ prod.url_image }
          alt="Foto do Produto"
          data-testid={ `${id}-product-img` }
        />
        <h4 data-testid={ `${id}-product-name` }>{prod.name}</h4>
        <section className="cards-btn">
          <button
            data-testid={ `${id}-product-plus` }
            type="button"
            onClick={ () => {
              const items = JSON.parse(localStorage.getItem('items')) || [];
              items.push(prod);
              localStorage.setItem('items', JSON.stringify(items));
              setAsd(asd + 1);
            } }
          >
            +
          </button>
          <p data-testid={ `${id}-product-qtd` }>{itemQty(prod)}</p>
          <button
            data-testid={ `${id}-product-minus` }
            type="button"
            disabled={ disabledBtnQty(prod) }
            onClick={ () => {
              const items = JSON.parse(localStorage.getItem('items')) || [];
              items.splice(items.indexOf(items.find((e) => e.id === prod.id)), 1);
              localStorage.setItem('items', JSON.stringify(items));
              setAsd(asd - 1);
            } }
          >
            -
          </button>
        </section>
      </section>
    ),
  );
};
export default renderCards;
