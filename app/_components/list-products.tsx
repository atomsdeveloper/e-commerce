import React from 'react';

// Database
import { db } from '../_lib/prisma';
import { Decimal } from '@prisma/client/runtime/library';

// Components
import { ProductItem } from './items-product';

// Sessions
// import { getServerSession } from 'next-auth';
// import { authOptions } from '../_lib/auth';

export const ListProducts = async () => {
  // const session = await getServerSession(authOptions);
  // console.log(session);

  const products = (
    await db.product.findMany({
      where: {
        discountPercentage: {
          gt: 0,
        },
      },
    })
  ).map((item) => ({
    ...item,
    price: item.price instanceof Decimal ? item.price.toNumber() : item.price,
  }));

  return (
    <div className="flex gap-4 overflow-x-scroll px-5 [&::-webkit-scrollbar]:hidden">
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
};
