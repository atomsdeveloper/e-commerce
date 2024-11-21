'use server';

import { db } from '../_lib/prisma';
import { revalidatePath } from 'next/cache';

export const toggleFavoriteRestaurant = async (
  userId: string,
  restaurantId: string,
) => {
  const existingFavorite = await db.userFavoriteRestaurant.findFirst({
    where: {
      userId,
      restaurantId,
    },
  });

  if (existingFavorite) {
    await db.userFavoriteRestaurant.delete({
      where: {
        userId_restaurantId: {
          userId,
          restaurantId,
        },
      },
    });
  } else {
    await db.userFavoriteRestaurant.create({
      data: {
        userId,
        restaurantId,
      },
    });
  }

  revalidatePath('/');
};
