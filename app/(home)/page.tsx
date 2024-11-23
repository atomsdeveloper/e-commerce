import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Database
import { db } from '../_lib/prisma';
// import { Decimal } from '@prisma/client/runtime/library';

// Components
import { Search } from '../_components/search';
import { Navbar } from '../_components/navbar';
import { ListCategories } from '../_components/list-categories';
import { Banner } from '../_components/banner';

// import { ProductsRecommended } from '../_components/products-recommended';
import { ListRestaurants } from '../_components/list-restaurants';
import { ListProducts } from '../_components/list-products';
import { Button } from '../_components/ui/button';
import { ChevronRight } from 'lucide-react';

const fetch = async () => {
  const getPizzasCategory = db.category.findFirst({
    where: {
      name: 'Pizzas',
    },
  });

  // const getProductsRecommended = await (
  //   await db.product.findMany({
  //     where: {
  //       discountPercentage: {
  //         gt: 0,
  //       },
  //     },
  //   })
  // ).map((item) => ({
  //   ...item,
  //   price: item.price instanceof Decimal ? item.price.toNumber() : item.price,
  // }));

  const getBurguers = await db.category.findFirst({
    where: {
      name: 'Hambúrgueres',
    },
  });

  const [pizzasCategory, burguers] = await Promise.all([
    getPizzasCategory,
    getBurguers,
  ]);

  return {
    pizzasCategory,
    burguers,
  };
};

const Home = async () => {
  const { pizzasCategory, burguers } = await fetch();

  return (
    <div className="flex flex-col">
      <Navbar />

      {/* Layout Destop */}
      <div className="bg-red-600 h-96 w-full flex items-center justify-between px-5 mobile:hidden">
        <div className="flex flex-col w-1/2">
          <h1 className="text-3xl text-white font-extrabold">Está com fome?</h1>
          <p className="text-1xl text-white font-light">
            Com apenas alguns cliques, encontre refeições acessíveis perto de
            você.
          </p>
          <div className="bg-white px-2 mt-4 rounded-lg shadow-md">
            <Search />
          </div>
        </div>

        <div className="w-1/2">
          <Image
            className="absolute top-56 right-24"
            src="/image-base.png"
            alt="Image to destop"
            width={248}
            height={248}
          />
        </div>
      </div>

      <div className="px-5 pt-4 desktop:hidden">
        <Search />
      </div>

      <div className="p-2 desktop:pt-6">
        <ListCategories />
      </div>

      <div className="px-5 pt-8 desktop:hidden">
        <Link href={`/categories/${pizzasCategory?.id}/products`}>
          <Banner
            src="/banner-pizza.png"
            alt="Até 30% de desconto em pizzas!"
          />
        </Link>
      </div>

      <div className="px-5 pt-4 desktop:pt-6">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-1xl font-semibold">Pedidos Recomendados</h2>
          <Button
            variant="ghost"
            className="h-fit p-0 text-primary hover:bg-transparent"
            asChild
          >
            <Link href="/products/recommended">
              Ver todos
              <ChevronRight size={16} />
            </Link>
          </Button>
        </div>

        <div className="flex gap-4 overflow-x-scroll px-5 [&::-webkit-scrollbar]:hidden">
          <ListProducts />
        </div>
      </div>

      <div className="px-5 pt-8 flex justify-around gap-4">
        <Link href={`/categories/${burguers?.id}/products`}>
          <Banner src="/banner-burguer.png" alt="A partir de R$17,90" />
        </Link>
        <Link
          href={`/categories/${pizzasCategory?.id}/products`}
          className="mobile:hidden"
        >
          <Banner
            src="/banner-pizza.png"
            alt="Até 30% de desconto em pizzas!"
          />
        </Link>
      </div>

      <div className="px-5 pt-4 desktop:pt-6">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-1xl font-semibold">Restaurantes Recomendados</h2>
          <Button
            variant="ghost"
            className="h-fit p-0 text-primary hover:bg-transparent"
            asChild
          >
            <Link href="/restaurants/recommended">
              Ver todos
              <ChevronRight size={16} />
            </Link>
          </Button>
        </div>

        <div className="flex gap-4 overflow-x-scroll px-5 [&::-webkit-scrollbar]:hidden">
          <ListRestaurants />
        </div>
      </div>
    </div>
  );
};
export default Home;
