import { Prisma } from '@prisma/client';
// Tipo base do Prisma
export type BaseProduct = Prisma.ProductGetPayload<{
  include: {
    restaurant: {
      select: {
        name: true;
        imageUrl: true;
        id: true;
        deliveryFee: true;
        deliveryTimeMinutes: true;
      };
    };
  };
}>;

// Tipo modificado com price e deliveryFee como number
export interface TransformedProduct
  extends Omit<BaseProduct, 'price' | 'restaurant'> {
  price: number;
  restaurant: Omit<BaseProduct['restaurant'], 'deliveryFee'> & {
    deliveryFee: number;
  };
}

export interface ProductDetailsProps {
  product: TransformedProduct;
  complementaryProducts: TransformedProduct[];
}

// Interface para os dados do restaurante
export interface Restaurant {
  id: string;
  imageUrl: string;
  name: string;
  deliveryFee: number;
  deliveryTimeMinutes: number;
}

// Interface para os dados do produto
export interface Product {
  id: string;
  name: string;
  imageUrl: string;
  createdAt: Date;
  description: string;
  price: number;
  discountPercentage: number;
  restaurantId: string;
  categoryId: string;
  restaurant: Restaurant;
}
