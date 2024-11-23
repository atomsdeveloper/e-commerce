import { db } from '../_lib/prisma';

export const SelectCategories = async () => {
  const categories = await db.category.findMany();

  return categories;
};
