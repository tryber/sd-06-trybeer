import React from 'react';
import { Redirect } from 'react-router-dom';
import Gallery from '../components/Gallery';
import Header from '../components/Header';
import PaperContainer from '../../../design-system/containers/PaperContainer';

const Products = () => {
  const storage = JSON.parse(localStorage.getItem('user'));
  const existToken = storage ? storage.token : false;

  return (
    <div className="w-full min-h-screen p-10 ">
      { (!existToken) && <Redirect to="/login" /> }
      <PaperContainer>
        <p className="text-2xl">Produtos</p>
        <Header />
        <Gallery />
      </PaperContainer>
    </div>
  );
};

export default Products;
