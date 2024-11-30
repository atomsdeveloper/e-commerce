import React from 'react';

// COMPONENTS
import { Navbar } from '@/app/_components/navbar';
import { ProductItem } from '@/app/_components/items-product';

// DATABASE
import { db } from '@/app/_lib/prisma';
import { Decimal } from '@prisma/client/runtime/library';

const RecommendedProductsPage = async () => {
  const products = await (
    await db.product.findMany({
      where: {
        discountPercentage: {
          gt: 0,
        },
      },
      take: 10,
      include: {
        restaurant: true,
      },
    })
  ).map((item) => ({
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

  // TODO: pegar produtos com mais pedidos
  return (
    <>
      <Navbar />
      <div className="px-5 py-6">
        <h2 className="mb-6 text-lg font-semibold">Pedidos Recomendados</h2>
        <div className="grid grid-cols-2 gap-6">
          {products.map((product) => {
            return (
              <ProductItem
                key={product.id}
                product={product}
                className="min-w-full"
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default RecommendedProductsPage;
