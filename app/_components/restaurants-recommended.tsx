import React from 'react';

// Components
import { Button } from './ui/button';
import { ItemsRestaurantsRecommended } from './items-restaurants-recommended';

// Icons
import { ChevronRight } from 'lucide-react';

export interface Restaurants {
  deliveryFee: number;
  name: string;
  id: string;
  imageUrl: string;
  deliveryTimeMinutes: number;
}

interface RestaurantsRecommendedProps {
  datasRecommended: Restaurants[];
  text: string;
}

export const RestaurantsRecommended = ({
  datasRecommended,
  text,
}: RestaurantsRecommendedProps) => {
  return (
    <>
      <div className="flex items-center justify-between px-1">
        <h2 className="text-1xl font-semibold">{text}</h2>
        <Button
          variant={'ghost'}
          className="flex gap-2 text-destructive hover:text-destructive/90 rounded-full"
        >
          Ver Todos
          <ChevronRight size={16} />
        </Button>
      </div>

      <ItemsRestaurantsRecommended datasRecommended={datasRecommended} />
    </>
  );
};
