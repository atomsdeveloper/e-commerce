import React from 'react';

// Components
import CategoryItem from './category-item';

// Database Function
import { SelectCategories } from '../_actions/select-categories';

export const Categories = async () => {
  const categories = await SelectCategories();

  return (
    <div className="grid grid-cols-2 gap-3">
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  );
};
