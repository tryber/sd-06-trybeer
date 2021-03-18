import React from 'react';

function CheckoutCards() {
  const [qnt, setQnt] = useState('dolocalStorage?')
  const [amountPerProduct, setAmountPerProduct] = useState(0)

  return(
    <>
      
      <p>{qnt}<p>
      <p>{name}<p>
      <p>{amountPerProduct}<p>
    </>
  )
};

export default checkoutCards;