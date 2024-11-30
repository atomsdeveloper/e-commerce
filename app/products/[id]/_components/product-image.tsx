'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

// COMPONENTS
import { Button } from '@/app/_components/ui/button';

// ICONS
import { Restaurant } from '../../../_types';

// TYPES
import { ChevronLeftIcon } from 'lucide-react';

interface ProductImageProps {
  product: Restaurant;
}

const ProductImage = ({ product }: ProductImageProps) => {
  const router = useRouter();

  const handleBackClick = () => router.back();

  return (
    <div className="relative h-[360px] w-full">
      <Image
        src={product.imageUrl}
        alt={product.name}
        fill
        sizes="100%"
        className="object-cover"
      />

      <Button
        className="absolute left-4 top-4 rounded-full bg-white text-foreground hover:text-white"
        size="icon"
        onClick={handleBackClick}
      >
        <ChevronLeftIcon />
      </Button>
    </div>
  );
};

export default ProductImage;
