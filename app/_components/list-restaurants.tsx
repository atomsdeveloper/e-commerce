import React from 'react';

// Database
import { db } from '../_lib/prisma';
import { Decimal } from '@prisma/client/runtime/library';

// Components
import { RestaurantItem } from './item-restaurant';

// Sessions
import { getServerSession } from 'next-auth';
import { authOptions } from '../_lib/auth';

export const ListRestaurants = async () => {
  const session = await getServerSession(authOptions);

  // TODO: pegar restaurantes com maior número de pedidos
  const restaurants = await (
    await db.restaurant.findMany({ take: 10 })
  ).map((item) => ({
    ...item,
    deliveryFee:
      item.deliveryFee instanceof Decimal
        ? item.deliveryFee.toNumber()
        : item.deliveryFee,
  }));

  const UserFavoriteRestaurant = await db.userFavoriteRestaurant.findMany({
    where: { userId: session?.user?.id },
  });

  return (
    <div className="flex gap-4 overflow-x-scroll px-5 [&::-webkit-scrollbar]:hidden">
      {restaurants.map((restaurant) => (
        <RestaurantItem
          key={restaurant.id}
          restaurant={restaurant}
          UserFavoriteRestaurant={UserFavoriteRestaurant}
        />
      ))}
    </div>
  );
};
