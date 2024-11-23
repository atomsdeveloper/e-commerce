import React from 'react';

// COMPONENTS
import { Navbar } from '@/app/_components/navbar';
import { ProductItem } from '@/app/_components/items-product';

// DATABASE
import { db } from '@/app/_lib/prisma';
import { Decimal } from '@prisma/client/runtime/library';

const RecommendedProductsPage = async () => {
  const products = await db.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
    take: 20,
    include: {
      restaurant: {
        select: {
          name: true,
        },
      },
    },
  });

  // TODO: pegar produtos com mais pedidos
  return (
    <>
      <Navbar />
      <div className="px-5 py-6">
        <h2 className="mb-6 text-lg font-semibold">Pedidos Recomendados</h2>
        <div className="grid grid-cols-2 gap-6">
          {products.map((product) => {
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

export default RecommendedProductsPage;
