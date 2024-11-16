import React from 'react';
import Image, { ImageProps } from 'next/image';

export const Banner = (props: ImageProps) => {
  return (
    <div className="flex items-center justify-center w-full">
      <Image
        {...props}
        alt={props.alt}
        width={600}
        height={500}
        className="object-contain"
        quality={100}
        sizes="100%"
      />
    </div>
  );
};
