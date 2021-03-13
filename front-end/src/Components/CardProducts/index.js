import React from 'react';

import S from './styles';

export const CardProducts = () => (
  <S.Container>
    <S.Price>
      <span>R$ 5,50</span>
    </S.Price>

    <S.Image>
      <img
        src="/images/image-heineken.png"
        alt="Cerveja Heineken 600ml"
      />
    </S.Image>

    <S.Description>
      <span>Cerveja Heineken 600ml</span>
    </S.Description>

    <S.Counter>
      <button type="button">-</button>
      <div>0</div>
      <button type="button">+</button>
    </S.Counter>
  </S.Container>
);

export default CardProducts;
