import React from 'react';

// COMPONENTS
import ProductImage from './_components/product-image';
import { ProductDetails } from './_components/product-details';

// ACTIONS
import { product, juices } from './_actions/products-per-category';
import { notFound } from 'next/navigation';

interface ProductPageProps {
  params: {
    id: string;
  };
}

const ProductPage = async ({ params: { id } }: ProductPageProps) => {
  if (!id) return notFound();

  const products = await product(id);
  if (!products) return null;
  const juice = await juices(products);

  return (
    <div>
      {/* IMAGEM */}
      <ProductImage product={products} />

      {/* TITULO E PREÇO */}
      <ProductDetails product={products} complementaryProducts={juice} />
    </div>
  );
};

export default ProductPage;
