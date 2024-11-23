import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Database
import { Category } from '@prisma/client';

interface CategoryItemProps {
  category: Category;
}

const CategoryItem = ({ category }: CategoryItemProps) => {
  return (
    <Link
      href={`/categories/${category.id}/products`}
      className="flex items-center justify-center gap-3 rounded-full bg-white px-8 py-3 shadow-md"
    >
      <Image
        src={category.imageUrl}
        alt={category.name}
        height={30}
        width={30}
      />

      <span className="text-sm font-semibold">{category.name}</span>
    </Link>
  );
};

export default CategoryItem;
