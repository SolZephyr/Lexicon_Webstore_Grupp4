import { ContentWrapper } from "@/components/content-wrapper";
import Loader from "@/components/loader";
import ProductsGrid from "@/components/products-grid";
import Sidebar from "@/components/products/sidebar";
import {
  convertProductParamsToFilter,
  getThinProductsByFilter,
} from "@/lib/data/products";
import { SearchParamsString } from "@/lib/types";
import { Metadata } from "next";
import React, { Suspense } from "react";

export const metadata: Metadata = {
  title: "Webshop - Products",
  description: "Browser our products - Find what you're looking for",
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParamsString>;
}) {
  const params = await searchParams;
  const filter = convertProductParamsToFilter({ params });
  const data = getThinProductsByFilter(filter);

  const searchTitle = filter.search
    ? `Search for "${filter.search}" yielded:`
    : "";

  return (
    <ContentWrapper className="flex flex-col gap-4 md:flex-row" as="article">
      <Sidebar />
      <Suspense fallback={<Loader />}>
        <ProductsGrid
          title={searchTitle}
          productsTask={data}
          gridHeader={{
            title: "All Products",
            desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates enim nesciunt reiciendis nisi eveniet! Vitae expedita asperiores labore inventore fugiat consequuntur dolore. Nam quidem vel vitae deleniti, necessitatibus esse accusamus!",
          }}
        />
      </Suspense>
    </ContentWrapper>
  );
}
