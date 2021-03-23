import React, { useContext, useState } from 'react';
import CheckoutContext from '../../context/CheckoutContext';
import { api } from '../../services';

function ButtonCheckout() {
  const { able, history, address, sumTotal, products } = useContext(CheckoutContext);
  const [message, setMessage] = useState(false);

  const generateData = () => {
    const data = new Date().toLocaleDateString('zh-Hans-CN');
    let dataFormart = data.replace('/', '-');
    dataFormart = data.replace('/', '-');
    const hora = new Date().toLocaleTimeString();
    const dateTime = `${dataFormart} ${hora}`;
    return dateTime;
  };

  const generateSale = async () => {
    const userId = JSON.parse(localStorage.user);
    const params = {
      userId: userId.id || 1,
      total: sumTotal,
      address: address.rua,
      adNumber: address.numero,
      date: await generateData(),
      status: 'Pendente',
    };
    return params;
  };

  const handleClick = async () => {
    const timeout = 2000;
    const sale = await generateSale();
    setTimeout(() => history.push('/products'), timeout);
    setMessage(true);
    const result = await api.registerSales(sale);
    console.log(result.response);

    if (result.response.id) {
      products.forEach((element) => {
        const objtProd = {
          idSale: result.response.id,
          idProduct: element.id,
          quantity: element.quantity,
        };
        console.log(objtProd);

        api.regSalesProducts(objtProd);
      });
    }
  };

  return (
    <div>
      <button
        className="button is-success"
        type="submit"
        data-testid="checkout-finish-btn"
        disabled={ able }
        onClick={ handleClick }
      >
        Finalizar Pedido
      </button>
      { message && <span>Compra realizada com sucesso!</span> }
    </div>
  );
}

export default ButtonCheckout;
