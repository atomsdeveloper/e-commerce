'use client';

import React from 'react';
import Image from 'next/image';

// Icons
import { Timer } from 'lucide-react';
import { Star } from 'lucide-react';
import { Truck } from 'lucide-react';

// Components
import { Badge } from './ui/badge';
// import { Button } from './ui/button';
import { Restaurants } from './restaurants-recommended';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../_components/ui/carousel';

interface DatasRecommendedProps {
  datasRecommended: Restaurants[];
}

export const ItemsRestaurantsRecommended = ({
  datasRecommended,
}: DatasRecommendedProps) => {
  // const trackRef = useRef<HTMLDivElement>(null);
  // const [currentIndex, setCurrentIndex] = useState(0);

  // if (!datasRecommended) {
  //   return (
  //     <div className="flex items-center justify-center w-full h-64">
  //       <p>Carregando...</p>
  //     </div>
  //   );
  // }

  // const handleNext = () => {
  //   if (trackRef.current && currentIndex < datasRecommended.length - 1) {
  //     const itemWitdth = trackRef.current.children[0]?.clientWidth || 0;
  //     setCurrentIndex((prev) => prev + 1);
  //     trackRef.current.style.transform = `translateX(${-(currentIndex + 1) * itemWitdth}px)`;
  //   }
  // };

  // const handlePrev = () => {
  //   if (trackRef.current && currentIndex > 0) {
  //     const itemWidth = trackRef.current.children[0].clientWidth;
  //     trackRef.current.style.transform = `translateX(${
  //       -(currentIndex - 1) * itemWidth
  //     }px)`;
  //     setCurrentIndex((prev) => prev - 1);
  //   }
  // };

  return (
    <Carousel
      className="w-full max-w-sm"
      opts={{
        align: 'start',
      }}
    >
      <CarouselContent className="-ml-1">
        {datasRecommended?.map((item: Restaurants) => (
          <CarouselItem
            key={item?.id}
            className="pl-1 sm:basis-2/3 md:basis-1/4 lg:basis-1/5"
          >
            <div className="relative flex gap-1 flex-col">
              <Badge className="absolute bg-red-600 gap-1 top-2 left-2 text-sm font-semibold">
                <Star size={15} />
                <p className="font-semibold">{(5).toFixed(1)}</p>
              </Badge>

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
                <p className="flex text-muted-foreground text-sm gap-1 items-center">
                  <Truck size={16} color="red" />
                  Entrega grátis
                </p>
                <p className="flex text-muted-foreground text-sm gap-1 items-center">
                  <Timer size={16} color="red" />
                  {item?.deliveryTimeMinutes}min
                </p>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};
