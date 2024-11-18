import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Database
import { db } from '../_lib/prisma';
import { Decimal } from '@prisma/client/runtime/library';

// Components
import { Search } from '../_components/search';
import { Navbar } from '../_components/navbar';
import { Categories } from '../_components/categories';
import { Banner } from '../_components/banner';
import { ProductsRecommended } from '../_components/products-recommended';
import { RestaurantsRecommended } from '../_components/restaurants-recommended';

const fetch = async () => {
  const getPizzasCategory = db.category.findFirst({
    where: {
      name: 'Pizzas',
    },
  });

  const getProductsRecommended = await db.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
  });

  const serializaDataProducts = await getProductsRecommended.map((item) => ({
    ...item,
    price: item.price instanceof Decimal ? item.price.toNumber() : item.price,
  }));

  const getRestaurantsRecommended = await db.restaurant.findMany({
    where: {
      deliveryFee: 0,
    },
  });

  const serializaDataRestaurants = await getRestaurantsRecommended.map(
    (item) => ({
      ...item,
      deliveryFee:
        item.deliveryFee instanceof Decimal
          ? item.deliveryFee.toNumber()
          : item.deliveryFee,
    }),
  );

  const getBurguers = await db.category.findFirst({
    where: {
      name: 'Hambúrgueres',
    },
  });

  const [
    pizzasCategory,
    productsRecommended,
    burguers,
    restaurantsRecommended,
  ] = await Promise.all([
    getPizzasCategory,
    serializaDataProducts,
    getBurguers,
    serializaDataRestaurants,
  ]);

  return {
    pizzasCategory,
    productsRecommended,
    burguers,
    restaurantsRecommended,
  };
};

const Home = async () => {
  const {
    pizzasCategory,
    productsRecommended,
    burguers,
    restaurantsRecommended,
  } = await fetch();

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
            className="absolute top-60 right-20"
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

      <div className="px-5 pt-4 desktop:pt-6">
        <Categories />
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
        <ProductsRecommended
          text="Pedidos Recomendados"
          datasRecommended={productsRecommended}
        />
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
        <RestaurantsRecommended
          text="Restaurantes Recomendados"
          datasRecommended={restaurantsRecommended}
        />
      </div>
    </div>
  );
};
export default Home;
