import React from 'react';
import { notFound } from 'next/navigation';

// COMPONENTS
import { Navbar } from '../../../_components/navbar';
import { ProductItem } from '../../../_components/items-product';

// DATABASE
import { db } from '@/app/_lib/prisma';
import { Decimal } from '@prisma/client/runtime/library';

interface CategoriesPageProps {
  params: {
    id: string;
  };
}

const CategoriesPage = async ({ params: { id } }: CategoriesPageProps) => {
  if (!id || !db) {
    return notFound();
  }

  const resposeProducts = await db.category.findUnique({
    where: {
      id,
    },
    include: {
      products: {
        include: {
          restaurant: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  if (!resposeProducts) {
    return notFound();
  }

  return (
    <>
      <Navbar />
      <div className="px-5 py-6">
        <h2 className="mb-6 text-lg font-semibold">{resposeProducts.name}</h2>
        <div className="grid grid-cols-2 gap-6">
          {resposeProducts.products.map((product) => {
            const onlyProduct = {
              ...product,
              price:
                product.price instanceof Decimal
                  ? product.price.toNumber()
                  : product.price,
            };

            return (
              <ProductItem
                key={onlyProduct.id}
                product={onlyProduct}
                className="min-w-full"
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default CategoriesPage;
