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

  const product = await db.category.findUnique({
    where: {
      id,
    },
    include: {
      products: {
        include: {
          restaurant: {
            select: {
              name: true,
              id: true,
              deliveryFee: true,
              deliveryTimeMinutes: true,
            },
          },
        },
      },
    },
  });

  const serializeProducts = product?.products.map((item) => ({
    ...item,
    price: item.price instanceof Decimal ? item.price.toNumber() : item.price,
    restaurant: {
      ...item.restaurant,
      deliveryFee:
        item.restaurant.deliveryFee instanceof Decimal
          ? item.restaurant.deliveryFee.toNumber()
          : item.restaurant.deliveryFee,
    },
  }));

  if (!serializeProducts) {
    return notFound();
  }

  return (
    <>
      <Navbar />
      <div className="px-5 py-6">
        <h2 className="mb-6 text-lg font-semibold">
          {serializeProducts[1].name}
        </h2>
        <div className="grid grid-cols-2 gap-6">
          <ProductItem
            key={serializeProducts[2].id}
            product={serializeProducts[2]}
            className="min-w-full"
          />
        </div>
      </div>
    </>
  );
};

export default CategoriesPage;
