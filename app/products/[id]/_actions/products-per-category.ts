import { db } from '@/app/_lib/prisma';
import { Product } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

export const ProductPerCategory = async (id: string) => {
  const products = await (
    await db.product.findMany({
      where: {
        categoryId: id,
      },
    })
  ).map((item) => ({
    ...item,
    price: item.price instanceof Decimal ? item.price.toNumber() : item.price,
  }));

  return products;
};

export const product = async (id: string) => {
  return await db.product.findUnique({
    where: {
      id,
    },
    include: {
      restaurant: true,
    },
  });
};

export const juices = async (product: Product) => {
  return await db.product.findMany({
    where: {
      category: {
        name: 'Sucos',
      },
      restaurant: {
        id: product?.restaurantId,
      },
    },
    include: {
      restaurant: true,
    },
  });
};
