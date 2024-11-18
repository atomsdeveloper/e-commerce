import React from 'react';

// Components
import { Button } from './ui/button';
import { ItemsProductsRecommended } from './items-products-recommended';

// Icons
import { ChevronRight } from 'lucide-react';

export interface Product {
  price: number;
  name: string;
  id: string;
  description: string;
  imageUrl: string;
  discountPercentage: number;
  restaurantId: string;
  categoryId: string;
  createdAt: Date;
}

interface ProductsRecommendedProps {
  datasRecommended: Product[];
  text: string;
}

export const ProductsRecommended = ({
  datasRecommended,
  text,
}: ProductsRecommendedProps) => {
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

      <ItemsProductsRecommended datasRecommended={datasRecommended} />
    </>
  );
};
