'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Sessions
// import { useSession } from 'next-auth/react';

// Icons
import { BikeIcon, StarIcon, TimerIcon } from 'lucide-react';

// Components
import { cn } from '../_lib/utils';

// Format
// import { formatPrice } from '../_helpers/price';

interface ProductProps {
  price: number;
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  discountPercentage: number;
  restaurantId: string;
  categoryId: string;
  createdAt: Date;
}

interface ProductItemProps {
  product: ProductProps;
  className?: string;
}

export const ProductItem = ({ product, className }: ProductItemProps) => {
  // const { data } = useSession();
  // console.log(data?.user.id);

  return (
    <div className={cn('min-w-[266px] max-w-[266px]', className)}>
      <div className="w-full space-y-3">
        {/* IMAGEM */}
        <div className="relative h-[136px] w-full">
          <Link href={`/restaurants/${product.id}`}>
            <Image
              src={product.imageUrl}
              fill
              sizes="100%"
              className="rounded-lg object-cover"
              alt={product.name}
            />
          </Link>

          <div className="absolute left-2 top-2 flex items-center gap-[2px] rounded-full bg-primary bg-white px-2 py-[2px]">
            <StarIcon size={12} className="fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-semibold">5.0</span>
          </div>
        </div>
        {/* TEXTO */}
        <div>
          <h3 className="text-sm font-semibold">{product.name}</h3>
          {/* INFORMAÇÕES DA ENTREGA */}
          <div className="flex gap-3">
            {/* CUSTO DE ENTREGA */}
            <div className="flex items-center gap-1">
              <BikeIcon className="text-primary" size={14} />
              <span className="text-xs text-muted-foreground"></span>
            </div>
            {/* TEMPO DE ENTREGA */}
            <div className="flex items-center gap-1">
              <TimerIcon className="text-primary" size={14} />
              <span className="text-xs text-muted-foreground">
                {product.price} min
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
