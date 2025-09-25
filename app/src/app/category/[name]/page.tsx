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
      <div className="flex flex-col grow md:flex-row gap-4">
        <Sidebar category={name} />
        <Suspense fallback={<Loader />}>
          <ProductsGrid productsTask={products} gridHeader={{
            title: name.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
            desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates enim nesciunt reiciendis nisi eveniet! Vitae expedita asperiores labore inventore fugiat consequuntur dolore. Nam quidem vel vitae deleniti, necessitatibus esse accusamus!",
          }} />
        </Suspense>
      </div>
    </ContentWrapper>
  );
}
