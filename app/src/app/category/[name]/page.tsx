import { ContentWrapper } from "@/components/content-wrapper";
import Loader from "@/components/loader";
import ProductsGrid from "@/components/products-grid";
import Sidebar from "@/components/products/sidebar";
import {
  convertProductParamsToFilter,
  getThinProductsByFilter,
} from "@/lib/data/products";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";

export default async function CategoryDetailsPage({
  params,
  searchParams,
}: {
  params: Promise<{ name: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { name } = await params;
  const query = await searchParams;

  const categories = [
    "all",
    "smartphones",
    "tablets",
    "mobile-accessories",
    "laptops",
  ];

  if (!categories.includes(name)) return notFound();

  const filter = convertProductParamsToFilter({ params: query });
  filter.categories = [name];

  const products = getThinProductsByFilter(filter);

  return (
    <ContentWrapper className="grow flex flex-col" as="article">
      <h2 className="text-2xl capitalize p-2">Category: {name}</h2>
      <p className="flex flex-col sm:flex-row text-justify gap-8 p-4 justify-evenly mb-4">
        <span className="col w-auto">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo
          provident, itaque facere soluta nihil corporis ut magni ipsum? Nihil,
          ut repellat ipsum saepe consectetur eius hic minima iste nemo
          voluptatibus!
        </span>
        <span className="col w-auto">
          Corporis accusantium nulla, harum, ullam ab optio veritatis ipsa
          recusandae maiores ut illo quas laudantium nemo autem mollitia vel
          quam tempore. Amet tempore ducimus blanditiis provident omnis a?
          Voluptates, ea!
        </span>
      </p>
      <div className="flex flex-col grow md:flex-row gap-4">
        <Sidebar category={name} />
        <Suspense fallback={<Loader />}>
          <ProductsGrid productsTask={products} />
        </Suspense>
      </div>
    </ContentWrapper>
  );
}
