import { db } from '../_lib/prisma';

export const SelectCategories = async () => {
  const categories = await db.category.findMany({
    select: {
      id: true,
      name: true,
      imageUrl: true,
    },
  });

  return categories;
};
