import React from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
// import { useHistory } from 'react-router';

export default function Order() {
  // const history = useHistory();

  // Só para pegar o valor, pode ser alterdo após logica do requisito 6
  const totalPrice = localStorage.getItem('totalPrice');
  // console.log(totalPrice, "totalPrice");

  return (
    <div>
      <Header />
      <Navbar />
      <div data-testid="0-order-card-container">
        {/* {VemDaPaginaCheckout.length > 0 && VemDaPaginaCheckout.map((e, index) => ( */}
        <div>
          <button
            type="button"
            data-testid="0-order-number"
            // data-testid={ `${index}-order-number` }
            // onClick={ () => history.push(`/orders/${index + 1}`) }
          >
            {/* {`Pedido ${index + 1}`} */}
            Colocar o numero do Pedido
          </button>
          <h5 data-testid="0-order-date">
            {/* <h5 data-testid={ `${index}-order-date` }> */}
            {/* {`${e.VemDaPaginaCheckout.split('/')[2]}/
            ${e.VemDaPaginaCheckout.split('/')[1]}`} */}
            Colocar a data
          </h5>
          <p data-testid="0-order-total-value">
            {/* <p data-testid={ `${index}-order-total-value` }> */}
            {`R$ ${totalPrice.replace('.', ',')}`}
          </p>
        </div>
        {/* ))} */}
      </div>
    </div>
  );
}
