import React from 'react';
import { useSelector } from 'react-redux';

const Gallery = () => {
  const products = useSelector((state) => state.products.data.rows);
  const loading = useSelector((state) => state.products.loading);

  return (
    <div>
      { loading && <p className="w-full text-center py-20">Loading...</p>}
      { !loading && products.length === 0
        && <p className="w-full text-center py-20">No Product</p>}
      <div className="grid grid-cols-4 gap-3">
        { products.length > 0 && products.map((product, index) => (
          <div
            key={ index }
            className="flex flex-col border border-primary-dark rounded-md p-2"
          >
            <p>Foto</p>
            <p>{ product.name }</p>
            <p>{ product.price }</p>
          </div>
        )) }
      </div>
    </div>
  );
};

export default Gallery;
