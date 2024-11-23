import React from 'react';

// Components
import CategoryItem from './items-category';

// Database Function
import { SelectCategories } from '../_actions/categories';

export const ListCategories = async () => {
  const categories = await SelectCategories();

  return (
    <div className="flex gap-4 overflow-x-scroll p-2 [&::-webkit-scrollbar]:hidden">
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  );
};
