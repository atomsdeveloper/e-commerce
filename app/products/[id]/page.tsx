import React from 'react';
import { notFound } from 'next/navigation';

// COMPONENTS
import ProductImage from './_components/product-image';
import { ProductDetails } from './_components/product-details';

// ACTIONS
import { product, juices } from './_actions/products-per-category';

// DATABASE
import { Decimal } from '@prisma/client/runtime/library';
interface ProductPageProps {
  params: {
    id: string;
  };
}

const ProductPage = async ({ params: { id } }: ProductPageProps) => {
  if (!id) return notFound();

  const products = await product(id);
  if (!products) return null;

  // Serializando o único objeto
  const serializeProduct = {
    ...products,
    price:
      products.price instanceof Decimal
        ? products.price.toNumber()
        : products.price,
    restaurant: {
      ...products.restaurant,
      deliveryFee:
        products.restaurant.deliveryFee instanceof Decimal
          ? products.restaurant.deliveryFee.toNumber()
          : products.restaurant.deliveryFee,
    },
  };

  const juice = await juices(products);

  return (
    <div>
      {/* IMAGEM */}
      <ProductImage product={serializeProduct.restaurant} />

      {/* TITULO E PREÇO */}
      <ProductDetails
        product={serializeProduct}
        complementaryProducts={juice}
      />
    </div>
  );
};

export default ProductPage;
