import React from 'react';

import MenuTop from '../../Components/MenuTop';
import SideBar from '../../Components/SideBar';
import CardProducts from '../../Components/CardProducts';

import Container from './styles';

const Products = () => (
  <Container>
    <MenuTop />
    <SideBar />
    <section>
      <CardProducts />
      <CardProducts />
      <CardProducts />
      <CardProducts />
      <CardProducts />
      <CardProducts />
    </section>
  </Container>
);

export default Products;
