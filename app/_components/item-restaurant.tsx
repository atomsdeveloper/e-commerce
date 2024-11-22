'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Sessions
import { useSession } from 'next-auth/react';

// Database
import { UserFavoriteRestaurant } from '@prisma/client';
import { toggleFavoriteRestaurant } from '../_actions/restaurants';

// Icons
import { BikeIcon, HeartIcon, StarIcon, TimerIcon } from 'lucide-react';

// Components
import { Button } from './ui/button';
import { cn } from '../_lib/utils';
import { toast } from 'sonner';

// Format
import { formatPrice } from '../_helpers/price';

interface RestaurantProps {
  id: string;
  name: string;
  imageUrl: string;
  deliveryFee: number;
  deliveryTimeMinutes: number;
}

interface RestaurantItemProps {
  restaurant: RestaurantProps;
  className?: string;
  UserFavoriteRestaurant: UserFavoriteRestaurant[];
}

export const RestaurantItem = ({
  restaurant,
  className,
  UserFavoriteRestaurant,
}: RestaurantItemProps) => {
  const { data } = useSession();

  const isFavorite = UserFavoriteRestaurant.some(
    (fav: UserFavoriteRestaurant) => fav.restaurantId === restaurant.id,
  );

  const handleFavoriteClick = async () => {
    if (!data?.user.id) return;
    try {
      await toggleFavoriteRestaurant(data?.user.id, restaurant.id);
      toast.success(
        isFavorite
          ? 'Restaurante removido dos favoritos.'
          : 'Restaurante favoritado.',
      );
    } catch (error) {
      toast.error('Erro ao favoritar restaurante.');
      return error;
    }
  };

  return (
    <div className={cn('min-w-[266px] max-w-[266px]', className)}>
      <div className="w-full space-y-3">
        {/* IMAGEM */}
        <div className="relative h-[136px] w-full">
          <Link href={`/restaurants/${restaurant.id}`}>
            <Image
              src={restaurant.imageUrl}
              fill
              sizes="100%"
              className="rounded-lg object-cover"
              alt={restaurant.name}
            />
          </Link>

          <div className="absolute left-2 top-2 flex items-center gap-[2px] rounded-full bg-primary bg-white px-2 py-[2px]">
            <StarIcon size={12} className="fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-semibold">5.0</span>
          </div>

          {data?.user.id && (
            <Button
              size="icon"
              className={`absolute right-2 top-2 h-7 w-7 rounded-full bg-gray-700 ${isFavorite && 'bg-primary hover:bg-gray-700'}`}
              onClick={handleFavoriteClick}
            >
              <HeartIcon size={16} className="fill-white" />
            </Button>
          )}
        </div>
        {/* TEXTO */}
        <div>
          <h3 className="text-sm font-semibold">{restaurant.name}</h3>
          {/* INFORMAÇÕES DA ENTREGA */}
          <div className="flex gap-3">
            {/* CUSTO DE ENTREGA */}
            <div className="flex items-center gap-1">
              <BikeIcon className="text-primary" size={14} />
              <span className="text-xs text-muted-foreground">
                {Number(restaurant.deliveryFee) === 0
                  ? 'Entrega grátis'
                  : formatPrice(Number(restaurant.deliveryFee))}
              </span>
            </div>
            {/* TEMPO DE ENTREGA */}
            <div className="flex items-center gap-1">
              <TimerIcon className="text-primary" size={14} />
              <span className="text-xs text-muted-foreground">
                {restaurant.deliveryTimeMinutes} min
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
