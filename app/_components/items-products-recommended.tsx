'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';

// Icons
import { MoveDown as ArrowDown } from 'lucide-react';
import { Timer } from 'lucide-react';
import { Star } from 'lucide-react';
import { Truck } from 'lucide-react';

// Components
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Product } from './products-recommended';

interface DatasRecommendedProps {
  datasRecommended: Product[];
}

export const ItemsProductsRecommended = ({
  datasRecommended,
}: DatasRecommendedProps) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!datasRecommended) {
    return (
      <div className="flex items-center justify-center w-full h-64">
        <p>Carregando...</p>
      </div>
    );
  }

  const handleNext = () => {
    if (trackRef.current && currentIndex < datasRecommended.length - 1) {
      const itemWitdth = trackRef.current.children[0]?.clientWidth || 0;
      setCurrentIndex((prev) => prev + 1);
      trackRef.current.style.transform = `translateX(${-(currentIndex + 1) * itemWitdth}px)`;
    }
  };

  const handlePrev = () => {
    if (trackRef.current && currentIndex > 0) {
      const itemWidth = trackRef.current.children[0].clientWidth;
      trackRef.current.style.transform = `translateX(${
        -(currentIndex - 1) * itemWidth
      }px)`;
      setCurrentIndex((prev) => prev - 1);
    }
  };

  if (datasRecommended.length === 0) {
    return (
      <div className="flex items-center justify-center w-full h-64">
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-start px-2 gap-4 h-64 w-full">
      <Button onClick={handleNext} className={'w-10 h-10 rounded-full'}>
        ⬅️
      </Button>
      {datasRecommended?.map((item: Product) => (
        <div
          ref={trackRef}
          key={item?.id}
          style={{ transform: `translateX(${-currentIndex * 256}px)` }}
          className="flex gap-4 w-64 h-56 flex-col rounded-md bg-slate-50"
        >
          <div className="relative flex gap-1 flex-col">
            {item?.discountPercentage ? (
              <Badge className="absolute bg-red-600 top-2 left-2 text-sm font-semibold">
                <ArrowDown size={15} />
                <p className="font-semibold">{item?.discountPercentage}%</p>
              </Badge>
            ) : (
              <Badge className="absolute bg-red-600 gap-1 top-2 left-2 text-sm font-semibold">
                <Star size={15} />
                <p className="font-semibold">{(5).toFixed(1)}</p>
              </Badge>
            )}

            <Image
              width={100}
              height={100}
              src={item?.imageUrl}
              alt={item?.name}
              quality={100}
              className="w-full h-40 rounded-md shadow-lg object-cover"
            />

            <h1 className="text-1xl p-0 mt-1">{item.name}</h1>
            <div className="flex items-center gap-2">
              {item?.discountPercentage ? (
                <>
                  <p className=" font-semibold">
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    }).format(
                      Number(item?.price) -
                        (Number(item?.price) * item?.discountPercentage) / 100,
                    )}
                  </p>
                  <p className="line-through text-sm text-muted-foreground">
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    }).format(Number(item?.price))}
                  </p>
                </>
              ) : (
                <>
                  <p className="flex text-muted-foreground text-sm gap-1 items-center">
                    <Truck size={16} color="red" />
                    Entrega grátis
                  </p>
                  <p className="flex text-muted-foreground text-sm gap-1 items-center">
                    <Timer size={16} color="red" />
                    {/* {item?.deliveryTimeMinutes}min */}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      ))}
      <Button onClick={handlePrev} className={'w-10 h-10 rounded-full'}>
        ⬅️
      </Button>
    </div>
  );
};
