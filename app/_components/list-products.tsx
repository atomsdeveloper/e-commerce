import React from 'react';

// Components
import { ProductItem } from './items-product';

import { TransformedProduct } from '../_types';

interface ProductListProps {
  products: TransformedProduct[];
}

export const ListProducts = async ({ products }: ProductListProps) => {
  return (
    <div className="flex gap-4 overflow-x-scroll px-5 [&::-webkit-scrollbar]:hidden">
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
};
