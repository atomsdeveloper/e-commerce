import { Prisma } from '@prisma/client';

// Tipo base do Prisma
type BaseProduct = Prisma.ProductGetPayload<{
  include: {
    restaurant: {
      select: {
        name: true;
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
